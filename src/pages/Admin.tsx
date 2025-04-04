import { useSearchParams } from "react-router";
import DashBoard from "../components/Admin/DashBoard";
import AdminAccount from "../components/Admin/Account/AdminAccount";
import AdminProject from "../components/Admin/Project/AdminProject";
import AdminTask from "../components/Admin/Task/AdminTask";
import AdminTag from "../components/Admin/Tag/AdminTag";

const Admin = () => {
  const [tabName] = useSearchParams();

  return (
    <div>
      {(tabName.get("tab") === "dashboard" || !tabName.get("tab")) && (
        <DashBoard />
      )}
      {(tabName.get("tab") === "account" ||
        tabName.get("tab") === "account-inactive") && <AdminAccount />}
      {tabName.get("tab") === "project" && <AdminProject />}
      {tabName.get("tab") === "task" && <AdminTask />}
      {tabName.get("tab") === "tag" && <AdminTag />}
    </div>
  );
};

export default Admin;
