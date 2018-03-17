using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class DesignerController: Controller {
    [HttpPost]
    public IActionResult Publish(string name, [FromBody] RootObject[] process) {
      var wf = new Workflow {Name = name};

     // var activities = process.Where(p => p.);

      return Ok(wf);
    }
    
    
  }
  
  public class UserData
  {
    public string Type { get; set; }
  }

  public class Vertex
  {
    public double X { get; set; }
    public double Y { get; set; }
  }

  public class RoutingMetaData
  {
    public bool RoutedByUserInteraction { get; set; }
    public int FromDir { get; set; }
    public int ToDir { get; set; }
  }

  public class Source
  {
    public string Node { get; set; }
    public string Port { get; set; }
  }

  public class Target
  {
    public string Node { get; set; }
    public string Port { get; set; }
    public string Decoration { get; set; }
  }

  public class RootObject
  {
    public string Type { get; set; }
    public string Id { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
    public int Alpha { get; set; }
    public int Angle { get; set; }
    public UserData UserData { get; set; }
    public string CssClass { get; set; }
    public List<object> Ports { get; set; }
    public string BgColor { get; set; }
    public string Color { get; set; }
    public int Stroke { get; set; }
    public int Radius { get; set; }
    public object Dasharray { get; set; }
    public int? Gap { get; set; }
    public int? OutlineStroke { get; set; }
    public string OutlineColor { get; set; }
    public string Policy { get; set; }
    public List<Vertex> Vertex { get; set; }
    public string Router { get; set; }
    public RoutingMetaData RoutingMetaData { get; set; }
    public Source Source { get; set; }
    public Target Target { get; set; }
  }
}






public class Control
{
  public string Type { get; set; }
  public string Label { get; set; }
  public string Name { get; set; }
  public string Placeholder { get; set; }
  public string Style { get; set; }
  public string NextActivity { get; set; }
}

public class Form
{
  public List<Control> Controls { get; set; }
}

public class Activity
{
  public string Name { get; set; }
  public string Type { get; set; }
  public string NextActivity { get; set; }
  public string Api { get; set; }
  public string Method { get; set; }
  public List<Mapping> Mappings { get; set; }
  public Form Form { get; set; }
  public string Message { get; set; }
  public string Code { get; set; }
}

public class Mapping
{
  public string Source { get; set; }
  public string Destination { get; set; }
  public string Direction { get; set; }
}

public class Workflow
{
  public string Name { get; set; }
  public List<Activity> Activities { get; set; }
}






