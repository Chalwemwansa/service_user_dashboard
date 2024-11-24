import { useEffect, useState } from "react";
import "./rows.css";
export default function Row({ item, type }) {
  const [date, setDate] = useState("");
  useEffect(() => {
    if (type !== "header") {
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
      setDate(dateString);
    }
  }, []);

  if (type === "header") {
    return (
      <div className="headerRowContainer">
        <div className="nameContainer">
          <span className="headertextStyles nameTextStyles">Name</span>
        </div>
        <div className="ageContainer headerStyles">
          <span className="headertextStyles">Age</span>
        </div>
        <div className="careStatusContainer">
          <span className="headertextStyles">Care status</span>
        </div>
        <div className="nextAppointmentStatusContainer headerStyles">
          <span className="headertextStyles">Next appointment</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainRowContainer">
        <div className="nameContainer">
          <span className="valuestextStyles nameTextStyles">{item.name}</span>
        </div>
        <div
          className={
            item.careStatus === "Active"
              ? "ageContainer activeColor"
              : "ageContainer inactiveColor"
          }
        >
          <span className="valuestextStyles">{item.age}</span>
        </div>
        <div className="careStatusContainer">
          <span className="valuestextStyles">{item.careStatus}</span>
        </div>
        <div
          className={
            item.careStatus === "Active"
              ? "nextAppointmentStatusContainer activeColor"
              : "nextAppointmentStatusContainer inactiveColor"
          }
        >
          <span className="valuestextStyles">{date}</span>
        </div>
        <div className="buttonStyles">
          <span className="buttonText">Edit</span>
        </div>
        <div className="buttonStyles">
          <span className="buttonText">View profile</span>
        </div>
      </div>
    );
  }
}
