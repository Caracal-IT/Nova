using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;


namespace Caracal.Web.Nova.Application.Controllers {
    public class HomeController : Controller {
        private AppSettings _appSettings;
        
        public HomeController(IOptions<AppSettings> appSettings) {
            _appSettings = appSettings.Value;
        }
        
        public IActionResult Index() {
            ViewData["WorkflowUrl"] =  _appSettings.WorkflowUrl;
            
            return View();
        }

        public IActionResult Error() {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
           
            return View();
        }
    }
}