using System;
using System.IO;
using System.Threading.Tasks;
using Caracal.Web.Nova.Workflow.Repositories;
using DataAccessPostgreSqlProvider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Workflow.Controllers {
    [Route("/api/workflow")]
    public class StateMachineController : Controller {
        private readonly StateMachineRepository _stateMachineRepository;
        private readonly PostgresStateMachineRepository _repository;

        public StateMachineController(
            PostgresStateMachineRepository repository,
            StateMachineRepository stateMachineRepository
        ) {
            _stateMachineRepository = stateMachineRepository;
            _repository = repository;
        }

        [HttpPost("publish")]
        public IActionResult Publish([FromBody] object workflow)
        {
            _stateMachineRepository.Deploy(workflow.ToString());

            return Ok(workflow);
        }
        
        [HttpGet("{name}")]
        public IActionResult GetWorkflow(string name) {
            var wf =  _stateMachineRepository.GetWorkflow(name);
            
            TextReader reader = new StringReader(wf);
            var ret = JObject.Load(new JsonTextReader(reader));

            return Ok(ret);
        }
        
        [HttpGet("Upgrade")]

        public IActionResult Upgrade() {
            try {
                _repository.Database.Migrate();
            }
            catch (Exception exception) {
                return Ok(exception.Message);
            }

            return Ok();
        }
    }
}