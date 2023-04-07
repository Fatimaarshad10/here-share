import React, { useEffect } from "react";
import $ from "jquery";
import "owl.carousel";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { Link } from "react-router-dom";
import { persistor } from "../store/index";
import { useDispatch } from "react-redux";
import { Success } from "../store/redux/authSlice";
import { useSelector } from "react-redux";

function Header() {
  const UserData = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  // User is authenticated
  useEffect(() => {
    const getUser = async () => {
      fetch("http://localhost:3000/user/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          dispatch(Success(data.user));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  // logout User
  const logout = () => {
    window.open("http://localhost:4000/user/logout", "_self");
    persistor.purge();
  };

  useEffect(() => {
    $(document).ready(function () {
      // Your jQuery code here

      $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
          $(".navbar").addClass("sticky-top");
        } else {
          $(".navbar").removeClass("sticky-top");
        }
      });
      function toggleNavbarMethod() {
        if ($(window).width() > 992) {
          $(".navbar .dropdown")
            .on("mouseover", function () {
              $(".dropdown-toggle", this).trigger("click");
            })
            .on("mouseout", function () {
              $(".dropdown-toggle", this).trigger("click").blur();
            });
        } else {
          $(".navbar .dropdown").off("mouseover").off("mouseout");
        }
      }
      toggleNavbarMethod();
      $(window).resize(toggleNavbarMethod);
    });
  }, []);
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-secondary navbar-light shadow-sm px-5 py-3 py-lg-0">
        <a href="#" class="navbar-brand p-0">
          <h1 class="m-0 text-uppercase text-primary">
            <i class="far fa-smile text-primary me-2"></i>HERE&ShARE{" "}
          </h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <div class="navbar-nav ms-auto py-0 me-n3">
            <Link to="/">
              <a href="#" class="nav-item nav-link ">
                Home
              </a>
            </Link>
            <Link to="/about">
              <a href="#" class="nav-item nav-link ">
                About
              </a>
            </Link>
            <Link to="/service">
              <a href="#" class="nav-item nav-link ">
                Service
              </a>
            </Link>

            <div class="dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Start now{" "}
              </a>

              <div class="dropdown-menu me-0 ">
                {UserData ? (
                  <>
                    <Link to="/blog">
                      <a href="#" class="dropdown-item text-secondary link-data ">
                        Blog
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <div>
                      <Link to="/register">
                        <a href="#" class="dropdown-item text-secondary link-data">
                          Sign up
                        </a>
                      </Link>
                      <Link to="/login">
                        <a href="#" class="dropdown-item text-secondary link-data">
                          Log in
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Link to="/contact">
              <a href="#" class="nav-item nav-link me-2">
                Contact
              </a>
            </Link>

            <div>
              {!UserData ? (
                " "
              ) : (
                <>
                  <div class="dropdown me-4 ">
                    <a
                      class="dropdown-toggle text-primary"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={UserData.image}
                        alt="Snow"
                        width={60}
                        style={{ borderRadius: "50%"}}
                        className="mt-3"
                      />
                    </a>

                    <ul
                      class="dropdown-menu "
                      aria-labelledby="dropdownMenuLink "
                    >
                      <Link to="/user/detail">
                        <a href="#" class="dropdown-item text-secondary link-data">
                          Profile
                        </a>
                      </Link>
                      <Link to="/setting">
                        <a href="#" class="dropdown-item mb-1 text-secondary link-data">
                          Setting
                        </a>
                      </Link>
                      <button class="btn btn-secondary ms-2 " onClick={logout}>
                        logout
                      </button>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
