import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";
import {
  DRIVERS_URL,
  DRIVER_TYPE,
  DRIVER_STATUS,
  ACTIVITY_RANGE,
} from "../../../constants/constants";
import { fixDate, getChoice, dateToString } from "../../../functions/Functions";
import Loading from "../../common/Loading";
import Select from "../../common/Select";
import ActivityCart from "../../common/ActivityCart";

const Driver = () => {
  const params = useParams();
  const request = useRequest(DRIVERS_URL + "?id=" + params.id);
  const [scale, setScale] = useState({
    choice: "r1",
    from: "2023-02-17T00:00:00.000000-05:00",
    to: "2023-02-19T00:00:00.000000-05:00",
  });

  const activityRequest = useRequest(
    `${DRIVERS_URL}?id=${params.id}&activity=True&from=${scale.from}&to=${scale.to}`
  );

  const handleScaleChange = ({ currentTarget: input }) => {
    const newScale = { ...scale };
    newScale[input.name] = input.value;
    if (input.value == "r1") {
      var d = new Date();
      var from = new Date();
      var to = new Date();
      to.setTime(
        d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000
      );
      from.setTime(to.getTime() - 7 * 24 * 60 * 60 * 1000);
      newScale["from"] = dateToString(from, "%y-%m-%dT00:00:00.000000-05:00");
      newScale["to"] = dateToString(to, "%y-%m-%dT00:00:00.000000-05:00");
    }
    if (input.value == "r2") {
      var from = new Date();
      var to = new Date();
      from.setTime(to.getTime() - 7 * 24 * 60 * 60 * 1000);
      newScale["from"] = dateToString(from, "%y-%m-%dT00:00:00.000000-05:00");
      newScale["to"] = dateToString(to, "%y-%m-%dT00:00:00.000000-05:00");
    }
    if (input.value == "r3") {
      var d = new Date();
      var from = new Date();
      var to = new Date();
      to.setTime(d.getTime() - d.getDate() * 24 * 60 * 60 * 1000);
      from.setTime(to.getTime() - 30 * 24 * 60 * 60 * 1000);
      newScale["from"] = dateToString(from, "%y-%m-%dT00:00:00.000000-05:00");
      newScale["to"] = dateToString(to, "%y-%m-%dT00:00:00.000000-05:00");
    }
    if (input.value == "r4") {
      var from = new Date();
      var to = new Date();
      from.setTime(to.getTime() - 30 * 24 * 60 * 60 * 1000);
      newScale["from"] = dateToString(from, "%y-%m-%dT00:00:00.000000-05:00");
      newScale["to"] = dateToString(to, "%y-%m-%dT00:00:00.000000-05:00");
    }
    setScale(newScale);
    activityRequest.setUrl(
      `${DRIVERS_URL}?id=${params.id}&activity=True&from=${scale.from}&to=${scale.to}`
    );
    activityRequest.getData();
  };

  useEffect(() => {
    request.getData();
    activityRequest.getData();
  }, []);

  return (
    <div className="page-container">
      <div className="row">
        <h1>Driver</h1>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        request.data &&
        request.data.load && (
          <div className="row">
            <div className="info-container">
              <span>
                <b>Name: </b>
                {request.data.first_name}
              </span>
              <span>
                <b>Surname: </b>
                {request.data.last_name}
              </span>
              <span>
                <b>Date joined: </b>
                {fixDate(request.data.date_joined)}
              </span>
              <span>
                <b>Type: </b>
                {getChoice(request.data.driver_type, DRIVER_TYPE)}
              </span>
              <span>
                <b>Status: </b>
                {getChoice(request.data.status, DRIVER_STATUS)}
              </span>
              <span>
                <b>Weekly gross: </b>
                {}
              </span>
              <span>
                <b>Weekly loads: </b>
                {}
              </span>
              <span>
                <b>Weekly RPM: </b>
                {}
              </span>
            </div>
            <div className="info-container">
              <span>
                <b>Current load: </b>
                {request.data.load ? request.data.load.bol_number : "no load"}
              </span>
              <span>
                <b>load PCS number: </b>
                {request.data.load.pcs_number}
              </span>
              <span>
                <b>Carrier name: </b>
                {request.data.carrier_name}
              </span>
              <span>
                <b>Origin: </b>
                {request.data.load.origin +
                  ", " +
                  request.data.load.origin_state}
              </span>
              <span>
                <b>Destination: </b>
                {request.data.load.destination +
                  ", " +
                  request.data.load.destination_state}
              </span>
              <span>
                <b>Miles: </b>
                {request.data.load.total_miles + " mile"}
              </span>
            </div>
            <div className="info-container">
              <span>
                <b>Truck: </b>
                {}
              </span>
              <span>
                <b>Current location: </b>
                {}
              </span>
              <span>
                <b>Trailer: </b>
                {}
              </span>
            </div>
            <div className="info-container">
              <span>
                <b>Dispatcher: </b>
                {}
              </span>
              <span>
                <b>Driver Preference: </b>
              </span>
              <span>{}</span>
            </div>
          </div>
        )
      )}
      {!activityRequest.isLoading && (
        <ActivityCart
          data={{
            from: scale.from,
            to: scale.to,
            charts: activityRequest.data,
            colors: {
              rea: "red",
              cov: "lightgreen",
              pre: "yellow",
              hom: "blue",
              enr: "green",
              hol: "black",
              res: "orange",
              ina: "gray",
            },
          }}
        />
      )}
      <Select
        name="choice"
        selections={ACTIVITY_RANGE}
        isObject={true}
        value={scale.choice}
        label="Scale"
        onChange={handleScaleChange}
        error={""}
      />
    </div>
  );
};

export default Driver;
