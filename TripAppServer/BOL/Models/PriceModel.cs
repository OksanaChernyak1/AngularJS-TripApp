using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BOL.Models
{
    public class PriceModel
    {
        public int PriceID { get; set; }
        public int CityzenTypeID { get; set; }
        public int Price { get; set; }
        public int SiteID { get; set; }
        public CityzenTypeModel CityzenType { get; set; }
    }
}
