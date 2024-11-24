import UpcomingAppointments from "../upcoming_appointments/upcoming_appointments";
import "./urgent_updates.css";
import { useState, useEffect } from "react";

export default function UrgentUpdates({ serviceUsers, refresh }) {
  const [UrgentUpdates, setUrgentUpdates] = useState([]);

  useEffect(() => {
    let UrgentUpdates = [];
    serviceUsers.forEach((serviceUser) => {
      const serviceUserDate = new Date(serviceUser.nextAppointment);
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      if (
        serviceUserDate.getDate() === today.getDate() &&
        serviceUserDate.getMonth() === today.getMonth() &&
        serviceUserDate.getFullYear() === today.getFullYear() &&
        ["On Hold", "Inactive"].includes(serviceUser.careStatus)
      ) {
        UrgentUpdates.push({
          name: serviceUser.name,
          time: `${serviceUserDate.getHours()}:${String(
            serviceUserDate.getMinutes()
          ).padStart(2, "0")} hrs today`,
          status: serviceUser.careStatus === "On Hold" ? "On Hold" : "Inactive",
        });
      } else if (
        serviceUserDate.getDate() === nextDay.getDate() &&
        serviceUserDate.getMonth() === nextDay.getMonth() &&
        serviceUserDate.getFullYear() === nextDay.getFullYear() &&
        ["On Hold", "Inactive"].includes(serviceUser.careStatus)
      ) {
        UrgentUpdates.push({
          name: serviceUser.name,
          time: `${serviceUserDate.getHours()}:${String(
            serviceUserDate.getMinutes()
          ).padStart(2, "0")} hrs tommorow`,
          status: serviceUser.careStatus === "On Hold" ? "On Hold" : "Inactive",
        });
      }
    });
    setUrgentUpdates(UrgentUpdates);
  }, [refresh]);

  return (
    <div className="mainUrgentUpdatesCardsContainer">
      {UrgentUpdates.map((UrgentUpdate, index) => (
        <div key={index} className="singleUrgentUpdatesCardContainer">
          <span className="nameUrgentUpdatesCardStyles">
            {UrgentUpdate.name}
          </span>
          <span className="UrgentUpdatescardTextStyles">
            {`${UrgentUpdate.status} with appointment at`}
          </span>
          <span className="UrgentUpdatescardTextStyles">
            {UrgentUpdate.time}
          </span>
        </div>
      ))}
    </div>
  );
}
