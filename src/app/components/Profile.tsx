"use client";

import React, { useContext } from "react";
import MessageContext from "../context/context";
import toast from "react-hot-toast";

const Profile = () => {
  const messageContext = useContext(MessageContext);
  const { logged, userId, userName, setLogged, setUserId, setUserName } =
    messageContext;

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5093/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setLogged(false);
        setUserId();
        setUserName("");
        toast("Wylogowano");
      } else {
        toast("Wylogowanie nie powiodło się kurwa");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <h2>Hej {userName}</h2>
      <h3>Twoje id to {userId}</h3>
      <button onClick={handleLogout}>Wyloguj</button>
    </div>
  );
};

export default Profile;

// // W komponencie Profile, dodaj funkcję do obsługi wylogowania
// const Profile = ({ setLogged }: { setLogged: (val: boolean) => void }) => {
//   const handleLogout = async () => {
//     try {
//       const response = await fetch("http://localhost:5093/logout", {
//         method: "POST",
//         credentials: "include", // Użyj ciasteczek sesji
//       });

//       if (response.ok) {
//         setLogged(false); // Zaktualizuj stan zalogowania
//       } else {
//         console.error("Wylogowanie nie powiodło się");
//       }
//     } catch (error) {
//       console.error("Błąd podczas wylogowywania:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Twój profil</h1>
//       <button onClick={handleLogout}>Wyloguj się</button>
//     </div>
//   );
// };

// export default Profile;

// // "use client";

// // import React, { SetStateAction, useEffect, useState } from "react";

// // interface ProfileData {
// //   message: string;
// // }

// // interface IProfile {
// //   setLogged: React.Dispatch<SetStateAction<boolean>>;
// // }

// // const Profile: React.FC<IProfile> = ({ setLogged }) => {
// //   const [profileData, setProfileData] = useState<ProfileData | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchProfileData = async () => {
// //       try {
// //         const response = await fetch("http://localhost:5093/profile", {
// //           credentials: "include", // Umożliwia wysyłanie ciasteczek (w tym sesji)
// //         });

// //         if (!response.ok) {
// //           throw new Error(
// //             "Nie udało się pobrać profilu. Użytkownik niezalogowany."
// //           );
// //         }

// //         const data: ProfileData = await response.json();
// //         setProfileData(data);
// //       } catch (error: any) {
// //         setError(error.message);
// //       }
// //     };

// //     fetchProfileData();
// //   }, []);

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   if (!profileData) {
// //     return <div>Ładowanie profilu...</div>;
// //   }

// //   const logout = async () => {
// //     const response = await fetch("http://localhost:5093/logout", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //     });
// //     if (response.ok) {
// //       setLogged(false);
// //       localStorage.removeItem("loggedIn");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Twój Profil</h2>
// //       <p>{profileData.message}</p>
// //       <button onClick={logout}>wyloguj</button>
// //     </div>
// //   );
// // };

// // export default Profile;
