import "./App.css";
import Listofproducts from "./components/Listofproducts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Listofproducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
