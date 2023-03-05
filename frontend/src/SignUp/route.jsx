// import React, { useState, useEffect } from "react";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";
// function Route() {
//   const navigate = useNavigate();

  
// const [data, setData] = useState(null)



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/user/success/data", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             credentials: "include",
//           },
//         });
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);


  
//   return (
//     <>
//    {data !== null ? (<h1>data is working</h1>):('')}
//       {/* <button onClick={getUser}>click me </button> */}
//       <button onClick={loginWithGoogle}>click me for logout </button>
//     </>
//   );
// }

// export default Route;
