function ShowElement(elem) {
  if (elem.hasAttribute('hidden'))
    elem.removeAttribute('hidden');

}
function HideElement(elem) {
  if (!elem.hasAttribute('hidden'))
    elem.setAttribute('hidden', true);

}
function UserAction() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        const elem = document.getElementById("userActionError");
        HideElement(elem);
        const outputContainer = document.getElementById("outputContainer");
        ShowElement(outputContainer);
        document.getElementById("output").innerHTML = this.responseText;
        var time = JSON.parse(this.response);
        AddTimeToTable(time);
      } else {
        const elem = document.getElementById("userActionError");
        ShowElement(elem);
        elem.innerHTML = this.responseText;
      }
    }
  };
  let reqURL = new URL("http://127.0.0.1:5000/api/currenttime");
  var selected = document.getElementById("timeZoneList");
  var value = selected.options[selected.selectedIndex].value;
  reqURL.searchParams.append('timeZone', value);
  xhttp.open("GET", reqURL.href, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();

}
function GetSubmittedTimes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.response);
      data.forEach(time => {
        AddTimeToTable(time);
      });
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/api/submittedtimes", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
function AddTimeToTable(time) {
  const table = document.getElementById('dataTable');
  const tr = document.createElement('tr');
  const tdTime = document.createElement('td');
  const tdTimeZone = document.createElement('td');
  const tdTimeUTC = document.createElement('td');
  const tdIPAddr = document.createElement('td');
  const tdId = document.createElement('td');
  tdTime.textContent = formatDateTime(new Date(time.displayTime));
  tdTimeZone.textContent = time.timeZoneName
  tdTimeUTC.textContent = formatDateTime(new Date(time.utcTime));
  tdIPAddr.textContent = time.clientIp;
  tdId.textContent = time.currentTimeQueryId;
  tr.appendChild(tdTime);
  tr.appendChild(tdTimeZone);
  tr.appendChild(tdTimeUTC);
  tr.appendChild(tdIPAddr);
  tr.appendChild(tdId);
  table.appendChild(tr);
}
function GetTimeZones() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.response);
      CreateTimeZoneDropDown(data);
    }
  };
  xhttp.open("GET", "http://127.0.0.1:5000/api/timezones", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send();
}
function AddZoneToList(timeZone) {
  const list = document.getElementById('timeZoneList');
  const option = document.createElement('option');
  option.value = timeZone.timeZoneId;
  option.text = timeZone.timeZoneDisplayName;
  list.appendChild(option);
}
function CreateTimeZoneDropDown(data) {
  data.forEach(timeZone => {
    AddZoneToList(timeZone);
  });
}

function formatDateTime(time) {
  var year = time.getFullYear(),
    month = time.getMonth() + 1, // months are zero indexed
    day = time.getDate(),
    hour = time.getHours(),
    minute = time.getMinutes(),
    second = time.getSeconds(),
    hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    morning = hour < 12 ? "am" : "pm";

  return month + "/" + day + "/" + year + " " + hourFormatted + ":" +
    minuteFormatted + ":" + second + " " + morning;
}
GetTimeZones();
GetSubmittedTimes();