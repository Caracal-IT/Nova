using System.IO;
using System.Threading.Tasks;
using Caracal.Web.Nova.Workflow.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Workflow.Controllers {
    [Route("/api/workflow")]
    public class StateMachineController : Controller {
        private readonly StateMachineRepository _repository;
        
        public StateMachineController(StateMachineRepository stateMachineRepository) => 
            _repository = stateMachineRepository;

        [HttpPost("publish")]
        public async Task<IActionResult> PublishAsync([FromBody] object workflow)
        {
            await _repository.DeployAsync(workflow.ToString());

            return Ok(workflow);
        }
        
        [HttpGet("{name}")]
        public async Task<IActionResult> GetWorkflowAsync(string name) {
            var wf =  await _repository.GetWorkflowAsync(name);
            
            TextReader reader = new StringReader(wf);
            var ret = JObject.Load(new JsonTextReader(reader));

            return Ok(ret);
        }
    }
}