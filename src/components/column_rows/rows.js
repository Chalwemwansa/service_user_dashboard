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
      ).padStart(2, "0")}`;
      setDate(dateString);
    }
  }, []);

  if (type === "header") {
    return (
      <div className="headerRowContainer">
        <div className="nameContainer">
          <t className="headertextStyles nameTextStyles">Name</t>
        </div>
        <div className="ageContainer headerStyles">
          <t className="headertextStyles">Age</t>
        </div>
        <div className="careStatusContainer">
          <t className="headertextStyles">Care status</t>
        </div>
        <div className="nextAppointmentStatusContainer headerStyles">
          <t className="headertextStyles">Next appointment</t>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mainRowContainer">
        <div className="nameContainer">
          <t className="valuestextStyles nameTextStyles">{item.name}</t>
        </div>
        <div
          className={
            item.careStatus === "Active"
              ? "ageContainer activeColor"
              : "ageContainer inactiveColor"
          }
        >
          <t className="valuestextStyles">{item.age}</t>
        </div>
        <div className="careStatusContainer">
          <t className="valuestextStyles">{item.careStatus}</t>
        </div>
        <div
          className={
            item.careStatus === "Active"
              ? "nextAppointmentStatusContainer activeColor"
              : "nextAppointmentStatusContainer inactiveColor"
          }
        >
          <t className="valuestextStyles">{date}</t>
        </div>
        <div className="buttonStyles">
          <t className="buttonText">Edit</t>
        </div>
        <div className="buttonStyles">
          <t className="buttonText">View profile</t>
        </div>
      </div>
    );
  }
}
