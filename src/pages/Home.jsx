import React, { useContext, useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import Tabs from '../components/Tabs'
import axios from 'axios'

function Home() {
    const {currentUser} = useContext(AuthContext);
    const [time, setTime] = useState(null)
    const [data, setData] = useState([])

    // const handleChange = (event) => {
    //   setTime(event.target.value)
    // };

    const scrapeUrl = 'http://localhost:3000/scrape';

    const handleSubmit = async (event) => {
      event.preventDefault();
      const url = event.target[0].value;
      const category = event.target[1].value;
      const interval = time ;
      axios.get(scrapeUrl, {
        params:{
          url: url
        }
      })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error("Error", error.message);
      });
    }


  return (
    <div className='home-container'>
      <h1>Welcome back {currentUser.displayName}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className='url-input' placeholder='Amazon item url'/>
          <input type="text" placeholder='category' />
          <button className='glow-on-hover' >Submit</button>
        </form>
        <button className="glow-on-hover sign-out" onClick={()=>signOut(auth)}>Sign out</button>
        <Tabs
        data={data}
        />
    </div>
  )
}

export default Home