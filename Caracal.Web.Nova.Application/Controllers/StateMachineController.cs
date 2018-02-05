using System.IO;
using AutoMapper;
using Caracal.Web.Nova.Application.Core.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Application.Controllers {
    [Route("/api/workflow")]
    public class StateMachineController : Controller {
        private readonly IMapper _mapper;
        private readonly StateMachineRepository _stateMachineRepository;
        
        public StateMachineController(IMapper mapper, StateMachineRepository stateMachineRepository) {
            _mapper = mapper;
            _stateMachineRepository = stateMachineRepository;
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
    }
}