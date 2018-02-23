using System.Threading.Tasks;

namespace Caracal.Web.Nova.Workflow.Repositories {
    public interface StateMachineRepository {
        Task DeployAsync(string workflow);
        Task<string> GetWorkflowAsync(string name);
    }
}