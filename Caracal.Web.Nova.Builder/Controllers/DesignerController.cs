using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class DesignerController : Controller {
    private static readonly HttpClient Client = new HttpClient();

    public async Task PublishWorkflow(Workflow wf) {
      try {
        var url = "http://localhost/api/workflow/publish";
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
    public async Task<IActionResult> Publish(string name, [FromBody] Process process) {
      var wf = new Workflow {Name = "registration"};

      var act = GetStartActivity(process);
      
      
      while (act.Activity != null) {
        wf.Activities.Add(act.Activity);

        if (act.NextShape == null || wf.Activities.Any(a => a.Name == act.NextShape.Name))
          break;

        act = Next(process, act.NextShape);
      }
      
      if (act.NextShape != null) {
        var next = Next(process, act.NextShape);

        if (next.Activity != null) {
          wf.Activities.Add(next.Activity);
        }
      }
      

      wf.Activities.Add(new CodeActivity {
        Name = "empty",
        Code = "function execute(params, wf, notify) { }"
      });
      
      
      
      
      
      //foreach (var shape in process.Shapes) {
      //  wf.Activities.Add(new Activity {
      //    Name = shape.Name
       // });
     // }
      await PublishWorkflow(wf);
      return Ok(wf);
    }
   
    public (Activity Activity, Shape NextShape)  GetStartActivity(Process process) {
      CodeActivity act;
     
      var nextAct = "";
      var shape = process.Shapes.FirstOrDefault(s => s.Name.ToLower() == "start");

      var next = NextShape(process, shape);

      if (next != null) {
        nextAct = next.Name;
      }

      if (shape != null) {
        act = new CodeActivity {
          Name = "start",
          Type = "CodeActivity",
          Code = "function execute(params, wf, notify) { wf.next('" + nextAct + "'); }" 
        };
      }
      else {
        act = new CodeActivity {
          Name = "start",
          Code = "function execute(params, wf, notify) { }"
        };
      }
      
      return (act, next);
    }

    public Shape NextShape(Process process, Shape shape) {
      if (shape != null && shape.OutputPorts != null) {
        var lineId = shape.OutputPorts.FirstOrDefault();

        if (lineId != null) {
          var next = process.Lines.FirstOrDefault(l => l.Source == lineId);

          if (next != null)
            return process.Shapes.FirstOrDefault(s => s.InputPorts?.FirstOrDefault() == next.Target);
        }
      }

      return null;
    }
    
    public Shape NextShape(Process process, Component shape) {
      if (shape != null && shape.OutputPorts != null) {
        var lineId = shape.OutputPorts.FirstOrDefault();

        if (lineId != null) {
          var next = process.Lines.FirstOrDefault(l => l.Source == lineId);

          if (next != null)
            return process.Shapes.FirstOrDefault(s => s.InputPorts?.FirstOrDefault() == next.Target);
        }
      }

      return null;
    }
    

    public (Activity Activity, Shape NextShape) Next(Process process, Shape shape) {
      Activity act = null;
      var next = NextShape(process, shape);
      Console.WriteLine(shape.Type);
      if (shape != null) {
        if (shape.Type == "Alert") {
          act = new AlertActivity {
            Name = shape.Name,
            Message = shape.Properties.First(p => p.Name == "message").Value,
            NextActivity = next?.Name??"empty"
          };
        }
        if (shape.Type == "Code") {
          act = new CodeActivity {
            Name = shape.Name,
            Code = shape.Properties.First(p => p.Name == "code").Value
          };

          if (next != null) {
            var code = ((CodeActivity) act).Code.TrimEnd();

            ((CodeActivity) act).Code = code.Substring(0, code.Length - 1) +
                                        " wf.next('" + next.Name + "'); " +
                                        "}";
          }
        }

        if (shape.Type == "Webservice") {
          act = new ApiActivity {
            Name = shape.Name,
            Api = shape.Properties.First(p => p.Name == "url").Value,
            Method = shape.Properties.First(p => p.Name == "method").Value,
            NextActivity = next?.Name??"empty"
          };
        }
        
        if (shape.Type.ToLower() == "end") {
          act = new CodeActivity {
            Name = shape.Name,
            Code = "function execute(params, wf, notify) {  }"
          };
        }

        if (shape.Type.ToLower() == "start") {
          act = new CodeActivity {
            Name = "start",
            Type = "CodeActivity",
            Code = "function execute(params, wf, notify) { wf.next('" + (next?.Name??"empty") + "'); }"
          };

        }

        if (shape.Type == "Form") {
          return CreateForm(process, shape, next);
        }
        
      }
      
      return (act, next);
    }

    public (Activity Activity, Shape NextShape) CreateForm(Process process, Shape shape, Shape nextShape) {
      var act = new FormActivity {
        Name = shape.Name
      };

      var hProps = new Dictionary<string, object>();
      hProps.Add("type", "paper-header");
      hProps.Add("label", shape.Label);
      hProps.Add("name", shape.Name);
      act.Form.Controls.Add(hProps);
      
      foreach (var control in shape.Controls) {
        if (control.Control != null) {
          var props = new Dictionary<string, object>();
          act.Form.Controls.Add(props);
          props.Add("name", control.Name);
          props.Add("label", control.Label);
          
          foreach (var item in control.Control) {
            var name = item.Name == "text" ? "label" : item.Name;

            if (item.Name == "text")
              props.Remove("label");
            
            props.Add(name, item.Value);
          }

          
          if (control.OutputPorts.Count > 0) {
            props["style"] = "btn btn-outline-" + props["style"];
            
            nextShape = NextShape(process, control);
            
            if(nextShape != null)
              props.Add("nextActivity", nextShape.Name);
          }
          
          /* act.Form.Controls.Add(new WfComponent {
             Name = control.Name,
             Type = control.Control.First(c => c.Name == "type").Value,
             Label = control.Control.First(c => c.Name == "text").Value,
             Placeholder = control.Control.First(c => c.Name == "placeholder").Value
           });*/
        }
      }
      
      
      return (act, nextShape);
    }
  }

  public class FormActivity: Activity{
    public FormActivity() {
      Type = "FormActivity";
    }
    
    public WfForm Form { get; set; } = new WfForm();
  }

  public class WfForm {
    public List<Dictionary<string, object>> Controls { get; set; } = new List<Dictionary<string, object>>();
  }
  
  public class WfComponent {
    public string Type { get; set; }
    public string Label { get; set; }
    public string Name { get; set; }
    public string Placeholder { get; set; }
  }
  
  public class Workflow {
    public string Name { get; set; }
    public List<Activity> Activities { get; set; } = new List<Activity>();
  }

  public class Activity {
    public string Name { get; set; }
    public string Type { get; set; }
  }

  public class StartActivity : Activity {
    public string Code { get; set; }
  }
  
  public class CodeActivity : Activity {
    public CodeActivity() {
      Type = "CodeActivity";
    }
    
    public string Code { get; set; }
  }

  public class ApiActivity : Activity {
    public ApiActivity() {
      Type = "ApiActivity";
    }
    
    public string Api { get; set; }
    public string Method { get; set; }
    public List<string> Mappings { get; set; } = new List<string>();
    public string NextActivity { get; set; }
  }
  
  public class AlertActivity : Activity {
    public AlertActivity() {
      Type = "NovaAlertActivity";
    }
    public string Message { get; set; }
    public string NextActivity { get; set; }
  }
  
  
  public class Process {
    public List<Shape> Shapes { get; set; }
    public List<Line> Lines { get; set; }
  }

  public class Shape {
    public string Name { get; set; }
    public string Label { get; set; }
    public string Type { get; set; }
    public string Color { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public List<Property> Properties { get; set; }
    public Location LabelPos { get; set; }
    public List<Component> Controls { get; set; }
    public List<string> InputPorts { get; set; }
    public List<string> OutputPorts { get; set; }
  }
  
  public class ShapeObject {
    public string Name { get; set; }
    public string Value { get; set; }
  }
  
  public class Property : ShapeObject {
    public string Type { get; set; }
    public List<ShapeObject> Items { get; set; }
  }
  
  public class Location {
    public double X { get; set; }
    public double Y { get; set; }
  }
  
  public class Component {
    public string Name { get; set; }
    public string Label { get; set; }
    public List<string> OutputPorts { get; set; }
    public List<FormControl> Control { get; set; }
  }
  
  public class FormControl : ShapeObject {
    public string Type { get; set; }
    public List<ShapeObject> Items { get; set; }
  }
  
  public class Line {
    public string Source { get; set; }
    public string Target { get; set; }
    public string Color { get; set; }
    public List<LineSegment> LineSegments { get; set; }
  }
  
  public class LineSegment {
    public Location Start { get; set; }
    public Location End { get; set; }
  }
}





