using System;
using System.Net.Http;
using AutoMapper;
using Caracal.Web.Nova.Application.Controllers;
using Caracal.Web.Nova.Application.Core.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Caracal.Web.Nova.Application {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            var appSettings = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettings);
            
            services.AddMvc();
            services.AddSingleton<StateMachineRepository, FileStateMachineRepository>();
            services.AddSingleton(new HttpClient{Timeout = new TimeSpan(0, 0, 30)});
            services.AddSingleton<ElasticSearchClient>();
            services.AddAutoMapper();
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
                    name: "default_test",
                    template: "Home/Test");
                
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new {controller = "Home", action = "Index"});
            });
        }
    }

    public class AppSettings {
        public string Application { get; set; }
        public string WorkflowUrl { get; set; }
        public string AnalyticsUrl { get; set; }
        public Elastic Elastic { get; set; }
    }

    public class Elastic {
        public string ServerUrl { get; set; }
        public Index Index { get; set; }
    }

    public class Index {
        public string Workflow { get; set; }
    }
}