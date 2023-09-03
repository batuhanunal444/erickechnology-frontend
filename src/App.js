import Home from './components/Categories.js'
import { Categories } from './components/Categories.js';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { NavbarComp } from './components/Navbar.js';
import AddCategory from './components/AddCategory.js';
import AddProduct from './components/AddProduct.js';

function App() {
  return (
    <div className="App">
     <Router>
      <NavbarComp/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/categories/:categoryId" element={<Categories/>}/>
        <Route path="/addcategory" element={<AddCategory/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
