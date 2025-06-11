import "react-confirm-alert/src/react-confirm-alert.css";
import { Toaster } from "react-hot-toast";
import "./App.css";
import DashboardPage from "./pages/dashboard-page/dashboard-page";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <DashboardPage />;
    </>
  );
}

export default App;
