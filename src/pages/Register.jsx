import React from 'react'
import logo from "../assets/scraper(3).png"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage, db } from '../../firebase';
import { ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const  handleSubmit = async(event) => {
    event.preventDefault();
    const username = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const confirmPassword = event.target[3].value;

    if(password !== confirmPassword){
        return alert('passwords did not match')
    }

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, username)

        await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            username,
            email
        }); 

    } catch (error) {
        console.log(error)
    }
}

function Register() {
  return (
    <div className="register">
        <div className="register-container">
        <div className="scrape-icon">
        <img src={logo} alt="image of a scraper" />
        </div>
        <div className="form-container">
            <h1>ScrapeMate</h1>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Username'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='password'/>
                <input type="password" placeholder='confirm password' />
                <button>Sign up</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Register