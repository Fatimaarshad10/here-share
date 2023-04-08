import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Authentication = () => {
  const navigate = useNavigate();

  const loginWithGoogle = () => {
    window.open("http://localhost:4000/user/auth/google", "_self");
  };
  // Login with github authentication
  const loginWithGithub = () => {
    window.open("http://localhost:4000/user/auth/github", "_self");
  };
  // navigate
  const userSignIn = () => {
    navigate("/register");
  };
  const userLoginIn = () => {
    navigate("/login");
  };
  const toast_function = ()=>{
    toast.success("User is registered ", {
        position: toast.POSITION.TOP_RIGHT,
      });
  }
 <ToastContainer/>
  return { loginWithGithub, loginWithGoogle, userSignIn , toast_function , userLoginIn};
};
export default Authentication;
