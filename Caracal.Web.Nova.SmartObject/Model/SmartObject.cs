using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.SmartObject.Model {
    public class SmartObject {
        private string _definition;
        
        [Key]
        public int Id { get; set; }
        
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

        public static SmartObject Parse(string name, string definition) {
            var def = JObject.Load(new JsonTextReader(new StringReader(definition)));
            var id = 1;

            if (def?["id"]?.Value<string>() != null) {
                var idString = def["id"].Value<string>();
                
                if(Regex.Match(idString, "^\\d+$").Success)
                    id = Convert.ToInt32(idString);
            }
            
            return new SmartObject {
                Id = id,
                Name = name,
                Definition = def,
                Version = 1,
                Timestamp = DateTime.Now
            };
        }
    }
}