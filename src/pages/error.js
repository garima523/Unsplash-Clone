import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import icon from '../Components/Assests/unsplash_logo.png';
import bell from '../Components/Assests/bell-icon.png';
import user from '../Components/Assests/user.jpeg';
import menu from '../Components/Assests/menu.png';
import '../App.css';

function ErrorPage() {
  const [displayError, setDisplayError] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [query, setQuery] = useState();
  const [searchQ, setSearch] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false); 

  const navigate = useNavigate();
  const location = useLocation();
  const details = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const errorResolved = localStorage.getItem('errorResolved');
    if (errorResolved === 'false') {
      setErrorOccurred(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/error') {
      setDisplayError(true);
    }
  }, [location]);

  const handleOpenMenu = () => {
    setOpen(!open);
  };

  const handleResolveError = () => {
    localStorage.setItem('errorResolved', 'true');
    navigate('/home', { replace: true });
  };

  const handleCategorySelect = (category) => {
    setQuery(category);
    setSearch(category);
    const categoryUrl = category.replace(/ /g, '-').toLowerCase();
    setErrorOccurred(true);
  };

  const Menu = [
    { label: 'Your Profile', popup: 'Your Profile Popup' },
    { label: 'Logout', popup: 'Logout Popup' },
  ];

  const search = () => {
    setSearch(query);

    if (query !== 'error') {
      navigate(`/home/${query}`);
    }
  };

  return (
    <div className="error-page">
      <div className="header">
        <div className="header-content">
          <img src={icon} alt="" className="unsplash-icon" />
          <input
            type="text"
            placeholder="Search for high-resolution photos"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="header-links">
            <span className="header-link1">Advertise</span>
            <span className="header-link2">Blog</span>
            <span className="header-link3">Unsplash+</span>
          </div>
          <button className="square-button">Submit a Photo</button>
          <img src={bell} alt="" className="bell-icon" />
          <div className="user-dropdown" onClick={handleOpenMenu}>
            <img src={user} alt="" className="user-icon" />
            {open && (
              <div className="dropdown-menu">
                {Menu.map((item, index) => (
                  <div key={index}>
                    <button
                      className="dropdown-button"
                      onClick={() => {
                        if (item.label === 'Logout') {
                          localStorage.removeItem('loggedin');
                          navigate('/login');
                        } else {
                          setSelectedItem(item);
                        }
                      }}
                    >
                      {item.label}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <img src={menu} alt="" className="menu-icon" />
        </div>
        <div className="additional-content">
          <span>Editorial</span>
          <span>Following</span>
          <span>Unsplash+</span>
          <span className="separator"></span>
          <span onClick={() => handleCategorySelect('3D Renders')}>3D Renders</span>
          <span onClick={() => handleCategorySelect('animals')}>Animals</span>
          <span onClick={() => handleCategorySelect('Architecture & Interiors')}>Architecture & Interiors</span>
          <span onClick={() => handleCategorySelect('Experimental')}>Experimental</span>
          <span onClick={() => handleCategorySelect('Fashion & Beauty')}>Fashion & Beauty</span>
          <span onClick={() => handleCategorySelect('Film')}>Film</span>
          <span onClick={() => handleCategorySelect('Nature')}>Nature</span>
          <span onClick={() => handleCategorySelect('People')}>People</span>
          <span onClick={() => handleCategorySelect('Sports')}>Sports</span>
          <span onClick={() => handleCategorySelect('Travel')}>Travel</span>
          <button className="welcome_user">Welcome, {details.name}</button>
        </div>
      </div>

      {displayError ? (
        <div className="error-content">
          <h1>Page not found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <p>Display your error message here</p>
          <button onClick={handleResolveError}>Return to Home</button>
        </div>
      ) : null}
    </div>
  );
}

export default ErrorPage;