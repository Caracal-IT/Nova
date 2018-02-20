using System.IO;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Workflow.Repositories {
    public class FileStateMachineRepository : StateMachineRepository {
        private readonly IHostingEnvironment _host;
        
        public FileStateMachineRepository(IHostingEnvironment host) {
            _host = host;
        }

        public string GetWorkflow(string name) {
            var path = $"{_host.WebRootPath}/workflows/{name}.json";

            if (!File.Exists(path)) return "";

            var wf = File.ReadAllText(path);
            
            
            return wf;
        }

        public void Deploy(string workflow) {
            var wf = JObject.Load(new JsonTextReader(new StringReader(workflow)));
            var name = wf["name"].Value<string>();
            
            var path = $"{_host.WebRootPath}/workflows/{name}.json";

            if (!File.Exists(path))
                File.Delete(path);

            File.WriteAllText(path, workflow);
        }
    }
}