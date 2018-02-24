using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

using static Caracal.Web.Nova.Workflow.Model.Workflow;

namespace Caracal.Web.Nova.Workflow.Repositories {
    public class DbStateMachineRepository : DbContext, StateMachineRepository {
        public DbSet<Model.Workflow> Workflows { get; set; } 
        
        public DbStateMachineRepository(DbContextOptions options) : base(options) {
        }

        public async Task DeployAsync(string workflowJSon) {
            var workflow  = Parse(workflowJSon);
            
            var wf = await Workflows.FirstOrDefaultAsync(w => w.Name == workflow.Name);

            if (wf != null) 
                wf.Definition = workflow.Definition;
            else 
                Workflows.Add(workflow);

            SaveChanges();
        }

        public async Task<string> GetWorkflowAsync(string name) {
            var wf = await Workflows.FirstAsync(w => w.Name == name);
            return wf.Definition.ToString();
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("workflow");
            
            modelBuilder.Entity<Model.Workflow>()
                .Ignore(wf => wf.Definition);
            
            modelBuilder.Entity<Model.Workflow>()
                .Property<string>("DefinitionStr")
                .HasColumnType("jsonb")
                .HasField("_definition");
        }
    }
}