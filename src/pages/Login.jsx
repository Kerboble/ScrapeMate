import React from 'react'
import logo from "../assets/scraper(3).png"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

function Login() {
    
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        const password = event.target[1].value;
    
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("logged in")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="register">
        <div className="register-container">
            <div className="scrape-icon">
                <img src={logo} alt="image of a scraper" />
            </div>
            <div className="form-container">
                <h1>ScrapeMate</h1>
                <h4>Login</h4>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='password'/>
                    <button className='glow-on-hover'>Login</button>
                </form>
                <span>Don't have an account? <Link className="link" to="/register">Register</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Login