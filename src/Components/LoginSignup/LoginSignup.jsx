import React, { useState } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import email_icon from '../Assests/email.png';
import password_icon from '../Assests/password.png';
import '../../App.css';
import bgimg from '../Assests/bg2.jpg';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem('user'));
    if (input.email === loggeduser.email && input.password === loggeduser.password) {
      localStorage.setItem("loggedin", true);
      navigate('/home');
    } else {
      alert("Wrong email or password");
    }
  };

  const createAccountClick = () => {
    navigate('/signup');
  };

  return (
    <div
      className="page h-screen w-full flex justify-center items-center text-xs mx-auto my-auto"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="container flex flex-col items-center justify-between mx-auto my-auto mt-24 mb-24 mx-4 my-4 bg-white rounded-lg shadow-md"
      style={{ maxWidth: '440px', width: '90%', height: '520px' }}>
        <div className="header1 flex flex-col items-center gap-7 w-full mt-5">
          <div className="text text-blue-800 text-2xl lg:text-4xl font-bold">Login</div>
          <div className="border-b-2 border-blue-800" style={{ width: '61px', height: '6px', background: '#4c00b4', borderRadius: '9px' }}></div>
        </div>
        <div className="inputs mx-0 flex flex-col mt-1 gap-2" style={{marginBottom: '70px', width: '85%' }}>
          <form onSubmit={handleLogin}>
            <div className="flex p-2 sm:p-4 items-center w-full h-16 bg-gray-300 rounded-lg md:h-16">
              <img src={email_icon} alt="" className="ml-4 pr-2" />
              <input
                name="email"
                value={input.email}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                type="text"
                placeholder="Email Id"
                className="w-full bg-transparent border-none outline-none text-gray-600 text-base md:text-base"
              />
            </div>
            <div className="flex p-2 sm:p-4 items-center w-full h-16 bg-gray-300 rounded-lg mt-7 md:h-16">
              <img src={password_icon} alt="" className="ml-4 pr-2" />
              <input
                name="password"
                value={input.password}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent border-none outline-none text-gray-600 text-base md:text-base"
              />
            </div>

            <div className="forgot-password mt-2 text-left text-gray-700 text-base">
              Forgot password? <span className="text-purple-700 cursor-pointer">Click Here!</span>
            </div>
            <div className="submit-container1 flex justify-center items-center mt-4">
              <button
                type="submit"
                className="submit-btn1 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-full py-2 px-6 w-36 " style={{height: '50px'}}
              >
                Login
              </button>
            </div>
          </form>
          <div className="create-account mt-4 text-center text-gray-700 text-base">
            Create Account? <span className="text-purple-700 cursor-pointer" onClick={createAccountClick}>Click Here!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;