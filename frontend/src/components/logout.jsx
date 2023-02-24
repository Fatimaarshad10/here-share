// import React , {useState , useEffect} from 'react'
// import Cookies from 'js-cookie';

// function Logout() {
//   const [cookieExists, setCookieExists] = useState(true);

//   useEffect(() => {
//     const checkCookieExists = () => {

//       if (!Cookies.get('auth')) {
//         setCookieExists(false);
//       }
//     };

//     checkCookieExists();
//   }, []);
//   return (
//     <div>
//       {cookieExists ? (
//         <p>The cookie exists.</p>
//       ) : (
//         <p>The cookie has been removed or was never set.</p>
//       )}
//     </div>
//   )
// }

// export default Logout