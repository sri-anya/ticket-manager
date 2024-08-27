import React from 'react'
import Divider from './Divider'
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (

        <div className='sticky top-0 z-30'>
            <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className='Header flex justify-evenly items-center py-8 '>
                <div className="logo cursor-pointer"><img src="/dp-black.svg" alt="" /></div>
                <div className="options">
                    <ul className='flex gap-8'>
                        <Link className='cursor-pointer' to="/">Home</Link>
                        <Link className='cursor-pointer' to="">All Recipes</Link>
                        <Link className='cursor-pointer' to="/about">About Me</Link>
                        
                    </ul>
                </div>
                <div className="socials">
                    <ul className='flex gap-3 justify-center'>
                        <a href=""><li className='cursor-pointer'><img src="/facebook.svg" alt="" /></li></a>
                        <a href=""><li className='cursor-pointer'><img src="/instagram.svg" alt="" /></li></a>
                        <a href=""><li className='cursor-pointer'><img src="/youtube.svg" alt="" /></li></a>
                    </ul>
                </div>

            </div>
            <Divider />
        </div>

    )
}

export default Navbar