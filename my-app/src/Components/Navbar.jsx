import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() 
{
    return(
        <nav className="navbar">
            <Link to="/home" className="nav-link"> Home</Link>
        </nav>
    )
}

export default Navbar;