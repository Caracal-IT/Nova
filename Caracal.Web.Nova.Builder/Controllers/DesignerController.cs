using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Globalization;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class DesignerController : Controller {
    private static readonly HttpClient Client = new HttpClient();

    public async Task PublishWorkflow(Process wf) {
    
    try {
      var url = "http://localhost/api/workflow/publish";
     // var url = "http://workflow.api/api/workflow/publish";
      //var content = new StringContent(JsonConvert.SerializeObject(wf), Encoding.UTF8, "application/json");
      var myContent = JsonConvert.SerializeObject(wf, new JsonSerializerSettings 
      { 
        ContractResolver = new CamelCasePropertyNamesContractResolver() 
      });
      var buffer = Encoding.UTF8.GetBytes(myContent);
      var byteContent = new ByteArrayContent(buffer);
      byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
      Console.WriteLine(JsonConvert.SerializeObject(wf));
             
      var message = await Client.PostAsync(url, byteContent);
      Console.WriteLine(message.ReasonPhrase);
    }
    catch (Exception exception) {
      Console.WriteLine("Error :{0}", exception.StackTrace);
    }
    
    }

    [HttpPost]
    public async Task<IActionResult> Publish([FromBody] object canvas) {
      var process = Process.Parse(canvas.ToString());

      await PublishWorkflow(process);
    
      return Ok(process);
    }
  }

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
        .FirstOrDefault(s => s["inputPorts"].Any(p => (string)p == (string) targetId));
      
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

  public class Process {
    public string Name { get; set; }
    public object Activities { get; set; }

    public static Process Parse(string canvas) {
      var parser = new ShapeParser(canvas);
      return parser.Parse();
    }
  }
}





