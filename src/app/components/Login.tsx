"use client";

import React, { FormEvent, useContext, useState } from "react";
import toast from "react-hot-toast";
import MessageContext from "../context/context";

const Login = () => {
  const messageContext = useContext(MessageContext);
  const { setLogged, setUserId, setUserName } = messageContext;

  const [login, setLogin] = useState<string>("Janusz");
  const [password, setPassword] = useState<string>("2137");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5093/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Name: login, Password: password }),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      toast(data.message);
      setLogged(true);
      setUserId(data.id);
      setUserName(data.name);
    } else {
      console.log("Unauthorized");
      toast("Unauthorized");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
};

export default Login;
// import React, { useState, FormEvent, SetStateAction } from "react";

// interface ILoginform {
//   setLogged: React.Dispatch<SetStateAction<boolean>>;
// }

// const LoginForm: React.FC<ILoginform> = ({ setLogged }) => {
//   const [login, setLogin] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:5093/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ Name: login, Password: password }),
//       credentials: "include", // Umożliwia przesyłanie ciasteczek
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log(data.Message); // Pomyślne zalogowanie
//       console.log(data);
//       setLogged(true);
//     } else {
//       const errorData = await response.json();
//       console.error(errorData.Message); // Błąd logowania
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <span>Login:</span>
//         <input
//           type="text"
//           value={login}
//           onChange={(e) => setLogin(e.target.value)}
//         />
//         <span>Password:</span>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input type="submit" />
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

// // "use client";

// // import React, { FormEvent, useState } from "react";

// // const Login: React.FC = () => {
// //   const [login, setLogin] = useState<string>("");
// //   const [password, setPassword] = useState<string>("");

// //   const handleSubmit = (e: FormEvent) => {
// //     e.preventDefault();
// //   };

// //   return (
// //     <div>
// //       <form onSubmit={(e) => handleSubmit(e)}>
// //         <span>Login:</span>
// //         <input
// //           type="text"
// //           value={login}
// //           onChange={(e) => setLogin(e.target.value)}
// //         />
// //         <span>Password:</span>
// //         <input
// //           type="text"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //         />
// //         <input type="submit" />
// //       </form>
// //     </div>
// //   );
// // };

// // export default Login;
