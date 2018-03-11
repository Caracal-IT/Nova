using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Caracal.Web.Nova.Builder.Controllers {
  public class HomeController : Controller {
    public IActionResult Index() {
      return View();
    }

    public IActionResult Error() {
      ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
      return View();
    }

    public IActionResult Builder() {
      return View();
    }
  }
}
