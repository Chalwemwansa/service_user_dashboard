import { useEffect, useState } from "react";
import "./profile.css";
export default function ViewProfile({ modalOpen, setModalOpen, item }) {
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const appointmentdate = new Date(item.nextAppointment);

    // Array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Get the month name
    const monthName = monthNames[appointmentdate.getMonth()];
    const dateString = `${monthName} ${appointmentdate.getDate()}, ${appointmentdate.getFullYear()} ${appointmentdate.getHours()}:${String(
      appointmentdate.getMinutes()
    ).padStart(2, "0")} hrs`;
    setNextAppointment(dateString);
  }, []);
  return (
    modalOpen && (
      <div className="ViewProfileModal">
        <div className="ViewProfileSubContainer">
          <span className="ViewProfileHeaderStyles">User Profile</span>
          <div
            className="ViewMainContainerExitModalStyes"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(false);
            }}
          >
            <img
              className="viewCrossSizes"
              src={require("../../assets/crossIcon.png")}
            />
          </div>
          <div className="viewItemsMainContainer">
            <div className="viewItemContainer">
              <span className="viewDataHeaderStyles">User Id</span>
              <span className="viewValueHeaderStyles">{item.id}</span>
            </div>
            <div className="viewItemContainer">
              <span className="viewDataHeaderStyles">Name</span>
              <span className="viewValueHeaderStyles">{item.name}</span>
            </div>
            <div className="viewItemContainer">
              <span className="viewDataHeaderStyles">Age</span>
              <span className="viewValueHeaderStyles">{item.age}</span>
            </div>
            <div className="viewItemContainer">
              <span className="viewDataHeaderStyles">Care Status</span>
              <span className="viewValueHeaderStyles">{item.careStatus}</span>
            </div>
            <div className="viewItemContainer">
              <span className="viewDataHeaderStyles">Next Appointment</span>
              <span className="viewValueHeaderStyles">{nextAppointment}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
