// import { useState } from "react";

// function LoginForm({onLogin}) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setIsLoading] = useState(false);

//     function handleSubmit(e) {
//         e.preventDefault();
//         setIsLoading(true);
//         fetch("/api/login", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ email, password}),
//         })
//           .then((r) => {
//             setIsLoading(false);
//             if (r.ok){
//                 r.json() .then((user) => onLogin(user));
//             }
//           })
//          ;
//       }

//     return (
//         <div className="flex  h-screen max-w-5xl ">
//             <div className="left w-2/3 bg-lime-600 flex items-center justify-center">
//                 <div className="text-center">
//                     Welcome to ticket Manager
//                 </div>
//             </div>
//             <div className="right w-full flex-grow flex items-center justify-center gap-10 mx-auto">
//                 <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
//                     <h3 className="mb-4 text-lg font-semibold">Login By Entering Below Information</h3>
//                     <div className="mb-4">
//                         <label htmlFor="username" className="block mb-2">Email: </label>
//                         <input
//                             type="email"
//                             id="email"
//                             className="w-full p-2 border border-gray-300 rounded"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <label htmlFor="username" className="block mb-2">Password: </label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="w-full p-2 border border-gray-300 rounded"
//                             autoComplete="current-password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{isLoading ? "Loading..." : "Login"}</button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default LoginForm;

import { useState } from "react";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then((user) => onLogin(user));
            }
          });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <form className="w-full max-w-sm bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-6 text-gray-900">Login</h3>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isLoading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default LoginForm;
