import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Background from './components/Background'
import Footer from './components/Footer'


function App() {

  const [rec, setRec] = useState([])

  useEffect(() => {

    const fetchRecipes = async () => {
      try {
        const data = await fetch("http://127.0.0.1:5555/tickets");
        const response = await data.json();
        setRec(response);
        

      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);


  return (
    <>
      {console.log(rec)}
      <Background />
      <Navbar />
      <Outlet context={{rec, setRec}}/>
      <Footer />

    </>
  )
}

export default App