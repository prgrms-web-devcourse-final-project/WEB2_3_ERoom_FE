import { useSearchParams } from "react-router";
import DashBoard from "../components/Admin/DashBoard";
import AdminAccount from "../components/Admin/Account/AdminAccount";
import AdminProject from "../components/Admin/Project/AdminProject";
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
        tabName.get("tab") === "account-inactive") && <AdminAccount />}
      {tabName.get("tab") === "project" && <AdminProject />}
      {tabName.get("tab") === "task" && <AdminTask />}
    </div>
  );
};

export default Admin;
