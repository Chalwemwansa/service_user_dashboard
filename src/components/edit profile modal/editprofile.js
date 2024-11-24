import { useEffect, useState } from "react";
import "./editProfile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function EditProfile({ modalOpen, setModalOpen, item }) {
  const [name, setName] = useState(item.name);
  const [age, setAge] = useState(item.age);
  const [careStatus, setCareStatus] = useState(item.careStatus);
  const [nextAppointment, setNextAppointment] = useState(
    new Date(item.nextAppointment)
  );

  return (
    modalOpen && (
      <div className="EditProfileProfileModal">
        <div className="EditProfileProfileSubContainer">
          <span className="EditProfileProfileHeaderStyles">Edit User</span>
          <div
            className="EditProfileMainContainerExitModalStyes"
            onClick={(e) => {
              e.preventDefault();
              setName(item.name);
              setAge(item.age);
              setCareStatus(item.careStatus);
              setNextAppointment(item.nextAppointment);
              setModalOpen(false);
            }}
          >
            <img
              className="EditProfileCrossSizes"
              src={require("../../assets/crossIcon.png")}
            />
          </div>
          <div className="EditProfileItemsMainContainer">
            <div className="EditProfileItemContainer">
              <span className="EditProfileDataHeaderStyles">Name</span>
              <input
                value={name}
                placeholder="Enter user name..."
                className="EditProfileValueHeaderStyles"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="EditProfileItemContainer">
              <span className="EditProfileDataHeaderStyles">Age</span>
              <input
                value={age}
                placeholder="Enter user age..."
                className="EditProfileValueHeaderStyles"
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="EditProfileItemContainer">
              <span className="EditProfileDataHeaderStyles">Care Status</span>
              <select
                value={careStatus}
                onChange={(event) => {
                  setCareStatus(event.target.value);
                }}
                className="EditProfileValueHeaderStyles"
              >
                <option value="On Hold">On Hold</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="EditProfileItemContainer">
              <span className="EditProfileDataHeaderStyles">
                Next Appointment
              </span>
              <DatePicker
                selected={nextAppointment}
                onChange={(date) => setNextAppointment(date)}
                dateFormat="yyyy/MM/dd"
                className="EditProfileValueHeaderStyles"
              />
            </div>
          </div>
          <div className="EditProfileButtonMainContainer">
            <span className="editprofilButtonText">Edit</span>
          </div>
        </div>
      </div>
    )
  );
}