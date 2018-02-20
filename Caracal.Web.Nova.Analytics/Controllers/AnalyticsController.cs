using System.Threading.Tasks;
using Caracal.Web.Nova.Analytics.Clients;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Caracal.Web.Nova.Analytics.Controllers {

    [Route("/api/analytics")]
    public class AnalyticsController : Controller {

        private readonly ElasticSearchClient _elasticSearch;

        public AnalyticsController(ElasticSearchClient elasticSearch) {
            _elasticSearch = elasticSearch;
        }

        [HttpPost]
        public async Task<IActionResult> Index([FromBody] object request) {
            await _elasticSearch.IndexDocumentAsync(JsonConvert.SerializeObject(request));

            return Ok();
        }
    }
}