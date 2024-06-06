import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Visualization from './pages/Visualization';
import DetailPlant from './pages/DetailPlant';
import SearchPlant from './pages/SearchPlant';

function App() {
  return (
    <div>
   <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualisation/:lat/:lng" element={<Visualization />} />
          <Route path="/detail-plant/:id" element={<DetailPlant />} />
          <Route path="/plants" element={<SearchPlant />} />

      </Routes>
    </Router>

    </div>
  );
}

export default App;
