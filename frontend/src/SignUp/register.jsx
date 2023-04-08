import React, { useState } from "react";
import { useDispatch } from "react-redux";
import registerPhoto from "../img/login.jpg";
import { registerUser } from "../store/redux/authSlice";
import Authentication from "./authentication";
function Register() {
  const { loginWithGithub, loginWithGoogle, userLoginIn , toast_function} = Authentication();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    admin: "",
    image: null,
  });
  const dispatch = useDispatch();
  // register the user
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        admin: formData.admin,
        image: formData.image,
      })
    ).then(() => {
      userLoginIn();
      toast_function()
    });
  };
  return (
    <>
      <div class="container-fluid bg-secondary px-0 mb-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Sign Up</h1>

            <form onSubmit={handleSubmit}>
              <div class="row g-3">
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      required
                      type="text"
                      class="form-control"
                      id="form-floating-1"
                      placeholder="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="form-floating-1">Full Name</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      required
                      type="email"
                      class="form-control"
                      id="form-floating-2"
                      placeholder="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
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
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="form-floating-3">Password</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-check form-check-inline text-primary">
                    <input
                      required
                      class="form-check-input "
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="admin"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          admin: e.target.value,
                        })
                      }
                    />
                    Admin
                  </div>
                  <div class="form-check form-check-inline text-primary">
                    <input
                      required
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="user"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          admin: e.target.value,
                        })
                      }
                    />
                    User
                  </div>
                </div>
                <input
                  className="text-primary"
                  required
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0],
                    })
                  }
                  style={{ marginTop: "15px" }}
                />
                <button
                  class="btn btn-secondary w-100 py-3 mt-4 "
                  type="submit"
                >
                  Submit
                </button>
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

                <p className="text-center text-primary">
                  Already registered{" "}
                  <a
                    class=" py-2 text-white "
                    onClick={userLoginIn}
                    style={{
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Sign in?{" "}
                  </a>
                </p>
              </div>
            </form>
          </div>

          <div class="col-lg-6">
            <div class="position-relative h-100 ">
              <img
                src={registerPhoto}
                class="img-fluid  "
                style={{ height: "121vh" }}
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
