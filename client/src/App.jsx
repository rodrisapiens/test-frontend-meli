import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Item from "./pages/Item";
import { QueryProvider } from "./QueryContext";
import "../src/styles/app.css";
function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<DashBoard />} />
          <Route path="/items/:id" element={<Item />} />
        </Routes>
      </Router>
    </QueryProvider>
  );
}

export default App;
