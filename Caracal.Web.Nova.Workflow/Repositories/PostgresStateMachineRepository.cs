using System;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Workflow.Repositories {
    public class PostgresStateMachineRepository : DbContext, StateMachineRepository {
        
        public DbSet<Model.Workflow> Workflows { get; set; } 
        
        public PostgresStateMachineRepository(DbContextOptions options) : base(options) {
        }

        public void Deploy(string workflow) {
            var wfdef = JObject.Load(new JsonTextReader(new StringReader(workflow)));
            var name = wfdef["name"].Value<string>();

            var wf = Workflows
                .FirstOrDefault(w => w.Name == name);

            if (wf != null) 
                wf.Definition = wfdef;
            else {
                Workflows.Add(new 
                    Model.Workflow {
                        Id = Guid.NewGuid(),
                        Name = name, 
                        Version = 1, 
                        Timestamp = DateTime.Now,
                        Definition = wfdef
                    });
            }

            SaveChanges();
        }

        public string GetWorkflow(string name) {
            return 
                Workflows
                    .First(w => w.Name == name)
                    .Definition
                    .ToString();
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