import React, { useState } from "react";
import register from "../img/login.jpg";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/redux/authSlice";
import Authentication from "./authentication";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginWithGithub, loginWithGoogle, userSignIn } = Authentication();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // login the user
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    ).then(() => {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  return (
    <>
      <div class="container-fluid bg-secondary px-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Log in</h1>
            <form onSubmit={handleSubmit}>
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      required
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
                      required
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

                <div class="col-12">
                  <button
                    class="btn btn-secondary w-100 py-3 mt-4"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
                <p className="text-center text-primary">OR</p>

                <div class="col-6">
                  <button
                    class="btn btn-secondary w-100 py-2 "
                    onClick={loginWithGoogle}
                  >
                    Google
                  </button>
                </div>

                <div class="col-6">
                  <button
                    class="btn btn-secondary w-100 py-2 "
                    onClick={loginWithGithub}
                  >
                    github
                  </button>
                </div>
                <p className="text-center mt-4 text-primary">
                  {" "}
                  Not a member?{" "}
                  <a
                    class=" py-2 text-white "
                    onClick={userSignIn}
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                  >
                    Signup now{" "}
                  </a>
                </p>
              </div>
            </form>
          </div>
          <div class="col-lg-6" style={{ minHeight: "10px" }}>
            <div class="position-relative h-100 ">
              <img src={register} class="img-fluid w-100 h-100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
