using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Caracal.Web.Nova.Builder.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Caracal.Web.Nova.Builder {
  public class Startup {
    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      services.AddTransient<ShapesRepository, FileShapesRepository>();
      
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
        app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
          HotModuleReplacement = true
        });
      }
      else {
        app.UseExceptionHandler("/Home/Error");
      }

      app.UseStaticFiles();

      app.UseMvc(routes => {
        routes.MapRoute(
          name: "designer_get_shape",
          template: "Designer/Shapes/{name?}",
          defaults: new {controller = "Designer", action = "Shapes"});
        
        routes.MapRoute(
          name: "designer_publish",
          template: "Designer/Publish/",
          defaults: new {controller = "Designer", action = "Publish"});

        routes.MapRoute(
          name: "builder",
          template: "Home/Builder",
          defaults: new {controller = "Home", action = "Builder"});


        routes.MapRoute(
          name: "default",
          template: "{controller=Home}/{action=Index}/{id?}");

        routes.MapSpaFallbackRoute(
          name: "spa-fallback",
          defaults: new {controller = "Home", action = "Index"});
      });
    }
  }
}
