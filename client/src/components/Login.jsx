import { useState } from "react";

function Login({onLogin}) {
    const [email, setEmail] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((r) => r.json())
          .then((user) => onLogin(user));
      }

    return (
        <div className="flex  h-screen max-w-5xl ">
            <div className="left w-2/3 bg-lime-600 flex items-center justify-center">
                <div className="text-center">
                    dedeljdlwedjlew
                </div>
            </div>
            <div className="right w-full flex-grow flex items-center justify-center gap-10 mx-auto">
                <form className="p-4 bg-white shadow-md rounded" onSubmit={handleSubmit}>
                    <h3 className="mb-4 text-lg font-semibold">Login By Entering Below Information</h3>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Email: </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="username" className="block mb-2">Password: </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full p-2 border border-gray-300 rounded"
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;