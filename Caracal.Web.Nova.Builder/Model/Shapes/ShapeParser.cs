﻿using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Builder.Model.Shapes {
  public class ShapeParser {
    private readonly JObject _canvas;
    
    public ShapeParser(string json) => _canvas = JObject.Parse(json);

    public Process Parse() {
      return new Process {
        Name = _canvas["name"].Value<string>(),
        Activities = GetMetadata(_canvas["shapes"])
      };
    }
    
    private List<object> GetMetadata(JToken token) {
      return token
        .Where(s => s["inputPorts"] != null || s["outputPorts"] != null)
        .Select(s => GetMetadata(s.Value<JObject>()))
        .ToList();
    }

    private object GetMetadata(JObject token) {
      var metadata = new Dictionary<string, object>();

      AddField("name", metadata, token);
      AddField("type", metadata, token);
      AddField("label", metadata, token);

      if (token["properties"] != null) 
        AddProperties(metadata, token["properties"]);

      SetOutputPort(token, metadata);

      if ((string) metadata["type"] == "ApiActivity") {
        metadata.Add("mappings", new List<string>());
      }

      return metadata;
    }

    private void SetOutputPort(JObject token, IDictionary<string, object> metadata) {
      var target = GetTargetShape(token);

      if (string.IsNullOrEmpty(target)) return;
      
      if ((string) metadata["type"] == "CodeActivity") {
        var code = metadata["code"].ToString().Trim();
        metadata["code"] = $"{code.Substring(0, code.Length - 1)}wf.next(\'{target}\');}}";
      }
      
      metadata.Add("nextActivity", target);
    }

    private string GetTargetShape(JObject token) {
      var outputPort = token["outputPorts"]?.Value<JArray>();
      if (outputPort == null || !outputPort.Any()) return string.Empty;
      
      var sourceId = outputPort[0].Value<string>();
      var targetId = _canvas.SelectToken("$.lines[?(@.source == '" + sourceId + "')].target");
      var target = _canvas["shapes"]
        .FirstOrDefault(s => s["inputPorts"] != null && s["inputPorts"].Any(p => (string)p == (string) targetId));
      
      return target?["name"].Value<string>();
    }
    
    private static void AddField(string key, IDictionary<string, object> metadata, JObject token) {
      if (token[key] != null) 
        metadata.Add(key, token[key].Value<string>());
    }
    
    private void AddProperties(Dictionary<string, object> metadata, JToken token) {
      if (token.Type == JTokenType.Array) {
        token
          .Select(GetProperty)
          .ToList()
          .ForEach(p => metadata.Add(p.Name, GetPropetyValue(p.Value)));
      }
      else 
        metadata.TryAdd(token.Value<JProperty>().Name, GetMetadata(token.First));
    }

    private static (string Name, JToken Value) GetProperty(JToken token) {
      var property = (Name: token["name"].Value<string>(), Value: token["value"]);

      return property;
    }
    
    private object GetPropetyValue(JToken value) {
      if(value is JValue)
        return value.Value<JValue>().Value;
      
      var items = new Dictionary<string, object>();
      AddProperties(items, value.First);
      return items;
    }
  }
}