
import Home from "./components/Home";
import ErrorPage from './components/ErrorPage';
import About from "./components/About";


import App from "./App";

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
            
            // {
            //     path: "/tickets",
            //     element: <Tickets />
            // },
            {
                path: "/about",
                element: <About />
            },  
            // {
            //     path: "/ticket/:id",
            //     element: <Ticket />
            // }
        ]
    }
    // {
    //     path: "/",
    //     element: <Home />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/recipe-container",
    //     element: <RecipeContainer />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/contact",
    //     element: <Contact />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/about-me",
    //     element: <About />,
    //     errorElement: <ErrorPage />
    // },
    // {
    //     path: "/recipe/:id",
    //     element: <SingleRecipe />,
    //     errorElement: <ErrorPage />
    // },
    

]

export default routes