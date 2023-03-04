// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { loginSuccess ,logoutSuccess } from '../store/redux/authSlice';
// import { useSelector } from 'react-redux';
// import Cookies from 'js-cookie';
// const Login = () => {
//   const dispatch = useDispatch();
//   const { isAuthenticated, session } = useSelector(state => state.user);
// console.log(session)

// const pure  = Cookies.get('player')
// console.log(pure)
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [admin, setAdmin] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Call login API endpoint
//     fetch('http://localhost:3000/user/login', {
//       method: 'POST',
//       body: JSON.stringify({ email, password , admin }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include'
//     })
//       .then(response => response.json())
//       .then(data => {
//         // Update Redux store with session information
//         dispatch(loginSuccess(data));
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };
// const data = ()=>{
//     dispatch(logoutSuccess)
// }
//   return (
//     <>
//     {pure ? (<> <h1>yeah</h1></>):(<> <h1>ohhhh</h1> </>)}
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email">Email</label>
//       <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <label htmlFor="password">Password</label>
//       <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <div class="col-12">
//                   <div class="form-floating">
//                     <select
//                       class="form-select"
//                       id="floatingSelect"
//                       value={admin}
//                       onChange={(e) => setAdmin(e.target.value)}
//                     >
//                       <option value={true}>Admin </option>
//                       <option value={false}>User</option>
//                     </select>
//                     <label htmlFor="floatingSelect">Select category</label>
//                   </div>
//                 </div>
//       <button type="submit">Log in</button>
//     </form>
//     </>
//   );
// };

// export default Login;
