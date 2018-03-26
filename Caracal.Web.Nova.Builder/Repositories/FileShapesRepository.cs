using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;

namespace Caracal.Web.Nova.Builder.Repositories {
  public class FileShapesRepository : ShapesRepository {
    private readonly IHostingEnvironment _host;
    
    public FileShapesRepository(IHostingEnvironment host) => _host = host;
    
    public async Task SaveProcessAsync(string process) {
      var json = JObject.Parse(process);
      var name = json["name"].Value<string>();
      
      var path = $"{_host.WebRootPath}/shapes/{name}.json";
      
      if (!File.Exists(path))
        File.Delete(path);

      await File.WriteAllTextAsync(path, process);
    }
  }
}
