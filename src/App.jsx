import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import CustomerList from "./components/CustomerList.jsx";
import TrainingsList from "./components/TrainingsList.jsx";
import TrainingsCalendar from "./components/TrainingsCalendar.jsx";
import TrainingsChart from "./components/TrainingsChart.jsx";

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CustomerList />} />
        <Route path="/Trainings" element={<TrainingsList />} />
        <Route path="/Calendar" element={<TrainingsCalendar />} />
        <Route path="/Chart" element={<TrainingsChart />} />
      </Routes>
    </>
  )
}

export default App
