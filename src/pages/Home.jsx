import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'

function Home() {
  return (
    <div>
        <div className="logout">
        <button onClick={()=>signOut(auth)}>Sign out</button>
        </div>
    </div>
  )
}

export default Home