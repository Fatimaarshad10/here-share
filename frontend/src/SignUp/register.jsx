import React from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import register from "../img/pexels-photo-6457561.jpeg";
function Register() {
  return (
    <>
      <div class="container-fluid bg-secondary px-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Sign Up</h1>
            <form>
              <div class="row g-3">
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="form-floating-1"
                      placeholder="John Doe"
                    />
                    <label for="form-floating-1">Full Name</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="form-floating-2"
                      placeholder="name@example.com"
                    />
                    <label for="form-floating-2">Email address</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="form-floating-3"
                      placeholder="Subject"
                    />
                    <label for="form-floating-3">Password</label>
                  </div>
                </div>
                <div class="col-12">
                            <div class="form-floating">
                                <select class="form-select" id="floatingSelect" aria-label="Financial Consultancy">
                                    <option selected>Admin </option>
                                    <option value="1">User</option>
                                </select>
                                <label for="floatingSelect">Select category</label>
                            </div>
                        </div>
                <div class="col-12">
                  <button class="btn btn-primary w-100 py-3 mt-4" type="submit">
                    Submit
                  </button>
                </div>
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

export default Register;