import { useSearchParams } from "react-router";
import DashBoard from "../components/Admin/DashBoard";
import Account from "../components/Admin/Account/Account";
import Project from "../components/Admin/Project/Project";
import AdminTask from "../components/Admin/Task/AdminTask";

const Admin = () => {
  const [tabName] = useSearchParams();
  console.log(tabName.get("tab"));
  return (
    <div>
      {(tabName.get("tab") === "dashboard" || !tabName.get("tab")) && (
        <DashBoard />
      )}
      {(tabName.get("tab") === "account" ||
        tabName.get("tab") === "account-inactive") && <Account />}
      {tabName.get("tab") === "project" && <Project />}
      {tabName.get("tab") === "task" && <AdminTask />}
    </div>
  );
};

export default Admin;
