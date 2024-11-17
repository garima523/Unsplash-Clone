import React, { useState, useRef } from 'react';
import './LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assests/person.png';
import email_icon from '../Assests/email.png';
import password_icon from '../Assests/password.png';
import '../../App.css';
import bgimg from '../Assests/bg2.jpg';

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isFormValid, setIsFormValid] = useState(false); 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (isFormValid) {
      localStorage.setItem("user", JSON.stringify(input));
      navigate('/login');
    }
  };

  const createAccountClick = () => {
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    // Check if all fields are filled
    const isValid = Object.values(input).every((val) => val.trim() !== '');
    setIsFormValid(isValid);
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
          <div className="text text-blue-800 text-2xl lg:text-4xl font-bold">SignUp</div>
          <div className="border-b-2 border-blue-800" style={{ width: '61px', height: '6px', background: '#4c00b4', borderRadius: '9px' }}></div>
        </div>
        <div className="inputs mx-0 flex flex-col mt-1 gap-2" style={{marginBottom: '55px', width: '85%' }}>
          <form onSubmit={handleSubmit}>
            <div className="flex p-2 sm:p-4 items-center w-full h-16 bg-gray-300 rounded-lg md:h-16">
              <img src={user_icon} alt="" className="ml-4 pr-2" />
              <input name="name" value={input.name} onChange={handleInputChange}
               type="text" placeholder="Name" 
               className="w-full bg-transparent border-none outline-none text-gray-600 text-base md:text-base"/>
            </div>
            <div className="flex p-2 sm:p-4 items-center w-full h-16 bg-gray-300 rounded-lg mt-4 md:h-16">
              <img src={email_icon} alt="" className="ml-4 pr-2" />
              <input name="email" value={input.email} onChange={handleInputChange}
              type="text" placeholder="Email Id" 
              className="w-full bg-transparent border-none outline-none text-gray-600 text-base md:text-base" />
            </div>
            <div className="flex p-2 sm:p-4 items-center w-full h-16 bg-gray-300 rounded-lg mt-4 md:h-16">
              <img src={password_icon} alt="" className="ml-4 pr-2" />
              <input name="password" value={input.password} onChange={handleInputChange}
               type="password" placeholder="Password" 
               className="w-full bg-transparent border-none outline-none text-gray-600 text-base md:text-base" />
            </div>
            {isFormSubmitted && !isFormValid && (
              <div className="text-red-500 text-sm mt-2">Invalid Form. Please fill in all fields.</div>
            )}
            <div className="forgot-password1 mt-2 text-left text-gray-700 text-base">
              already have an account? <span className="text-purple-700 cursor-pointer" onClick={createAccountClick}>login Here!</span>
            </div>
            <div className="submit-container flex justify-center items-center mt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                className={`submit-btn bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-full py-2 px-6 cursor-pointer ${
                  !isFormValid ? 'bg-blue-800 cursor-not-allowed' : 'hover:bg-blue-800'
                } sm:w-36 sm:h-12 md:w-48 md:h-16 lg:max-w-xs xl:w-40 xl:h-14`}
              >
                Signup
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;