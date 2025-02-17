import { useSearchParams } from "react-router";
import DashBoard from "../components/Admin/DashBoard";
import Account from "../components/Admin/Account";

const Admin = () => {
  const [tabName] = useSearchParams();
  console.log(tabName.get("tab"));
  return (
    <div>
      {(tabName.get("tab") === "dashboard" || !tabName.get("tab")) && (
        <DashBoard />
      )}
      {(tabName.get("tab") === "account" || !tabName.get("tab")) && <Account />}
    </div>
  );
};

export default Admin;
