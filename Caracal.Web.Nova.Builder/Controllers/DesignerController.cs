using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Caracal.Web.Nova.Builder.Model.Shapes;
using Caracal.Web.Nova.Builder.Model.Workflow;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class DesignerController : Controller {
    [HttpPost]
    public async Task<IActionResult> Publish([FromBody] object canvas) {
      var process = Process.Parse(canvas.ToString());

      await WorkflowClient.Publish(process);
    
      return Ok(process);
    }
  }
}





