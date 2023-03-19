import React, { useEffect, useState } from "react";
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
          console.log(data.user)
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
      <div class="container-fluid bg-secondary ps-5 pe-0 d-none d-lg-block">
        <div class="row gx-0">
          <div class="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div class="d-inline-flex align-items-center">
              <a class="text-body py-2 pe-3 border-end" href="#">
                <small>FAQs</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#">
                <small>Support</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#">
                <small>Privacy</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#">
                <small>Policy</small>
              </a>
              <a class="text-body py-2 ps-3" href="#">
                <small>Career</small>
              </a>
            </div>
          </div>
          <div class="col-md-6 text-center text-lg-end">
            <div class="position-relative d-inline-flex align-items-center bg-primary text-white  px-5">
              <div class=" ms-3 pe-1 py-1">
                <p>
                  {!UserData ? (
                    " "
                  ) : (
                    <>
                      <div class="col-xl-6 col-lg-12 col-md-6">
                        <div class="blog-item ">
                         
                           
   
                        <div class="btn-group">
  <div class="dropdown">
    <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
      <img src={UserData.image} alt="Snow" width={40} style={{borderRadius:'50%'}}/>
    </a>

    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <Link to="/user/detail">
                      <a href="#" class="dropdown-item">
                    Profile
                      </a>
                    </Link>
                    <Link to="/setting">
                      <a href="#" class="dropdown-item">
                   Setting
                      </a>
                    </Link>
    </ul>
  </div>
</div>

                        </div>
                      </div>

                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
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
              <a href="#" class="nav-item nav-link active">
                Home
              </a>
            </Link>
            <Link to="/about">
              <a href="#" class="nav-item nav-link ">
                About
              </a>
            </Link>
            <Link to="/service">
              <a href="#" class="nav-item nav-link">
                Service
              </a>
            </Link>

            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Start now{" "}
              </a>

              <div class="dropdown-menu m-0">
                {UserData ? (
                  <>
                    <button class="btn btn-primary ms-3 w-50" onClick={logout}>
                      logout
                    </button>
                    <Link to="/form ">
                      <a href="#" class="dropdown-item">
                        Quote Form
                      </a>
                    </Link>

                    <Link to="/detail">
                      <a href="#" class="dropdown-item">
                        Blog Detail
                      </a>
                    </Link>
                    <Link to="/blog">
                      <a href="#" class="dropdown-item">
                        Blog
                      </a>
                    </Link>
                   
                  </>
                ) : (
                  <>
                    <div>
                      <Link to="/register">
                        <a href="#" class="dropdown-item">
                          Sign up
                        </a>
                      </Link>
                      <Link to="/login">
                        <a href="#" class="dropdown-item">
                          Log in
                        </a>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
            <Link to="/contact">
              <a href="#" class="nav-item nav-link">
                Contact
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
