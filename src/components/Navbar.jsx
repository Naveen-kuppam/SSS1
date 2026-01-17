import logo from '../assets/ss.jpg';
import { FaSearch, FaUser, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Navbar.css'
import { Link } from "react-router-dom";


function Navbar() {
  const [data, setData] = useState(0); 
  const [user, setUser] = useState(null); 

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const increment = () => {
    setData(data + 1);
  };

  const decrement = () => {
    if (data > 0) setData(data - 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/Login/");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="SSS Logo" className="logo-img" />
        </a>

        <button
          className="navbar-toggler text-light bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav mx-auto gap-4 text-center">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
                 <li className="nav-item">
                    <Link className="nav-link" to="/shop">Shop</Link>
                   </li>

                   <li className="nav-item">
                        <Link className="nav-link" to="/about">About</Link>
                    </li>

                     <li className="nav-item">
                        <Link className="nav-link" to="/contact">Contact</Link>
                     </li>
          </ul>

         <ul className="navbar-nav ms-lg-auto text-center align-items-center">

  <li className="nav-item">
    <Link className="nav-link" to="/Search">
      <FaSearch />
    </Link>
  </li>

  {!user && (
    <li className="nav-item">
      <Link className="nav-link" to="/Login">
        <FaUser />
      </Link>
    </li>
  )}

  {user && (
    <li className="nav-item">
      <button
        className="nav-link btn btn-link text-light"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
      </button>
    </li>
  )}

  <li className="nav-item">
    <Link className="nav-link" to="/Cart">
      <FaShoppingBag />
      {data > 0 && <span className="cart-count">{data}</span>}
      </Link>
    
  </li>

</ul>


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
