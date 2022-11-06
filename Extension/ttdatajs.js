// table.style.backgroundColor = "red";
var ttdata_only_one_send = true;
////

const ttdata_stringtime_to_seconds = (str) => {
  let arr = str.split(" ");
  let am_or_pm = arr[1];
  let time = arr[0].split(":");
  let hours = parseInt(time[0]);
  let minutes = parseInt(time[1]);
  let seconds = parseInt(time[2]);

  if (hours == 12) {
    hours = 0;
  }
  if (am_or_pm == "PM") {
    hours += 12;
  }
  return hours * 60 * 60 + minutes * 60 + seconds;
};

const ttdata_validate_date = (str) => {
  let arr = str.split("-");
  return arr[2] + "-" + arr[0] + "-" + arr[1];
};

const ttdata_validate_lat_lng = (flo) => {
  return Math.round(flo * 100000000) / 100000000;
};

const ttdata_validate_time = (str) => {
  let timeseconds = ttdata_stringtime_to_seconds(str);
  let hours = Math.floor(timeseconds / (60 * 60));
  timeseconds -= hours * 60 * 60;
  let minutes = Math.floor(timeseconds / 60);
  timeseconds -= minutes * 60;
  let seconds = timeseconds;
  return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
};

const ttdata_validate_status = (status) => {
  let ret = status;
  ret = status == "POWER ON" ? "PON" : status == "POWER OFF" ? "POF" : status == "CERTIFY" ? "CER" : status == "INTERMEDIATE" ? "INT" : status == "LOGIN" ? "LIN" : status == "LOGOUT" ? "LOU" : status;
  return ret;
};

const asdflkjttdata_get = async () => {
  if (location.href.includes("/logs/driver")) {
    let ttdata_table = document.getElementsByClassName("table")[0];
    if (ttdata_table) {
      let ttdata_tbody = ttdata_table.getElementsByTagName("tbody")[0];
      let hrfarr = location.href.split("/");
      let ttdata_driver_id = hrfarr[8];
      let ttdata_date = hrfarr[9];
      if (ttdata_date.includes("?")) {
        ttdata_date = ttdata_date.split("?")[0];
      }
      let last_taken_time = 0;
      // getting local information
      let ttdata_check = localStorage.getItem("ttdatascrap");
      if (ttdata_check) {
        let ttdatascrap = JSON.parse(ttdata_check).data;
        // console.log("ttdatascrap", ttdatascrap);
        let driver_ids_saved = [];
        for (let i = 0; i < ttdatascrap.length; i++) {
          driver_ids_saved.push(ttdatascrap[i].driver);
        }
        if (driver_ids_saved.includes(ttdata_driver_id)) {
          //getting index of current driver
          let current_index = 0;
          for (let i = 0; i < ttdatascrap.length; i++) {
            if (ttdatascrap[i].driver == ttdata_driver_id) {
              current_index = i;
              break;
            }
          }
          // getting current driver data
          let current_driverdata = ttdatascrap[current_index].driverdata;
          // console.log("current_driverdata", current_driverdata);
          // getting  saved dates for the driver
          let driver_dates_saved = [];
          for (let i = 0; i < current_driverdata.length; i++) {
            driver_dates_saved.push(current_driverdata[i].date);
          }
          if (driver_dates_saved.includes(ttdata_date)) {
            //getting index of current driver
            let current_date_index = 0;
            for (let i = 0; i < ttdatascrap[current_index].driverdata.length; i++) {
              if (ttdatascrap[current_index].driverdata[i].date == ttdata_date) {
                current_date_index = i;
                break;
              }
            }
            last_taken_time = ttdatascrap[current_index].driverdata[current_date_index].time;
            /////////////////////////////////////////////////////////////////////////////////////////
            let post_data_array = [];
            //
            let ttdata_trs = ttdata_tbody.getElementsByTagName("tr");
            let ttttttttttttttttttttime;

            for (let i = 0; i < ttdata_trs.length; i++) {
              ttttttttttttttttttttime = ttdata_stringtime_to_seconds(ttdata_trs[i].getElementsByTagName("td")[3].getElementsByClassName("start")[0].innerText);
              if (ttttttttttttttttttttime > last_taken_time) {
                ttdatascrap[current_index].driverdata[current_date_index].time = ttttttttttttttttttttime;
                post_data_array.push({
                  status: ttdata_validate_status(ttdata_trs[i].getElementsByTagName("td")[2].getElementsByClassName("status-indicator")[0].innerText),
                  time: ttdata_validate_time(ttdata_trs[i].getElementsByTagName("td")[3].getElementsByClassName("start")[0].innerText),
                  date: ttdata_validate_date(ttdata_date),
                  location: ttdata_trs[i].getElementsByTagName("td")[5].getElementsByClassName("location")[0].innerText,
                  lat: ttdata_validate_lat_lng(parseFloat(ttdata_trs[i].getElementsByTagName("td")[5].getElementsByClassName("location")[0].title.split(", ")[0])),
                  lng: ttdata_validate_lat_lng(parseFloat(ttdata_trs[i].getElementsByTagName("td")[5].getElementsByClassName("location")[0].title.split(", ")[1])),
                  odometer: parseInt(ttdata_trs[i].getElementsByTagName("td")[7].getElementsByTagName("span")[0].innerText),
                  eng_hours: parseFloat(ttdata_trs[i].getElementsByTagName("td")[8].getElementsByClassName("eng-hours")[0].innerText),
                  notes: ttdata_trs[i].getElementsByTagName("td")[9].getElementsByClassName("notes")[0].innerText,
                  document: ttdata_trs[i].getElementsByTagName("td")[10].getElementsByClassName("notes")[0].innerText,
                });
              }
            }

            console.log(post_data_array);

            /////////////////////////////////////////////////////////////////////////////////////////////
            // posting all data
            if (post_data_array.length > 0 && ttdata_only_one_send) {
              ttdata_only_one_send = false;
              let response = await fetch("https://www.f1tms.net/ttdata/" + ttdata_driver_id, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(post_data_array),
              });
              let responsedata = await response.json();
              console.log("data***", responsedata);
              console.log("statua****", response.status);
              ttdata_only_one_send = true;
              if (response.status == 400) {
                window.alert("See the logs!!!!");
              }
            }

            //
          } else {
            ttdatascrap[current_index].driverdata.push({
              date: ttdata_date,
              time: 0,
            });
          }
        } else {
          ttdatascrap.push({
            driver: ttdata_driver_id,
            driverdata: [],
          });
        }

        //setting back the data
        localStorage.setItem("ttdatascrap", JSON.stringify({ data: ttdatascrap }));

        //
      } else {
        localStorage.setItem("ttdatascrap", JSON.stringify({ data: [] }));
      }
    }
  }
};

console.log("start**********");

setInterval(asdflkjttdata_get, 1000);
