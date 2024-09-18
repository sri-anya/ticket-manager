import React, { useState } from 'react'
import { useOutletContext } from "react-router-dom";
import NewTicket from './NewTicket';
import Background from './Background';

import TicketsContainerByUser from './TicketsContainerByUser';

const Home = () => {

  

  const [showNewTicketForm, setShowNewTicketForm] = useState(false)

  return (
    <div>
      <Background />
      <main className='flex flex-col justify-center mx-auto items-center text-center gap-10 my-10'>
        {showNewTicketForm? null:<button className='bg-lime-600 text-white w-fit px-4 py-3 rounded-md' onClick={()=>{setShowNewTicketForm(!showNewTicketForm)}}>New Ticket</button>}
        {showNewTicketForm ? <NewTicket />:null}
        <TicketsContainerByUser />

      </main>
    </div>
  )
}

export default Home