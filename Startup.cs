using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(Atlantis.iCC.ReactManual.Startup))]

namespace Atlantis.iCC.ReactManual
{
    public class Startup
    {
        public void Configuration(IAppBuilder app) {
            app.MapSignalR();
        }
    }
}
