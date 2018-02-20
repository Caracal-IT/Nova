using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Caracal.Web.Nova.Analytics.Clients {
    public class ElasticSearchClient {
        private readonly string _url;
        private readonly string _index;
        private readonly string _type;
        
        private readonly HttpClient _client;
        
        public ElasticSearchClient(string url, string index, string type) {
            _url = url;
            _index = index;
            _type = type;
        }
        
        public async Task IndexDocumentAsync(string message) {
            try {
                var url = $"{_url}/{_index}/{_type}";
                var content = new StringContent(message, Encoding.UTF8, "application/json");
               
                await _client.PostAsync(url, content);
            }
            catch (Exception exception) {
                Console.WriteLine("Error :{0}", exception.Message);
            }
        }
    }
}