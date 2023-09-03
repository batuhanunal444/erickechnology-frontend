import Category from './components/Categories.js'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Navbar } from './components/Navbar.js';

function App() {
  return (
    <div className="App">
     <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Category />}/>
        <Route path="/addproduct" />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
