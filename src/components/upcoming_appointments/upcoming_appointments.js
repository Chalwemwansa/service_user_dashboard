import { useEffect, useState } from "react";
import "./upcoming_appointments.css";

export default function UpcomingAppointments({ serviceUsers }) {
  const [UpcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    let UpcomingAppointments = [];
    serviceUsers.forEach((serviceUser) => {
      const serviceUserDate = new Date(serviceUser.nextAppointment);
      const today = new Date();
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + 1);

      if (
        serviceUserDate.getDate() === today.getDate() &&
        serviceUserDate.getMonth() === today.getMonth() &&
        serviceUserDate.getFullYear() === today.getFullYear()
      ) {
        UpcomingAppointments.push({
          name: serviceUser.name,
          status: `${serviceUserDate.getHours()}:${String(
            serviceUserDate.getMinutes()
          ).padStart(2, "0")} hrs today`,
        });
      } else if (
        serviceUserDate.getDate() === nextDay.getDate() &&
        serviceUserDate.getMonth() === nextDay.getMonth() &&
        serviceUserDate.getFullYear() === nextDay.getFullYear()
      ) {
        UpcomingAppointments.push({
          name: serviceUser.name,
          status: `${serviceUserDate.getHours()}:${String(
            serviceUserDate.getMinutes()
          ).padStart(2, "0")} hrs tommorow`,
        });
      }
    });
    setUpcomingAppointments(UpcomingAppointments);
  }, []);

  return (
    <div className="mainUpcomingCardsContainer">
      {UpcomingAppointments.map((appointment) => (
        <div className="singleUpcomingCardContainer">
          <span className="nameUpcomingCardStyles">{appointment.name}</span>
          <span className="UpcomingcardTextStyles">{appointment.status}</span>
        </div>
      ))}
    </div>
  );
}
