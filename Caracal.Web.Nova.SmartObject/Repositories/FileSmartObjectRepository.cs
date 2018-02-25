using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.SmartObject.Repositories {
    public class FileSmartObjectRepository : SmartObjectRepository {
        private readonly IHostingEnvironment _host;
        
        public FileSmartObjectRepository(IHostingEnvironment host) => _host = host;

        
        public async Task SaveAsync(string name, string smartObject) {
            var def = JObject.Load(new JsonTextReader(new StringReader(smartObject)));
            var id = "1";

            if (def?["id"]?.Value<string>() != null) {
                var idString = def["id"].Value<string>();
                
                if(Regex.Match(idString, "^\\d+$").Success)
                    id = idString;
            }

            var path = $"{_host.WebRootPath}/smartObjects/{name}-{id}.json";

            if (!File.Exists(path))
                File.Delete(path);

            await File.WriteAllTextAsync(path, smartObject);
        }

        public async Task<string> GetSmartObjectAsync(string name, int id) {
            var path = $"{_host.WebRootPath}/smartObjects/{name}-{id}.json";

            if (!File.Exists(path)) return string.Empty;

            return await File.ReadAllTextAsync(path);
        }
    }
}