using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace BOL.Models
{
    public class SiteModel
    {
        public int SiteID { get; set; }
        public string Name { get; set; }
        public string PhoneNo { get; set; }
        public string Address { get; set; }
        public bool InDoor { get; set; }
        public bool OutDoor { get; set; }
        public bool Accessibility { get; set; }
        public string AvgStayTime { get; set; }
        public string WebSite { get; set; }
        public int AreaID { get; set; }
        public int CategoryID { get; set; }
        public string SitePicture { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }
        public string About { get; set; }
        public List<AreaModel> Area { get; set; }
        public List<CategoryModel> Category { get; set; }
        public List<PriceModel> Price { get; set; }

        public List<OpenHoursModel> OpenHours { get; set; }
    }
}
