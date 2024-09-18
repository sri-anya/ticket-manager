// import React, { useState } from "react";

// function SignUpForm({ onLogin }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [role, setRole] = useState("");
//   const [errors, setErrors] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     setErrors([]);
//     setIsLoading(true);
//     fetch("/api/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         'Access-Control-Allow-Origin': '*',
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         password,
//         password_confirmation: passwordConfirmation,
//         image_url: imageUrl,
//         role,
//       }),
//     }).then((r) => {
//       setIsLoading(false);
//       if (r.ok) {
//         r.json().then((user) => onLogin(user));
//       } else {
//         r.json().then((err) => setErrors(err.errors));
//       }
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <FormField>
//         <Label htmlFor="username">Username</Label>
//         <Input
//           type="text"
//           id="username"
//           autoComplete="off"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormField>
//       <FormField>
//         <Label htmlFor="username">Email</Label>
//         <Input
//           type="email"
//           id="email"
//           autoComplete="off"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormField>
//       <FormField>
//         <Label htmlFor="password">Password</Label>
//         <Input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           autoComplete="current-password"
//         />
//       </FormField>
//       <FormField>
//         <Label htmlFor="password">Password Confirmation</Label>
//         <Input
//           type="password"
//           id="password_confirmation"
//           value={passwordConfirmation}
//           onChange={(e) => setPasswordConfirmation(e.target.value)}
//           autoComplete="current-password"
//         />
//       </FormField>
//       <FormField>
//         <Label htmlFor="imageUrl">Profile Image</Label>
//         <Input
//           type="text"
//           id="imageUrl"
//           value={imageUrl}
//           onChange={(e) => setImageUrl(e.target.value)}
//         />
//       </FormField>
//       <FormField>
//         <Label htmlFor="bio">Bio</Label>
//         <Textarea
//           rows="3"
//           id="bio"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         />
//       </FormField>
//       <FormField>
//         <Button type="submit">{isLoading ? "Loading..." : "Sign Up"}</Button>
//       </FormField>
//       <FormField>
//         {errors.map((err) => (
//           <Error key={err}>{err}</Error>
//         ))}
//       </FormField>
//     </form>
//   );
// }

// export default SignUpForm;


import React, { useState } from "react";

function SignUpForm({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        image_url: imageUrl,
        role,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="username"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Password Confirmation
          </label>
          <input
            type="password"
            id="password_confirmation"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <textarea
            rows="3"
            id="bio"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4">
            {errors.map((err, index) => (
              <div key={index} className="text-red-600 text-sm">{err}</div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUpForm;

