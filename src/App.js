import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/index.js';
import Contacts from './pages/contacts.js';
import Internal from './pages/internal.js';
import External from './pages/external.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/internal" element={<Internal />} />
        <Route path="/external" element={<External />} />
      </Routes>
    </Router>
  );
}

export default App;