import React, { useContext, useState, useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { AuthContext } from '../context/AuthContext'
import Tabs from '../components/Tabs'
import axios from 'axios'
import signout from "../assets/power(1).png"
import Loader from '../components/Loader'


function Home() {
    const scrapeUrl = 'http://localhost:3000/scrape';
    const { currentUser } = useContext(AuthContext);
    const [time, setTime] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false); // State variable for loading indicator
    const [intervalId, setIntervalId] = useState(null); // State variable to store interval id
    const [duration, setDuration] = useState(null);
    const [timeInterval, setTimeInterval] =useState(null);
    const [urlList, setUrlList] = useState([])

    const handleChange = (event) => {
       setTime(event.target.value);
    };

    const handleDuration = (input) => {
      console.log(input)
      if(input === 'minutes'){
        setDuration(60000)
      } else if (input === 'hours'){
        setDuration(3600000)
      }
      else{
        setDuration(86400000)
      }
    }

    useEffect(() => {
      setTimeInterval(duration * time)
    }, [duration, time])
 
    console.log(timeInterval)

    const checkIfUrlExists = (url) => {
     const check = urlList.findIndex(existingUrl => existingUrl === url);
     if(check !== -1){
      return false;
     } else {
      return true
     };
    };


    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!time || time < 0){
        return alert('please enter a valid time interval');
      }
      
      setLoading(true); // Show loader while waiting for response
        const url = event.target[0].value;
        const category = event.target[1].value;
        const interval = time ;
        console.log(event.target[2].value)
        const desiredPrice = event.target[2].value;

        setUrlList(prevList => [...prevList, url])

        if(checkIfUrlExists(url)){
          axios.get(scrapeUrl, {
            params: {
              url: url
            }
          })
          .then(response => {
            // Access response data
            const responseData = response.data;
          
            // Add desired price to the response data
            const updatedData = {
              ...responseData,
              desiredPrice: desiredPrice,
              timeInterval: timeInterval
            };
          
            // Set the state with updated data including desired price
            setData(updatedData);
          })
          .catch(error => {
            console.error("Error", error.message);
          })
          .finally(() => {
            setLoading(false); // Hide loader when request is completed
          }); 
        
          // Start the interval
          const id = setInterval(() => {
            fetchData(url, desiredPrice, timeInterval);
            console.log('started')
          }, timeInterval);
  
          setIntervalId(id); 
          } else {
            setLoading(false);
            alert('duplicated product')
          };

          document.getElementById('myForm').reset();
        };

    const fetchData = (url, desiredPrice, timeInterval) => {
      setLoading(true); // Show loader while waiting for response
      axios.get(scrapeUrl, {
        params: {
          url: url
        }
      })
      .then(response => {
        // Access response data
        const responseData = response.data;
      
        // Add desired price to the response data
        const updatedData = {
          ...responseData,
          desiredPrice: desiredPrice,
          timeInterval: timeInterval
        };
      
        // Set the state with updated data including desired price
        setData(updatedData);
      })
      .catch(error => {
        console.error("Error", error.message);
      })
      .finally(() => {
        setLoading(false); // Hide loader when request is completed
      }); 
    };

    useEffect(() => {
      return () => {
        // Clear the interval when the component unmounts
        clearInterval(intervalId);
      };
    }, []);

    console.log(urlList)

  return (
    <div className='home-container'>
      <div className="home-wrapper">
        <header>
          <h1>Welcome back <span>{currentUser.displayName}</span></h1>
          <button className="glow-on-hover sign-out" onClick={()=>signOut(auth)}><img src={signout} alt="Image Description" /></button>
        </header>
        <form id='myForm' onSubmit={handleSubmit}>
            <input type="text" className='url-input' placeholder='Amazon item url'/>
            <input type="number" placeholder='Desired Price' />
            <input type="number" placeholder='Enter time interval' onChange={handleChange}/> 
            {!time && <p className='interval-message'>Please enter a valid time interval</p>}
          <div className='range-options'>
              <button type="button" onClick={() => handleDuration('minutes')} className="glow-on-hover duration">minutes</button> 
              <button type="button" onClick={() => handleDuration('hours')} className="glow-on-hover duration">hours</button>
              <button type="button" onClick={() => handleDuration('days')} className="glow-on-hover duration">days</button>
          </div>
          <div className='loader-container'>
            <button className='glow-on-hover' >Submit</button> 
            {loading && <Loader />}
          </div>
        </form>
        <Tabs
          data={data}
        />
      </div>
    </div>
  )
}

export default Home;
