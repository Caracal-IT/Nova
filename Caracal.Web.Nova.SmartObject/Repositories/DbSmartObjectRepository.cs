using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Caracal.Web.Nova.SmartObject.Repositories {
    public class DbSmartObjectRepository : DbContext, SmartObjectRepository {
        public DbSet<Model.SmartObject> SmartObjects { get; set; }
        
        public DbSmartObjectRepository(DbContextOptions options) : base(options) { }
        
        public async Task SaveAsync(string name, string smartObject) {
            var s  = SmartObject.Model.SmartObject.Parse(name, smartObject); 
            var smo = await SmartObjects.FirstOrDefaultAsync(so => so.Name == s.Name);

            if (smo != null) 
                smo.Definition = s.Definition;
            else 
                SmartObjects.Add(s);

            SaveChanges();
        }

        public async Task<string> GetSmartObjectAsync(string name, int id) {
            var wf = await SmartObjects
                .FirstOrDefaultAsync(smo => 
                    smo.Name == name && smo.Id == id
            );
            
            return wf?.Definition?.ToString();
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.HasDefaultSchema("smo");
            
            modelBuilder.Entity<Model.SmartObject>()
                .Ignore(wf => wf.Definition);
            
            modelBuilder.Entity<Model.SmartObject>()
                .Property<string>("DefinitionStr")
                .HasColumnType("jsonb")
                .HasField("_definition");
        }
    }
}