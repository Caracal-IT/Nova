using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;


namespace Caracal.Web.Nova.Application.Controllers {
    public class HomeController : Controller {
        private readonly AppSettings _appSettings;

        public HomeController(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }

        public IActionResult Index() {
            ViewData["WorkflowUrl"] = _appSettings.WorkflowUrl;
            ViewData["AnalyticsUrl"] = _appSettings.AnalyticsUrl;

            return View();
        }
        
        public IActionResult Test() {
            return View();
        }

        public IActionResult Error() {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;

            return View();
        }
    }
}