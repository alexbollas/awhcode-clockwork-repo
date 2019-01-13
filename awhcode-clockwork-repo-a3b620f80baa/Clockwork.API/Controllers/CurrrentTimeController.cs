using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;

namespace Clockwork.API.Controllers
{
    [Route("api/[controller]")]
    public class CurrentTimeController : Controller
    {
        // GET api/currenttime
        [HttpGet]
        public IActionResult Get([FromQuery(Name = "timeZone")] string timeZoneId)
        {
            if(timeZoneId == null || timeZoneId == string.Empty)
            {
                return BadRequest("You must choose a time zone");
            }
            var utcTime = DateTime.UtcNow;
            var serverTime = DateTime.Now;
            var ip = this.HttpContext.Connection.RemoteIpAddress.ToString();

            TimeZoneInfo timeZone = TimeZoneInfo.FindSystemTimeZoneById(timeZoneId);
            DateTime displayTime = TimeZoneInfo.ConvertTime(serverTime, timeZone);

            var returnVal = new CurrentTimeQuery
            {
                UTCTime = utcTime,
                ClientIp = ip,
                Time = serverTime,
                DisplayTime = displayTime,
                TimeZoneName = timeZone.DisplayName
            };

            using (var db = new ClockworkContext())
            {
                db.CurrentTimeQueries.Add(returnVal);
                var count = db.SaveChanges();
                Console.WriteLine("{0} records saved to database", count);

                Console.WriteLine();
                foreach (var CurrentTimeQuery in db.CurrentTimeQueries)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }

            return Ok(returnVal);
        }
      
    }
}
