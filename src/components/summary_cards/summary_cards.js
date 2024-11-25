import { useEffect, useState } from "react";
import "./summary_cards.css";

export default function SummaryCards({ serviceUsers, refresh }) {
  const [users, setUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [usersWithAppointements, setUserWithAppointments] = useState(0);
  const [InactiveUsers, setInactiveUsers] = useState(0);
  const [usersOnHold, setUsersOnHold] = useState(0);

  useEffect(() => {
    let users = 0;
    let activeUsers = 0;
    let InactiveUsers = 0;
    let usersOnHold = 0;
    let usersWithAppointements = 0;
    serviceUsers.forEach((serviceuser) => {
      users += 1;
      serviceuser.careStatus === "Active" && (activeUsers += 1);
      serviceuser.careStatus === "Inactive" && (InactiveUsers += 1);
      serviceuser.careStatus === "On Hold" && (usersOnHold += 1);
      const appointmentdate = new Date(serviceuser.nextAppointment);
      const today = new Date();
      appointmentdate.getDate() === today.getDate() &&
        appointmentdate.getMonth() === today.getMonth() &&
        appointmentdate.getFullYear() === today.getFullYear() &&
        (usersWithAppointements += 1);
    });
    setUsers(users);
    setActiveUsers(activeUsers);
    setInactiveUsers(InactiveUsers);
    setUsersOnHold(usersOnHold);
    setUserWithAppointments(usersWithAppointements);
  }, [refresh]);

  return (
    <div className="mainCardsContainer">
      <div className="singleGreenCardContainer">
        <span className="cardTextStyles">{users}</span>
        <span className="cardTextStyles">Users</span>
      </div>
      <div className="singleGreenCardContainer">
        <span className="cardTextStyles">{activeUsers}</span>
        <span className="cardTextStyles">Active</span>
        <span className="cardTextStyles">Users</span>
      </div>
      <div className="singleGreenCardContainer">
        <span className="cardTextStyles">{usersWithAppointements}</span>
        <span className="cardTextStyles">Users with appointments</span>
        <span className="cardTextStyles">Today</span>
      </div>
      <div className="singleRedCardContainer">
        <span className="cardTextStyles">{InactiveUsers}</span>
        <span className="cardTextStyles">Inactive</span>
        <span className="cardTextStyles">Users</span>
      </div>
      <div className="singleRedCardContainer">
        <span className="cardTextStyles">{usersOnHold}</span>
        <span className="cardTextStyles">Users</span>
        <span className="cardTextStyles">On Hold</span>
      </div>
    </div>
  );
}
