import React from 'react'
import Divider from './Divider'
import {Link} from 'react-router-dom'

const Navbar = ({user, setUser}) => {

    
    function handleLogoutClick() {
        fetch("/api/logout", { method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
         }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        });
      }
    return (

        <div className='sticky top-0 z-30'>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className='Header flex justify-evenly items-center py-8 '>
                <div className="logo cursor-pointer"><img src="/dp-black.svg" alt="" /></div>
                <div className="options">
                    <ul className='flex gap-8'>
                        <Link className='cursor-pointer' to="/">Home</Link>
                        <Link className='cursor-pointer' to="/tickets">All Tickets</Link>
                        <Link className='cursor-pointer' to="/about">About</Link>
                        
                    </ul>
                </div>
                <div className="socials">
                    <ul className='flex gap-3 justify-center items-center'>
                        <h3>Hello! {user.name}</h3>
                        <button type="submit" className="px-4 py-2 bg-pointer-500 text-black rounded" onClick={handleLogoutClick}>Logout</button>
                    </ul>
                </div>

            </div>
            <Divider />
        </div>

    )
}

export default Navbar