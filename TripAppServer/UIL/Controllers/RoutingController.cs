using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BOL.Models;
using BLL;
using System.Web.Http.Cors;

namespace UIL.Controllers
{
    [EnableCors("*", "*", "*")]
    [RoutePrefix("api/route")]
    public class RoutingController : ApiController
    {
        RouteManager rm = new RouteManager();

        [Route("getAllRoutes")]
        public HttpResponseMessage GetAllRoutes()
        {
            try
            {
                List<RecomendedRouteModel> listAllRoutes = rm.GetRouteList();
                return Request.CreateResponse(HttpStatusCode.OK, listAllRoutes);
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }


        [Route("getRoute")]
        public HttpResponseMessage GetRoute([FromUriAttribute]int id)
        {
            try
            {
                RecomendedRouteModel recomendedRoute = rm.GetRecomendedRouteByID(id);
                return Request.CreateResponse(HttpStatusCode.OK, recomendedRoute);
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }


    }
}
