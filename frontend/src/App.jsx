import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
function App() {
  return (
    <div>
   <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualisation" element={<Visualization />} />

      </Routes>
    </Router>

    </div>
  );
}

export default App;
