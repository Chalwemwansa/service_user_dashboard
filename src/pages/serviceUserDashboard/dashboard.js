import { useEffect, useState } from "react";
import Row from "../../components/column_rows/rows";
import serviceUsersData from "../../utils/api";
import "./dashboard.css";
import SummaryCards from "../../components/summary_cards/summary_cards";
import UpcomingAppointments from "../../components/upcoming_appointments/upcoming_appointments";
import UrgentUpdates from "../../components/urgent_updates/urgent_updates";
import FilterModal from "../../components/filterModal/filterModal";

const PageView = ({ item, setPage }) => {
  return (
    <div
      className="pageContainer"
      onClick={(e) => {
        e.preventDefault();
        setPage(item.num);
      }}
    >
      <span className="pageContainerText">{item.num + 1}</span>
    </div>
  );
};

export default function DashBoard() {
  const pageLimit = 10;
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [numPages, setNumpages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceUsers, setServiceUsers] = useState(serviceUsersData);
  const [pageServiceUsers, setPageServiceUsers] = useState(serviceUsersData);
  const [refreshData, setRefreshData] = useState(false);
  const [filterModalShow, setFilterModalShow] = useState(false);

  function handleSearchTerm() {
    if (searchTerm === "") {
      setPageServiceUsers(serviceUsersData);
      setRefreshData((prev) => !prev);
      setPage(0);
    } else {
      let newServiceUsersList = [];
      serviceUsersData.forEach((serviceUser) => {
        if (
          String(serviceUser.id) === String(searchTerm) ||
          serviceUser.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          newServiceUsersList.push(serviceUser);
        }
      });
      setPageServiceUsers(newServiceUsersList);
      setRefreshData((prev) => !prev);
      setPage(0);
    }
  }

  useEffect(() => {
    const numPages2 = Math.ceil(pageServiceUsers.length / pageLimit);
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
    if (endItem > pageServiceUsers.length) {
      newList = pageServiceUsers.slice(startItem, pageServiceUsers.length);
    } else {
      newList = pageServiceUsers.slice(startItem, endItem);
    }
    setPageData([...newList]);
  }, [page, refreshData]);
  return (
    <div className="mainContainer">
      <div className="subContainer">
        <h1 className="dashboardStyles">Dashboard</h1>
        <div className="topPartStyles">
          <div className="searchBarAndFilterContainer">
            <div className="searchBarStyles">
              <img
                className="searchImageSizes"
                src={require("../../assets/search icon.png")}
                onClick={(e) => {
                  e.preventDefault();
                  handleSearchTerm();
                }}
              />
              <input
                type="text"
                placeholder="Search by service user name or id..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchBarTextInputStyles"
                onKeyDown={(event) =>
                  event.key === "Enter" && handleSearchTerm()
                }
              />
            </div>
            <div
              className="filterMainContainer"
              onClick={(e) => {
                e.preventDefault();
                setServiceUsers(serviceUsersData);
                setRefreshData((prev) => !prev);
                setFilterModalShow(true);
              }}
            >
              <img
                src={require("../../assets/filter icon.png")}
                className="filterIcon"
              />
              <span className="filterText">Filter</span>
            </div>
          </div>
          <h2 className="serviceUsersStyles">Service users</h2>
          <div className="rows-div">
            <Row type="header" />
            {pageData.map((serviceUser) => (
              <div key={serviceUser.id}>
                <Row
                  item={serviceUser}
                  setServiceUsers={setServiceUsers}
                  setRefresh={setRefreshData}
                  refresh={refreshData}
                />
              </div>
            ))}
          </div>
          <div className="pagesContainerMain">
            {pages.map((item) => (
              <div key={item.num}>
                <PageView item={item} setPage={setPage} />
              </div>
            ))}
          </div>
        </div>
        <h2 className="subHeaderCardsStyles">Summary cards</h2>
        <SummaryCards serviceUsers={serviceUsers} refresh={refreshData} />
        <h2 className="subHeaderCardsStyles">Alerts</h2>
        <h3 className="subsubHeaderCardsStyles">Upcoming appointments</h3>
        <UpcomingAppointments
          serviceUsers={serviceUsers}
          refresh={refreshData}
        />
        <h3 className="subsubHeaderCardsStyles">Urgent updates</h3>
        <UrgentUpdates serviceUsers={serviceUsers} refresh={refreshData} />
        <FilterModal
          serviceUsers={pageServiceUsers}
          setRefreshData={setRefreshData}
          modalShow={filterModalShow}
          setModalShow={setFilterModalShow}
          setServiceUsers={setPageServiceUsers}
        />
      </div>
    </div>
  );
}
