import { useState } from "react";

function Login() {
    const [username, setUsername] = useState("");

    return (
        <div className="flex  h-screen max-w-5xl ">
            <div className="left w-2/3 bg-lime-600 flex items-center justify-center">
                <div className="text-center">
                    dedeljdlwedjlew
                </div>
            </div>
            <div className="right flex-grow flex items-center justify-center">
                <form className="p-4 bg-white shadow-md rounded">
                    <h3 className="mb-4 text-lg font-semibold">Login With Username</h3>
                    <div className="mb-4">
                        <label htmlFor="username" className="block mb-2">Username: </label>
                        <input
                            type="text"
                            id="username"
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