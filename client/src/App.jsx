import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import { Outlet } from "react-router-dom";

function App() {

  const [user, setUser] = useState(
    null
    
  );
  const [tickets, setTickets] = useState([])
  
  useEffect(() => {
    fetch("/api/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {

    const fetchTickets = async () => {
      try {
        const data = await fetch("/api/tickets");
        const response = await data.json();
        setTickets(response);

      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchTickets();
  }, []);

  

  if (!user) return <Login onLogin={setUser} />;


  return (
    <>
      <Navbar user={user} setUser={setUser} />
    
      <Outlet context={{ user, setUser, tickets, setTickets }} />
     
    </>

  )

}

export default App