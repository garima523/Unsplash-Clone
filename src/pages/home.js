import React, { useState, useEffect } from 'react';
import { LoadImages, SearchImages } from '../Components/Api';
import { useNavigate, useLocation } from 'react-router-dom';
import Image from '../Components/Image';
import icon from '../Components/Assests/unsplash_logo.png';
import bell from '../Components/Assests/bell-icon.png';
import user from '../Components/Assests/user.jpeg';
import menu from '../Components/Assests/menu.png';
import '../App.css';
import Popup from '../Components/popup';
import ErrorPage from './error';

function Home() {
  const [query, setQuery] = useState('');
  const [query1, setQuery1] = useState('');
  const [searchQ, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const details = JSON.parse(localStorage.getItem('user'));
  const [displayError, setDisplayError] = useState(false);



  const handleUnsplashIconClick = async () => {
    console.log('Unsplash icon clicked'); 
    try {
      const homeResponse = await LoadImages(page, 'home');
      console.log('Home API response:', homeResponse); 
      data(homeResponse);
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
    navigate('/home'); 
  };

  useEffect(() => {
    if (location.pathname === '/error') {
      setDisplayError(true); 
    } else {
      setDisplayError(false); 
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/home') {
      setDisplayError(false);
    }
  }, [location.pathname]);
  const data = LoadImages(page);


  useEffect(() => {
    if (location.pathname === '/error') {
      setDisplayError(true); 
    } else {
      setDisplayError(false); 
    }
  }, [location.pathname]);
  
  const handleScroll = () =>{
    if(window.innerHeight+document.documentElement.scrollTop+1>=document.documentElement.scrollHeight){
      setPage(prev=> prev+1)
    }
  }

  useEffect(()=>{
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const search = () => {
    setSearch(query);
    navigate(`/home/${query}`);
    const gridcontainer = document.querySelector('.gridcontainer');
    const header = document.querySelector('.header');
    if (gridcontainer && header) {
      const headerHeight = header.clientHeight; 
      const offset = gridcontainer.getBoundingClientRect().top - headerHeight;
      
      window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
    }
  };
  const search1 =()=>{ 
    setSearch(query1)
    navigate(`/home/${query1}`);
    const gridcontainer = document.querySelector('.gridcontainer');
    const header = document.querySelector('.header');
    if (gridcontainer && header) {
      const headerHeight = header.clientHeight; 
      const offset = gridcontainer.getBoundingClientRect().top - headerHeight;
      
      window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
    }
  }

  const searchData = SearchImages(searchQ,page)
  console.log(searchData) 

  const Menu = [
    { label: "Your Profile", popup: "Your Profile Popup" },
    { label: "Logout", popup: "Logout Popup" },
  ];
  
  const [open, setOpen] = useState(false)
  const handleCategorySelect = (category) => {
    setQuery(category);
    setSearch(category);
    const categoryUrl = category.replace(/ /g, '-').toLowerCase(); 
    
    const gridcontainer = document.querySelector('.gridcontainer');
    const header = document.querySelector('.header');
    if (gridcontainer && header) {
      const headerHeight = header.clientHeight; 
      const offset = gridcontainer.getBoundingClientRect().top - headerHeight;
      
      window.scrollTo({ top: window.scrollY + offset, behavior: 'smooth' });
      navigate(`/home/${categoryUrl}`);
    }
  };
  

  return (
    <div className="App">

      <div className='header'>
        <div className="header-content">
          {/* <img src={icon} alt="" className="unsplash-icon" onClick={() => {navigate('/home')}}/> */}
          <img src={icon} alt="" className="unsplash-icon" onClick={handleUnsplashIconClick} />

          <input
            type="text"
            placeholder="Search for high-resolution photos"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            // onKeyDown={handleKeyPress}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                search();
              }
            }}
          />
          <div className="header-links">
            <span className="header-link1">Advertise</span>
            <span className="header-link2">Blog</span>
            <span className="header-link3">Unsplash+</span>
          </div>
          <button className="square-button">Submit a Photo</button>
          <img src={bell} alt="" className="bell-icon" />
          <div className="user-dropdown" onClick={() => setOpen(!open)}>
              <img src={user} alt="" className="user-icon" />
              {open && (
                <div className="dropdown-menu">
                  {Menu.map((item, index) => (
                    <div key={index}>
                      <button
                        className="dropdown-button" 
                        onClick={() =>{
                          if (item.label === "Logout") {
                            localStorage.removeItem("loggedin")
                            navigate('/login');
                          } else {
                            setSelectedItem(item);
                          }}}
                      >
                        {item.label}
                      </button>
                      {selectedItem === item && (
                        <Popup content={item.popup} onClose={() => setSelectedItem(null)} />
                      )}
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
          <span class="separator"></span>  
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

          <button className='welcome_user'>Welcome,{details.name}</button>
      </div>
      </div>

      <div className="background-section">
        <div className="overlay-text">Unsplash</div>
        <div className="overlay-text1">The Internet source for visuals.</div>
        <div className="overlay-text2">Powered by creators everywhere</div>
        <input type ="text" placeholder="Search for high-resolution photos" value={query1} 
            onChange={(event)=> setQuery1(event.target.value)} onKeyDown={(event) => {
              if (event.key === 'Enter') {
                search1();
              }
            }}/>
        {/* <button onClick={search} className="button1">Search</button> */}
      </div>

      <div className="gridcontainer">
        {searchQ
          ? searchData.map((img, key) => (
              <Image src={img.urls.small_s3} key={key} downloadUrl={img.links.download} id={img.id} alt_description={img.alt_description} likes={img.likes} updated_at={img.updated_at} avataar={img.avataar} user_name={img.user.name} location ={img.user.location}/>
            ))
          : data.map((img, key) => (
              <Image src={img.urls.small_s3} downloadUrl={img.links.download} id={img.id} alt_description={img.alt_description} likes={img.likes} updated_at={img.updated_at} avataar={img.avataar} user_name={img.user.name} location ={img.user.location}/>
            ))
        }
        {location.pathname === '/error' && displayError ? (
          <ErrorPage /> 
        ) : null}
      </div>
    </div>
  );
}

export default Home;
