import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';


function App() {
  return (
    <div>
   <Router>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </Router>

    </div>
  );
}

export default App;
