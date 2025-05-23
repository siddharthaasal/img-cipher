import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Encode from './components/Encode';
import Decode from './components/Decode';
import Footer from './components/Footer';
import Instructions from './components/Instructions';

function App() {
  return (
    <Router>
      <div className="app-container min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/encode" element={<Encode />} />
            <Route path="/decode" element={<Decode />} />
            <Route path="/instructions" element={<Instructions />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
