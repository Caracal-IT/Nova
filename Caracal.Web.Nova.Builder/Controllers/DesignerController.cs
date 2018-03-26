using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Caracal.Web.Nova.Builder.Model.Shapes;
using Caracal.Web.Nova.Builder.Model.Workflow;
using Caracal.Web.Nova.Builder.Repositories;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class DesignerController : Controller {
    private readonly ShapesRepository _repository;
    
    public DesignerController(ShapesRepository repository) {
      _repository = repository;
    }
    
    [HttpPost]
    public async Task<IActionResult> Publish([FromBody] object processJSon) {
      var process = Process.Parse(processJSon.ToString());
      
      await _repository.SaveProcessAsync(processJSon.ToString());
      await WorkflowClient.Publish(process);
    
      return Ok(process);
    }

    [HttpGet("/Designer/Shapes/{name}")]
    public async Task<IActionResult> Shapes(string name) {
      var process =  await _repository.GetProcessAsync(name);

      return Ok(process);
    }
  }
}





