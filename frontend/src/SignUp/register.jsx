import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { useDispatch } from "react-redux";
import registerPhoto from "../img/pexels-photo-6457561.jpeg";
import { useNavigate } from "react-router-dom";
import { registerSuccess } from "../store/redux/authSlice";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [image, setImag] = useState([]);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call login API endpoint
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("admin", admin);
    data.append("image", image);

    fetch("http://localhost:3000/user/register", {
      method: "POST",
      body: (data),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update Redux store with session information
        dispatch(registerSuccess(data));
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // navigate
  const userSignIn = () => {
    navigate("/login");
  };
  const submitHandler = (e) => {
    setImag(e.target.files[0]);
  };
  // Login with google authentication
  const loginWithGoogle = () => {
    window.open("http://localhost:4000/user/auth/google", "_self");
  };
  // Login with github authentication
  const loginWithGithub = () => {
    window.open("http://localhost:4000/user/auth/github", "_self");
  };
  return (
    <>
      <div class="container-fluid bg-secondary px-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Sign Up</h1>

            <form onSubmit={handleSubmit}>
              <div class="row g-3">
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="form-floating-1"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="form-floating-1">Full Name</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="form-floating-2"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="form-floating-2">Email address</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="form-floating-3"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="form-floating-3">Password</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input "
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="admin"
                      onChange={(e) => setAdmin(e.target.value)}
                    />
                    Admin
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      onChange={(e) => setAdmin(e.target.value)}
                      id="flexRadioDefault2"
                      value="user"
                    />
                    User
                  </div>
                </div>
                <input
                  type="file"
                  onChange={submitHandler}
                  style={{ marginTop: "15px" }}
                />

                <button class="btn btn-primary w-100 py-3 mt-4 " type="submit">
                  Submit
                </button>
                <p className="text-center">OR</p>

                <div class="col-6">
                  <button
                    class="btn btn-primary w-100 py-2 "
                    onClick={loginWithGoogle}
                  >
                    Google
                  </button>
                </div>

                <div class="col-6">
                  <button
                    class="btn btn-primary w-100 py-2 "
                    onClick={loginWithGithub}
                  >
                    github
                  </button>
                </div>

                <p className="text-center">
                  Already registered{" "}
                  <a
                    class="text-body py-2 "
                    onClick={userSignIn}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Sign in?{" "}
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div class="col-lg-6" style={{ minHeight: "10px" }}>
            <div class="position-relative h-100 ">
              <img
                src={registerPhoto}
                class="img-fluid w-100 h-100"
                alt="registerPhoto"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
