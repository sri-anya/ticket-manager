// import { useState } from "react";
// import LoginForm from "./LoginForm";
// import SignUpForm from "./SignUpForm";
// import Divider from "./Divider";

// function Login({ onLogin }) {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <>
//       <div>Ticket App</div>
//       {showLogin ? (
//         <>
//           <LoginForm onLogin={onLogin} />
//           <Divider />
//           <p>
//             Don't have an account? &nbsp;
//             <button color="secondary" onClick={() => setShowLogin(false)}>
//               Sign Up
//             </button>
//           </p>
//         </>
//       ) : (
//         <>
//           <SignUpForm onLogin={onLogin} />
//           <Divider />
//           <p>
//             Already have an account? &nbsp;
//             <button color="secondary" onClick={() => setShowLogin(true)}>
//               Log In
//             </button>
//           </p>
//         </>
//       )}
//     </>
//   );
// }


import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Divider from "./Divider";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Welcome Section */}
      <div className="w-2/3 bg-lime-600 flex items-center justify-center p-8">
        <div className="text-center text-white text-2xl font-semibold">
          Welcome to Ticket Manager
        </div>
      </div>

      {/* Form Section */}
      <div className="w-1/3 bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center">
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <Divider />
            <p className="text-center mt-4 text-gray-600">
              Don't have an account? &nbsp;
              <button
                onClick={() => setShowLogin(false)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <Divider />
            <p className="text-center mt-4 text-gray-600">
              Already have an account? &nbsp;
              <button
                onClick={() => setShowLogin(true)}
                className="text-indigo-600 font-medium hover:underline"
              >
                Log In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;

