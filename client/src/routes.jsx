import Home from "./components/Home";
import ErrorPage from './components/ErrorPage';
import About from "./components/About";
import App from "./App";
import TicketsContainer from "./components/TicketsContainer";
import SingleTicketPage from "./components/SingleTicketPage";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            }, 
            {
                path: "/about",
                element: <About />
            },
            {
                path: "/tickets",
                element: <TicketsContainer />,
            },
            {
                path: "/tickets/:ticketId",
                element: <SingleTicketPage/>
            }
        ]
    }
    // {
    //     path: "/",
    //     element: <App />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/about",
    //     element: <About />,
    //     errorElement: <ErrorPage />
    // }
    
    

]

export default routes