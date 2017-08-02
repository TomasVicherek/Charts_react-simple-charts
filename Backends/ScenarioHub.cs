using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace Atlantis.iCC.ReactManual.Backends
{

   [Authorize]
    public class ScenarioHub: Hub
    {
        public ScenarioResultInfo Get(Guid scenarioResultId) {
            var u = Context.User;
            return new ScenarioResultInfo {
                ScenarioResultId = scenarioResultId,
                DisplayName = "Průzkum",
                Activity = "Prefilled",
                TimeUtc = DateTime.UtcNow,
                ResultValues = new List<ScenarioResultValueInfo> {
                    new ScenarioResultValueInfo { DisplayName = "Jméno", ResultText = "Petr Veselý", ScenarioResultValueId = Guid.NewGuid()},
                    new ScenarioResultValueInfo { DisplayName = "Narozen", ResultTime = new DateTime(1983,7,16), ScenarioResultValueId = Guid.NewGuid() },
                    new ScenarioResultValueInfo { DisplayName = "Počet návštěv", ResultNumber = 7, ScenarioResultValueId = Guid.NewGuid() },
                    new ScenarioResultValueInfo { DisplayName = u.Identity.AuthenticationType, ResultText = u.Identity.Name, ScenarioResultValueId = Guid.NewGuid()}
                }
            };
        }
    }

    public class ScenarioResultInfo
    {
        public Guid ScenarioResultId { get; set; }
        public string DisplayName { get; set; }
        public DateTime TimeUtc { get; set; }
        public string Activity { get; set; }

        public List<ScenarioResultValueInfo> ResultValues { get; set; }

    }

    public class ScenarioResultValueInfo
    {
        public Guid ScenarioResultValueId { get; set; }
        public string DisplayName { get; set; }
        public string ResultText { get; set; }
        public int? ResultNumber { get; set; }
        public DateTime? ResultTime { get; set; }


    }

}
