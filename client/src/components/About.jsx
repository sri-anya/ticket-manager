import React, {useState} from 'react';
import Navbar from './Navbar.jsx';
import Background from './Background.jsx';

const About = () => {
  const [user, setUser] = useState({
    name: "Aastha",
    email:"a@a.com",
    password:"aastha"
  });
  return (
    <div>
      <Background/>

      <main className='flex gap-20 px-44 py-28'>
        
        <div className="content w-3/4 py-8">
          <h1 className='text-lg font-medium'>Hi There!</h1>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis perspiciatis nobis necessitatibus ipsam adipisci, cupiditate dolore natus expedita sint deserunt saepe molestiae! Officiis nobis soluta quo cupiditate esse autem iure voluptate cum alias atque.</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia tempore expedita facere consequuntur, sequi quod aut, eveniet repellendus exercitationem suscipit ducimus! Possimus expedita veritatis dolores in consectetur saepe rerum enim qui ducimus, asperiores sunt adipisci? Illum, officia sint. Tempore, dolorum sed laborum deleniti veritatis aut?</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae sit magnam officia, accusamus facere animi eligendi culpa dolore nesciunt ratione?</p>
        </div>
      </main>
     
    </div>
  )
}

export default About