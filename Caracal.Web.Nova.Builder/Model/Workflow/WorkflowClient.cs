using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Caracal.Web.Nova.Builder.Model.Workflow {
  public static class WorkflowClient {
    private static readonly HttpClient Client = new HttpClient();
    
    public static async Task Publish(object wf) {
      try {
        var url = "http://localhost/api/workflow/publish";
        // var url = "http://workflow.api/api/workflow/publish";
        var myContent = JsonConvert.SerializeObject(wf, new JsonSerializerSettings { 
          ContractResolver = new CamelCasePropertyNamesContractResolver() 
        });
        
        var buffer = Encoding.UTF8.GetBytes(myContent);
        var byteContent = new ByteArrayContent(buffer);
        byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
             
        var message = await Client.PostAsync(url, byteContent);
        Console.WriteLine(message.ReasonPhrase);
      }
      catch (Exception exception) {
        Console.WriteLine("Error :{0}", exception.StackTrace);
      }
    
    }
  }
}
