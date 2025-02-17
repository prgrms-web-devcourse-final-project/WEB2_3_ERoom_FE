import { useSearchParams } from "react-router";
import DashBoard from "../components/Admin/DashBoard";

const Admin = () => {
  const [tabName] = useSearchParams();
  console.log(tabName.get("tab"));
  return (
    <div>
      {(tabName.get("tab") === "dashboard" || !tabName.get("tab")) && (
        <DashBoard />
      )}
    </div>
  );
};

export default Admin;
