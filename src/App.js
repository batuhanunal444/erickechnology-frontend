import Home from './components/Categories.js'
import { Categories } from './components/Categories.js';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { NavbarComp } from './components/Navbar.js';

function App() {
  return (
    <div className="App">
     <Router>
      <NavbarComp/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addproduct" />
        <Route path="/categories/:categoryId" element={<Categories/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
