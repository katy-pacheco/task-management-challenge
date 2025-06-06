import MainContent from "../../components/main-content/main-content";
import SearchBar from "../../components/search-bar/search-bar";
import Sidebar from "../../components/sidebar/sidebar";

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <SearchBar />
      <MainContent />
    </>
  );
}
