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
    [RoutePrefix("api/sites")]
    public class SiteController : ApiController
    {
       public SiteManager sm = new SiteManager();

        [Route("getAllSites")]
        public HttpResponseMessage GetAllSites()
        {
            try
            {
                List<SiteModel> listAllSites = sm.GetAllSites();
                return Request.CreateResponse(HttpStatusCode.OK, listAllSites);
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        [Route("getSite")]
        public HttpResponseMessage GetSite([FromUriAttribute]int id)
        {
            try
            {
                SiteModel site = sm.GetSite(id);
                return Request.CreateResponse(HttpStatusCode.OK, site);
            }
            catch (Exception e)
            {

                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }

        }
    }
}
