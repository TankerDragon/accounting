import { useEffect } from "react";
import { useParams } from "react-router";
import useRequest from "../../../hooks/useRequest";
import {
  DRIVERS_URL,
  DRIVER_TYPE,
  DRIVER_STATUS,
} from "../../../constants/constants";
import { fixDate, getChoice } from "../../../functions/Functions";
import Loading from "../../common/Loading";
import ActivityCart from "../../common/ActivityCart";

const Driver = () => {
  const params = useParams();
  const request = useRequest(DRIVERS_URL + "?id=" + params.id);

  useEffect(() => {
    request.getData();
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
      <ActivityCart />
    </div>
  );
};

export default Driver;
