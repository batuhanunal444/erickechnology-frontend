import {Link} from 'react-router-dom'
import Category from './Categories';

export function Navbar(){
    return(
        <div>
        <Link to="/" >Kategoriler</Link>
        <Link to="/addproduct">Ürünler</Link>
        </div>
    );
}