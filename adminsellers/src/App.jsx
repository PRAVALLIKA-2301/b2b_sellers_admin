import "./App.css";
import Listofsellers from "./components/List_of_sellers";
import Listofproducts from "./components/Listofproducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/sellers" element={<Listofproducts />} />
          <Route path="/" element={<Listofsellers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
