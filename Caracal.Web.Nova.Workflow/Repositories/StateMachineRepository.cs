namespace Caracal.Web.Nova.Workflow.Repositories {
    public interface StateMachineRepository {
        void Deploy(string workflow);
        string GetWorkflow(string name);
    }
}