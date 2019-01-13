using System;
using Microsoft.AspNetCore.Mvc;
using Clockwork.API.Models;
using System.Collections.Generic;
using System.Linq;

namespace Clockwork.API.Controllers
{
    [Route("api/[controller]")]
    public class TimeZonesController : Controller
    {
        // GET api/timezones
        [HttpGet]
        public IActionResult Get()
        {
            List<Models.TimeZone> zones = new List<Models.TimeZone>();
            var zonesFromSystem = TimeZoneInfo.GetSystemTimeZones();
            foreach (TimeZoneInfo zoneFromSystem in zonesFromSystem)
            {
                Models.TimeZone zone = new Models.TimeZone
                {
                    TimeZoneDisplayName = zoneFromSystem.DisplayName,
                    TimeZoneId = zoneFromSystem.Id
                };
                zones.Add(zone);
            }
            return Ok(zones);
        }
    }
}
