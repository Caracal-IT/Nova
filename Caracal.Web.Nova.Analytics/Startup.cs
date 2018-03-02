using Caracal.Web.Nova.Analytics.Clients;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Caracal.Web.Nova.Analytics {
    public class Startup {
        public Startup(IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            var appSettings = Configuration.GetSection("AppSettings");
            
            services.AddSingleton(new ElasticSearchClient(
                appSettings["elastic:serverUrl"], 
                appSettings["elastic:index:workflow"], 
                appSettings["application"]
            ));
          
            services.AddResponseCompression(options => options.Providers.Add<GzipCompressionProvider>());
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env) {
            if (env.IsDevelopment()) {
                app.UseDeveloperExceptionPage();
            }

            app.UseResponseCompression();
            app.UseMvc();
        }
    }
}