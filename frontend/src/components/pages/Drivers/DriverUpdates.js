import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import Form from "../../common/Form";
import Loading from "../../common/Loading";
import useRequest from "../../../hooks/useRequest";
import { DRIVERS_URL } from "../../../constants/constants";
import { DRIVER_TYPE } from "../../../constants/constants";
import { getName, getChoice } from "../../../functions/Functions";

const is_updated = (index, data, attr) => {
  return index != 0 && data[index - 1][attr] != data[index][attr];
};

const DriverUpdates = ({ dispatchers, closeUpdates, edit }) => {
  const request = useRequest(DRIVERS_URL + "?updates=" + edit.id);

  useEffect(() => {
    request.getData();
  }, []);

  return (
    <Form>
      <div className="row">
        <h1>Updates on driver: {edit.first_name + " " + edit.last_name}</h1>
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
                <th>By user</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Dispatcher</th>
                <th>Driver type</th>
                <th>Gross target</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {request.data.map((update, index) => {
                return (
                  <tr key={update.id}>
                    <td>{update.edit_time}</td>
                    <td
                      className={
                        is_updated(index, request.data, "user") ? "updated" : ""
                      }
                    >
                      {update.user}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "first_name")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.first_name}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "last_name")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.last_name}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "dispatcher")
                          ? "updated"
                          : ""
                      }
                    >
                      {getName(update.dispatcher, dispatchers)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "driver_type")
                          ? "updated"
                          : ""
                      }
                    >
                      {getChoice(update.driver_type, DRIVER_TYPE)}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "gross_target")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.gross_target}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "status")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.status}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "notes")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.notes}
                    </td>
                    <td
                      className={
                        is_updated(index, request.data, "is_active")
                          ? "updated"
                          : ""
                      }
                    >
                      {update.is_active}
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

export default DriverUpdates;
