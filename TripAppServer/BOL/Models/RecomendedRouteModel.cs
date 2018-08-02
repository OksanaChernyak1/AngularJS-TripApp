using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BOL.Models
{
    public class RecomendedRouteModel
    {
        public int RouteID { get; set; }
        public string RouteName { get; set; }
        public TimeSpan AvgRouteTime { get; set; }
        public int Difficulty { get; set; }
        public string RoutePicture { get; set; }

        public List<RouteNumberingModel> RouteNumberings { get; set; }

    }
}
