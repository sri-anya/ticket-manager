import Home from "./components/Home";
import ErrorPage from './components/ErrorPage';
import About from "./components/About";
import Login from "./components/Login";
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
            
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/about",
                element: <About />
            }
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