using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite.Internal.ApacheModRewrite;
using Newtonsoft.Json;


namespace Caracal.Web.Nova.Application.Controllers {
    [Route("/api/analytics")]
    public class AnalyticsController: Controller {
        private static readonly HttpClient Client = new HttpClient{Timeout = new TimeSpan(0, 0, 30)};
        
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] object request) {
            var elasticSearch = new ElasticSearchClient();
            await elasticSearch.LogClientError(JsonConvert.SerializeObject(request));

            return Ok();
        }         
    }
    
    public class ElasticSearchClient {
        private static readonly HttpClient Client = new HttpClient{Timeout = new TimeSpan(0, 0, 30)};
        
        public string Url { get; set; }
        public string AuthToken { get; set; }
        
        public async Task LogClientError(string message) {
            try {
                //Client.DefaultRequestHeaders.Authorization = AuthenticationHeaderValue.Parse(AuthToken);
                var url = $"http://localhost:32769/workflow/nova";
                var content = new StringContent(message, Encoding.UTF8, "application/json"); //new StringContent(JSON.Serialize(message, Options.CamelCase));
               

                await Client.PostAsync(url, content);
            }
            catch (Exception exception) {
                Console.WriteLine("Error :{0}", exception.Message);
            }
        }
    }
}