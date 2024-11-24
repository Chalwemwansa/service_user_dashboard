import { useEffect, useState } from "react";
import Row from "../../components/column_rows/rows";
import serviceUsers from "../../utils/api";
import "./dashboard.css";
import SummaryCards from "../../components/summary_cards/summary_cards";
import UpcomingAppointments from "../../components/upcoming_appointments/upcoming_appointments";
import UrgentUpdates from "../../components/urgent_updates/urgent_updates";

const PageView = ({ item, setPage }) => {
  return (
    <div
      className="pageContainer"
      onClick={(e) => {
        e.preventDefault();
        setPage(item.num);
      }}
    >
      <span className="pageContainerText">{item.num}</span>
    </div>
  );
};

export default function DashBoard() {
  const pageLimit = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [numPages, setNumpages] = useState(0);

  useEffect(() => {
    const numPages2 = Math.ceil(serviceUsers.length / pageLimit);
    if (numPages2 !== numPages) {
      setPages([]);
      setNumpages(numPages2);
      for (let pagenum = 0; pagenum < numPages2; pagenum += 1) {
        setPages((prev) => [...prev, { num: pagenum }]);
      }
    }
    const startItem = page * pageLimit;
    const endItem = startItem + pageLimit;
    let newList = [];
    if (endItem > serviceUsers.length) {
      newList = serviceUsers.slice(startItem, serviceUsers.length);
    } else {
      newList = serviceUsers.slice(startItem, endItem);
    }
    setPageData([...newList]);
  }, [page]);
  return (
    <div className="mainContainer">
      <div className="subContainer">
        <h1 className="dashboardStyles">Dashboard</h1>
        <div className="searchBarAndFilterContainer">
          <div className="searchBarStyles">
            <img
              className="searchImageSizes"
              src={require("../../assets/search icon.png")}
            />
            <input
              type="text"
              placeholder="Search by service user name or id..."
              className="searchBarTextInputStyles"
            />
          </div>
          <div className="filterMainContainer">
            <img
              src={require("../../assets/filter icon.png")}
              className="filterIcon"
            />
            <t className="filterText">Filter</t>
          </div>
        </div>
        <h2 className="serviceUsersStyles">Service users</h2>
        <Row type="header" />
        {pageData.map((serviceUser) => (
          <div key={serviceUser.id}>
            <Row item={serviceUser} />
          </div>
        ))}
        <div className="pagesContainerMain">
          {pages.map((item) => (
            <div key={item.num}>
              <PageView item={item} setPage={setPage} />
            </div>
          ))}
        </div>
        <h2 className="subHeaderCardsStyles">Summary cards</h2>
        <SummaryCards serviceUsers={serviceUsers} />
        <h2 className="subHeaderCardsStyles">Alerts</h2>
        <h3 className="subsubHeaderCardsStyles">Upcoming appointments</h3>
        <UpcomingAppointments serviceUsers={serviceUsers} />
        <h3 className="subsubHeaderCardsStyles">Urgent updates</h3>
        <UrgentUpdates serviceUsers={serviceUsers} />
      </div>
    </div>
  );
}
