using System.Threading.Tasks;
using Caracal.Web.Nova.SmartObject.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Caracal.Web.Nova.SmartObject.Controllers {
    [Route("/api/smart-object")]
    public class SmartObjectsController : Controller {
        private readonly SmartObjectRepository _repository;

        public SmartObjectsController(SmartObjectRepository repository) => _repository = repository;

        [HttpGet("{name}/{id}")]
        public async Task<string> GetSmartObjectAsync(string name, [FromRoute] int id) => 
            await _repository.GetSmartObjectAsync(name, id);

        [HttpPost("{name}")]
        public async Task<string> SaveSmartObjectAsync([FromRoute] string name, [FromBody] object smartObject) {
            await _repository.SaveAsync(name, smartObject.ToString());
            
            return smartObject.ToString();
        }
    }
}