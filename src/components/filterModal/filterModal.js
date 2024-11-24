import { useState } from "react";
import "./filterModal.css";

export default function FilterModal({
  setRefreshData,
  serviceUsers,
  setServiceUsers,
  modalShow,
  setModalShow,
}) {
  const [age, setAge] = useState(undefined);
  const [careStatus, setCarestatus] = useState(undefined);
  const [UrgentUpdates, setUrgentUpdates] = useState(false);

  function handleFilter() {
    let newList = [];
    serviceUsers.forEach((serviceUser) => {
      let add = true;
      if (age !== undefined && String(serviceUser.age) !== age) {
        add = false;
      } else if (
        careStatus !== undefined &&
        serviceUser.careStatus !== careStatus
      ) {
        add = false;
      } else if (UrgentUpdates) {
        const today = new Date();
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);
        const serviceUserNextAppointment = new Date(
          serviceUser.nextAppointment
        );

        if (
          !(
            (serviceUserNextAppointment.getDate() === today.getDate() &&
              serviceUserNextAppointment.getMonth() === today.getMonth() &&
              serviceUserNextAppointment.getFullYear() ===
                today.getFullYear()) ||
            (serviceUserNextAppointment.getDate() === nextDay.getDate() &&
              serviceUserNextAppointment.getMonth() === nextDay.getMonth() &&
              serviceUserNextAppointment.getFullYear() ===
                nextDay.getFullYear())
          )
        ) {
          add = false;
        }
      }
      add && newList.push(serviceUser);
    });
    setServiceUsers([...newList]);
    setRefreshData((prev) => !prev);
    setModalShow(false);
  }

  return (
    modalShow && (
      <div className="FilterModalModal">
        <div className="FilterModalSubContainer">
          <span className="FilterModalHeaderStyles">Filter Users</span>
          <div
            className="FilterModalMainContainerExitModalStyes"
            onClick={(e) => {
              e.preventDefault();
              setModalShow(false);
            }}
          >
            <img
              className="FilterModalCrossSizes"
              src={require("../../assets/crossIcon.png")}
            />
          </div>
          <div className="FilterModalItemsMainContainer">
            <div className="FilterModalItemContainer">
              <span className="FilterModalDataHeaderStyles">Age:</span>
              <input
                placeholder="Filter by age..."
                value={age}
                onChange={(e) =>
                  e.target.value === ""
                    ? setAge(undefined)
                    : setAge(e.target.value)
                }
                className="inputFieldStyles"
              />
            </div>
            <div className="FilterModalItemContainer">
              <span className="FilterModalDataHeaderStyles">Care Status:</span>
              <select
                value={careStatus}
                onChange={(event) => {
                  event.target.value === "Any"
                    ? setCarestatus(undefined)
                    : setCarestatus(event.target.value);
                }}
                className="inputFieldStyles"
              >
                <option value="Any">Any</option>
                <option value="On Hold">On Hold</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="FilterModalUrgentUpdates">
              <span className="FilterModalDataHeaderStyles">
                Urgent Updates:
              </span>
              <input
                type="checkbox"
                checked={UrgentUpdates}
                onChange={(e) => {
                  setUrgentUpdates((prev) => !prev);
                }}
                className="checkBoxStyles"
              />
            </div>
          </div>
          <div
            className="FilterButtonMainContainer"
            onClick={(e) => {
              e.preventDefault();
              handleFilter();
            }}
          >
            <span className="filterButtonText">Filter</span>
          </div>
        </div>
      </div>
    )
  );
}
