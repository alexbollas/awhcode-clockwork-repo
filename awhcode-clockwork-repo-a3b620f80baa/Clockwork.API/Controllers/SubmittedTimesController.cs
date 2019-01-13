using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace Clockwork.API.Controllers
{
    [Route("api/[controller]")]
    public class SubmittedTimesController : Controller
    {
        // GET api/submittedtimes
        [HttpGet]
        public IActionResult Get()
        {
            List<CurrentTimeQuery> times = new List<CurrentTimeQuery>();
            using (var db = new ClockworkContext())
            {
                
                times = db.CurrentTimeQueries.ToList();
                
                Console.WriteLine();
                foreach (var CurrentTimeQuery in times)
                {
                    Console.WriteLine(" - {0}", CurrentTimeQuery.UTCTime);
                }
            }

            return Ok(times);
        }
    }
}
