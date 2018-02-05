namespace Caracal.Web.Nova.Application.Core.Repositories {
    public interface StateMachineRepository {
        void Deploy(string workflow);
        string GetWorkflow(string name);
    }
}