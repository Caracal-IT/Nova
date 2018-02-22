using System;
using System.Net.Http;
using AutoMapper;
using Caracal.Web.Nova.Analytics.Clients;
using Caracal.Web.Nova.Application.Controllers;
using Caracal.Web.Nova.Application.Core;
using Caracal.Web.Nova.Application.Core.Settings;
using Caracal.Web.Nova.Workflow.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
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
            services.AddSingleton(new ElasticSearchClient(
                appSettings["elastic:serverUrl"], 
                appSettings["elastic:index:workflow"], 
                appSettings["application"]
            ));
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
            
            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

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
}