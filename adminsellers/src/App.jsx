import "./App.css";
import Listofsellers from "./components/List_of_sellers";
import Listofproducts from "./components/Listofproducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Listofsellers />} />
          <Route path="/products" element={<Listofproducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
