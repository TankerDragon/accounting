import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Form from "../../common/Form";
import Loading from "../../common/Loading";
import useRequest from "../../../hooks/useRequest";
import {
  GROSS_URL,
  GROSS_STATUS,
  BUDGET_TYPE,
} from "../../../constants/constants";
import {
  getName,
  getUsername,
  getChoice,
  fixDate,
  is_updated,
} from "../../../functions/Functions";

const LoadUpdates = ({
  drivers,
  dispatchers,
  users,
  carriers,
  closeUpdates,
  edit,
}) => {
  const request = useRequest(GROSS_URL + "?updates=" + edit.id);

  useEffect(() => {
    request.getData();
  }, []);

  return (
    <Form>
      <div className="row">
        <h1>Updates on carrier: {edit.name}</h1>
        <div
          className="icon-holder"
          onClick={() => {
            closeUpdates();
          }}
        >
          <ImCross className="icon edit" />
        </div>
      </div>
      {request.isLoading ? (
        <Loading />
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Edited time</th>
                <th>Edited by</th>
                <th>PCS number</th>
                <th>Carrier</th>
                <th>Load ID</th>
                <th>Dispatcher</th>
                <th>Truck</th>
                <th>Trailer</th>
                <th>Driver's name</th>
                <th>Original rate</th>
                <th>Current rate</th>
                <th>Change</th>
                <th>Mileage</th>
                <th>Status</th>
                <th>Budget type</th>
                <th>Autobooker</th>
                <th>Origin</th>
                <th></th>
                <th>Destination</th>
                <th></th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {request.data.map((log, index) => {
                return (
                  <tr key={log.id}>
                    <td>{fixDate(log.edit_time)}</td>
                    <td>{getUsername(log.user, users)}</td>
                    <td
                      className={
                        is_updated(index, request.data, "pcs_number")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.pcs_number}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "carrier")
                          ? "updated"
                          : ""
                      }
                    >
                      {getName(log.carrier, carriers)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "bol_number")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.bol_number}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "dispatcher")
                          ? "updated"
                          : ""
                      }
                    >
                      {getName(log.dispatcher, dispatchers)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "truck")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.truck}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "trailer")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.trailer}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "driver")
                          ? "updated"
                          : ""
                      }
                    >
                      {getName(log.driver, drivers)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "original_rate")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.original_rate}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "current_rate")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.current_rate}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "change")
                          ? "updated"
                          : ""
                      }
                      // className={
                      //   log.change > 0 ? "good" : log.change < 0 ? "bad" : ""
                      // }
                    >
                      {log.change}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "total_miles")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.total_miles}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "status")
                          ? "updated"
                          : ""
                      }
                    >
                      {getChoice(log.status, GROSS_STATUS)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "budget_type")
                          ? "updated"
                          : ""
                      }
                    >
                      {getChoice(log.budget_type, BUDGET_TYPE)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "autobooker")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.autobooker ? "yes" : ""}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "origin")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.origin}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "origin_state")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.origin_state}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "destination")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.destination}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "destination_state")
                          ? "updated"
                          : ""
                      }
                    >
                      {log.destination_state}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "note") ? "updated" : ""
                      }
                    >
                      {log.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </Form>
  );
};

export default LoadUpdates;
