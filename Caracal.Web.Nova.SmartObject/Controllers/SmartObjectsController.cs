using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Caracal.Web.Nova.SmartObject.Controllers {
    [Route("/api/smart-object")]
    public class SmartObjectsController : Controller {
        private readonly IHostingEnvironment _host;

        public SmartObjectsController(IHostingEnvironment host) => _host = host;

        [HttpGet("{name}/{id}")]
        public async Task<string> GetSmartObject(string name, [FromRoute] int id) {
            var path = $"{_host.WebRootPath}/smartObjects/{name}.json";

            if (!System.IO.File.Exists(path)) return string.Empty;

            return await System.IO.File.ReadAllTextAsync(path);
        }

        [HttpPost("{name}")]
        public async Task<string> SaveSmartObject([FromRoute] string name, [FromBody] object smartObject) {
            var path = $"{_host.WebRootPath}/smartObjects/{name}.json";

            if (!System.IO.File.Exists(path))
                System.IO.File.Delete(path);

            await System.IO.File.WriteAllTextAsync(path, smartObject.ToString());
            
            return smartObject.ToString();
        }
    }
}