using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BOL.Models
{
    public class OpenHoursModel
    {
        public int OpenHoursID { get; set; }
        public int DayID { get; set; }
        public TimeSpan OpenHour { get; set; }
        public TimeSpan CloseHour { get; set; }
        public int SiteID { get; set; }
        public DaysModel Days { get; set; }
    }
}
