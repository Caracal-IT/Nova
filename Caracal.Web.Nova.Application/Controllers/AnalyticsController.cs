using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;


namespace Caracal.Web.Nova.Application.Controllers {
    [Route("/api/analytics")]
    public class AnalyticsController: Controller {

        private readonly ElasticSearchClient _elasticSearch;
        
        public AnalyticsController(ElasticSearchClient elasticSearch) {
            _elasticSearch = elasticSearch;
        }
        
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] object request) {
            await _elasticSearch.LogClientError(JsonConvert.SerializeObject(request));

            return Ok();
        }         
    }
    
    public class ElasticSearchClient {
        private readonly AppSettings _appSettings;
        private readonly HttpClient _client;
    
        public ElasticSearchClient(IOptions<AppSettings> appSettings, HttpClient client) {
            _appSettings = appSettings.Value;
            _client = client;
        }
        
        public async Task LogClientError(string message) {
            try {
                var elastic = _appSettings.Elastic.ServerUrl;
                var index = _appSettings.Elastic.Index.Workflow;
                var type = _appSettings.Application.ToLower();
                
                var url = $"{elastic}/{index}/{type}";
                Console.WriteLine("Elastic URL" + url);
                var content = new StringContent(message, Encoding.UTF8, "application/json");
               
                await _client.PostAsync(url, content);
            }
            catch (Exception exception) {
                Console.WriteLine("Error :{0}", exception.Message);
            }
        }
    }
}