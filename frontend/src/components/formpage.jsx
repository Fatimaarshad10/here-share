import React from "react";
import quote from "../img/kimetsu-no-yaiba-anime-4k-yn-1360x768.jpg";
function Form() {
  return (
    <>
      <div class="container-fluid bg-dark p-5">
        <div class="row">
          <div class="col-12 text-center">
            <h1 class="display-4 text-white">Free Quote</h1>
            <a href="">Home</a>
            <i class="far fa-square text-primary px-2"></i>
            <a href="">Free Quote</a>
          </div>
        </div>
      </div>
      <div class="container-fluid bg-secondary px-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Request A Free Quote</h1>
            <p class="mb-4">
              Kasd vero erat ea amet justo no stet, et elitr no dolore no elitr
              sea kasd et dolor diam tempor. Nonumy sed dolore no eirmod sit
              nonumy vero lorem amet stet diam at. Ea at lorem sed et, lorem et
              rebum ut eirmod gubergren, dolor ea duo diam justo dolor diam
              ipsum dolore stet stet elitr ut. Ipsum amet labore lorem lorem
              diam magna sea, eos sed dolore elitr.
            </p>
            <form>
              <div class="row gx-3">
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
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="form-floating-2"
                      placeholder="name@example.com"
                    />
                    <label for="form-floating-2">Email address</label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-floating">
                    <select
                      class="form-select"
                      id="floatingSelect"
                      aria-label="Financial Consultancy"
                    >
                      <option selected>Financial Consultancy</option>
                      <option value="1">Strategy Consultancy</option>
                      <option value="2">Tax Consultancy</option>
                    </select>
                    <label for="floatingSelect">Select A Service</label>
                  </div>
                </div>
                <div class="col-6">
                  <button class="btn btn-primary w-100 h-100" type="submit">
                    Request A Quote
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-6" style={{ minHeight: "400px" }}>
            <div class="position-relative h-100">
              <img
                class="position-absolute w-100 h-100"
                src={quote}
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
