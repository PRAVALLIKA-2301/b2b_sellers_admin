import "./App.css";
import Listofsellers from "./components/List_of_sellers";
import Listofproducts from "./components/Listofproducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Listofproducts />} />
          <Route path="/sellers" element={<Listofsellers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
