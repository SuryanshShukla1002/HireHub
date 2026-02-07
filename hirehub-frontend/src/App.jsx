import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Home from "./pages/Home";
import AddJob from "./pages/AddJob";
import JobDetail from "./pages/JobDetail";
import Navbar from "./components/Navbar";
import JobPostings from "./pages/JobPostings";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addjob" element={<AddJob />} />
        <Route path="/jobPostings" element={<JobPostings />} />
        <Route path="/job/:detaildId" element={<JobDetail />} />
      </Routes>
    </>
  );
}

export default App;
