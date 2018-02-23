using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Workflow.Model {
    public class Workflow
    {
        private string _definition;
        
        [Key]
        public Guid Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        
        public int Version { get; set; }
        public DateTime Timestamp { get; set; }
        
        [NotMapped]
        public JObject Definition
        {
            get => JsonConvert.DeserializeObject<JObject>(string.IsNullOrEmpty(_definition) ? "{}" : _definition);
            set => _definition = value.ToString();
        }

        public static Workflow Parse(string definition) {
            var def = JObject.Load(new JsonTextReader(new StringReader(definition)));
            var name = def["name"].Value<string>();

            return new Workflow {
                Name = name,
                Definition = def,
                Version = 1,
                Timestamp = DateTime.Now
            };
        }
    }
}