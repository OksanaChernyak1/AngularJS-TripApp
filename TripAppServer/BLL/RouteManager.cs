using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using BOL.Models;

namespace BLL
{
    public class RouteManager
    {

        public List<RecomendedRouteModel> GetRouteList()
        {
            using (DBTripEntities1 db = new DBTripEntities1())
            {
                var recomnededRoutes = db.RecomendedRoutes.Select(x =>
                new RecomendedRouteModel
                {
                    AvgRouteTime = x.AvgRouteTime,
                    Difficulty = x.Difficulty,
                    RouteID = x.RouteID,
                    RouteName = x.RouteName,
                    RoutePicture=x.RoutePicture
                }).ToList();
                return recomnededRoutes;
            }
        }

        public List<RecomendedRouteModel> GetRouteDetailsList()
        {
            using (DBTripEntities1 db = new DBTripEntities1())
            {
                var routeNumberingList = db.RouteNumberings.Select(x => new RouteNumberingModel { NumInRoute = x.NumInRoute  , RouteID = x.RouteID ,  SiteID = x.SiteID}).ToList();

                var recomnededRoutes = db.RecomendedRoutes.Select(x =>
                new RecomendedRouteModel
                {
                    AvgRouteTime = x.AvgRouteTime,
                    Difficulty = x.Difficulty,
                    RouteID = x.RouteID,
                    RouteName = x.RouteName,
                    RouteNumberings = routeNumberingList}).ToList();
                return recomnededRoutes;
            }
        }

        public RecomendedRouteModel GetRecomendedRouteByID(int id)
        {
            using (DBTripEntities1 db = new DBTripEntities1())
            {
                var list = db.RouteNumberings.Where(x => x.RecomendedRoute.RouteID == id).Select(x => new RouteNumberingModel { NumInRoute = x.NumInRoute, RouteID = x.RouteID, SiteID = x.SiteID }).ToList();
                var route = db.RecomendedRoutes.Where(x => x.RouteID == id).Select(x =>
                  new RecomendedRouteModel
                  {
                      AvgRouteTime = x.AvgRouteTime,
                      Difficulty = x.Difficulty,
                      RouteID = x.RouteID,
                      RouteName = x.RouteName,
                      RoutePicture = x.RoutePicture,
                  }).FirstOrDefault();

                if (list != null){
                    route.RouteNumberings = new List<RouteNumberingModel>();
                    route.RouteNumberings.AddRange(list);
                }
                

                return route;
            }
        }

    }
}
