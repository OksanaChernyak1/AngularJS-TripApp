using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using BOL.Models;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Configuration;
using System.Data.EntityClient;
using System.Data;

namespace BLL
{
    public class SiteManager
    {

        public List<SiteModel> GetAllSites()
        {
            using (DBTripEntities1 db = new DBTripEntities1())
            {
                
                var allSites = db.Sites.Select(s=> new SiteModel
                {
                    SiteID = s.SiteID,
                    Name = s.Name,
                    SitePicture = s.SitePicture,
                    Lat = s.Lat,
                    Lon = s.Lon
                    }).ToList();

                return allSites;

            }
        }

        public SiteModel GetSite(int siteID)
        {
            using (DBTripEntities1 db = new DBTripEntities1())
            {

                //string cnnString = System.Configuration.ConfigurationManager.AppSettings["connectionString"];
                //string conn = ConfigurationManager.ConnectionStrings["DBTripEntities1"].ConnectionString;
                //var builder = new EntityConnectionStringBuilder(conn);
                //var regularConnectionString = builder.ProviderConnectionString;

                //SqlConnection cnn = new SqlConnection(regularConnectionString);
                //SqlCommand cmd = new SqlCommand();
                //cmd.Connection = cnn;
                //cmd.CommandType = System.Data.CommandType.StoredProcedure;
                //cmd.CommandText = "getSiteByID";
                //cmd.Parameters.AddWithValue("@siteID", 100);
                ////add any parameters the stored procedure might require
                //cnn.Open();
                //DataTable listCustomerJobDetails = new DataTable();
                //listCustomerJobDetails.Load(cmd.ExecuteReader());
                
                ////var o = cmd.ExecuteNonQuery();
                //cnn.Close();




                var priceList = db.Prices.Where(x => x.SiteID == siteID).Select(x =>  new PriceModel {CityzenType =  new CityzenTypeModel {CityzenTypeName = x.CityzenType.CityzenTypeName , CityzenTypeID = x.CityzenType.CityzenTypeID  }, CityzenTypeID = x.CityzenTypeID, PriceID = x.PriceID, Price = x.Price1, SiteID = x.SiteID } ).ToList();
                var openHours = db.OpenHours.Where(x => x.SiteID == siteID).Select(x => new OpenHoursModel {Days = new DaysModel {DayID = x.Day.DayID, DayName=x.Day.DayName } ,CloseHour = x.CloseHour.HasValue ? x.CloseHour.Value : new TimeSpan(0, 0, 0), SiteID = x.SiteID, DayID = x.DayID, OpenHour = x.OpenHour1.HasValue ? x.OpenHour1.Value : new TimeSpan(0, 0, 0), OpenHoursID = x.OpenHoursID }).ToList();
                var allSites = from s in db.Sites
                               join p in db.Prices on s.SiteID equals p.SiteID into SP
                               from sp in SP.DefaultIfEmpty()
                               join ct in db.CityzenTypes on sp.CityzenTypeID equals ct.CityzenTypeID into CTSP
                               from ctsp in CTSP.DefaultIfEmpty()
                               join oh in db.OpenHours on s.SiteID equals oh.SiteID into OHS
                               from ohs in OHS.DefaultIfEmpty()
                               join d in db.Days on ohs.DayID equals d.DayID into DOHS
                               from dohs in DOHS.DefaultIfEmpty()
                select new SiteModel
                               {
                                   SiteID = s.SiteID,
                                   Name = s.Name,
                                   PhoneNo = s.PhoneNo,
                                   Address = s.Address,
                                   InDoor = s.InDoor.HasValue ? s.InDoor.Value : false,
                                   OutDoor = s.OutDoor.HasValue ? s.OutDoor.Value : false,
                                   Accessibility = s.Accessibility.HasValue ? s.Accessibility.Value : false,
                                   AvgStayTime = s.AvgStayTime,
                                   SitePicture= s.SitePicture,
                                   WebSite = s.WebSite,
                                   AreaID = s.AreaID,
                                   CategoryID = s.CategoryID,
                                   Lat = s.Lat,
                                   Lon = s.Lon,
                                   About = s.About,
                                   Area = new List<AreaModel> { new AreaModel { AreaID = s.Area.AreaID, AreaName = s.Area.Name } },
                                   Category = new List<CategoryModel> { new CategoryModel { CategoryID = s.Category.CategoryID, CategoryName = s.Category.CategoryName } },
                              };

                var site = allSites.Where(x => x.SiteID == siteID).Select(x => x).FirstOrDefault();

                site.OpenHours = new List<OpenHoursModel>();
                site.Price = new List<PriceModel>();
                site.OpenHours.AddRange(openHours);
                site.Price.AddRange(priceList);
                return site;

            }
        }
    }
}
