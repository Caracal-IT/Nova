using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

using static Caracal.Web.Nova.Workflow.Model.Workflow;

namespace Caracal.Web.Nova.Workflow.Repositories {
    public class FileStateMachineRepository : StateMachineRepository {
        private readonly IHostingEnvironment _host;
        
        public FileStateMachineRepository(IHostingEnvironment host) => _host = host;

        public async Task<string> GetWorkflowAsync(string name) {
            var path = $"{_host.WebRootPath}/workflows/{name}.json";

            if (!File.Exists(path)) return string.Empty;

            return await File.ReadAllTextAsync(path);
        }

        public async Task DeployAsync(string workflowJSon) {
            var workflow  = Parse(workflowJSon);
           
            var path = $"{_host.WebRootPath}/workflows/{workflow.Name}.json";

            if (!File.Exists(path))
                File.Delete(path);

            await File.WriteAllTextAsync(path, workflowJSon);
        }
    }
}