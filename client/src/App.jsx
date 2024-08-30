import { useState, useEffect } from 'react'
import Login from './components/Login'


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

 


  if (user) {
   
    return <h2>Welcome, {user.name}!</h2>;
  } else {
    return <Login onLogin={setUser} />;
  }


}

export default App