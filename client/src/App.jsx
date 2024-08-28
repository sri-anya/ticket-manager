import { useState, useEffect } from 'react'
import Login from './components/Login'


function App() {

  const [rec, setRec] = useState([])

  const [user, setUser] = useState(null);

  function handleLogin(user) {
    setUser(user);
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <>
      <Login/>
    </>
  )
}

export default App