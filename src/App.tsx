import "react-confirm-alert/src/react-confirm-alert.css";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { ViewModeProvider } from "./context/view-mode";
import DashboardPage from "./pages/dashboard-page/dashboard-page";

function App() {
  return (
    <ViewModeProvider>
      <Toaster position="top-right" />
      <DashboardPage />;
    </ViewModeProvider>
  );
}

export default App;
