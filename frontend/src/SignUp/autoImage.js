// import React from "react";
// import "./app.scss";
// import {getRandomColor,createImageFromInitials} from './Components/Utils'
// function App() {
// 	let name = "Jhon Smith";
// 	let imgSrc = "";

// 	return (
// 		<div>
// 			<img
// 				id='preview'
// 				src={
// 					imgSrc.length <= 0
// 						? createImageFromInitials(500, name, getRandomColor())
// 						: imgSrc
// 				}
// 				alt='profile-pic'
// 			/>
// 		</div>
// 	);
// }


// export default App;
// export const  getRandomColor=()=> {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
//   const getInitials = (name) => {
//     let initials;
//     const nameSplit = name.split(" ");
//     const nameLength = nameSplit.length;
//     if (nameLength > 1) {
//         initials =
//             nameSplit[0].substring(0, 1) +
//             nameSplit[nameLength - 1].substring(0, 1);
//     } else if (nameLength === 1) {
//         initials = nameSplit[0].substring(0, 1);
//     } else return;

//     return initials.toUpperCase();
// };