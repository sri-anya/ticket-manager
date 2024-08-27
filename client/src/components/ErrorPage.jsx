import Divider from "./Divider";
import Navbar from "./Navbar";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main> 
        <h1 className="text-5xl text-red-600 h-[8vh] w-[80vw] text-center mx-auto p-[20vh] ">Whoops! Something went wrong! {error}</h1>
        <Divider/>
      </main>
    </>
  );
}

export default ErrorPage;