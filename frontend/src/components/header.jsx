import React, { useEffect, useState } from "react";
import $ from "jquery";
import "owl.carousel";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logOut } from "../store/redux/authSlice";
import Avatar from 'react-avatar';
function Header() {
const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const localData = useSelector(state => state.user.email );

  console.log(localData)
  // google authentication User Data 
  const getUser = () => {
    fetch("http://localhost:4000/user/success", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json()) // extract JSON data from response
      .then((data) => setUser(data)) // set user state with data
      .catch((err) => console.log(err)); // handle any errors
  };
  // render when the api is call 
  useEffect(() => {
    getUser();
  }, []);
 const logout =()=>{
  if(user.displayName){
    return window.open("http://localhost:4000/user/logout", "_self");

  }if(localData){
    dispatch(logOut)
  }
 }

const importantData = localData || user.displayName
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
              <a class="text-body py-2 pe-3 border-end" href="#faq">
                <small>FAQs</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#support">
                <small>Support</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#privacy">
                <small>Privacy</small>
              </a>
              <a class="text-body py-2 px-3 border-end" href="#policy">
                <small>Policy</small>
              </a>
              <a class="text-body py-2 ps-3" href="#career">
                <small>Career</small>
              </a>
            </div>
          </div>
          <div class="col-md-6 text-center text-lg-end">
            <div class="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div class="me-3 pe-3 border-end py-2">
                <p class="m-0">

                  {/* <i class="fa fa-envelope-open me-2"></i> */}
                  {user.photos && user.photos.length > 0 && (
                <img src={user.photos[0].value} alt="my-image" referrerPolicy="no-referrer"style={{borderRadius:'50%' , width:'30%'}}/>
                  )}
                  {user.displayName}
                </p>
               <p>
                {!localData ? (
                  <>
                  
                  </>
                ):(
                  <>
                <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={localData} />

                  </>
                )}

               

               </p>
              </div>
             
              <div class="py-2">
                <p class="m-0">
                  <i class="fa fa-phone-alt me-2"></i>+012 345 6789
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <a href="index.html" class="navbar-brand p-0">
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
              <a href="index.html" class="nav-item nav-link">
                Home
              </a>
            </Link>
            <Link to="/about">
              <a href="about.html" class="nav-item nav-link active">
                About
              </a>
            </Link>
            <Link to="/service">
              <a href="service.html" class="nav-item nav-link">
                Service
              </a>
            </Link>

            <div class="nav-item dropdown">
              <a
                href="toggle"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Start now{" "}
              </a>

              <div class="dropdown-menu m-0">
              
               {user.displayName ? (<>
                
               <button class="btn btn-primary ms-3 w-50" onClick={logout} style={{}}>logout</button>
               
               </>):(
                <>
                </>
               )}
               {localData ? (<> <a href="register" class="dropdown-item" onClick={logout}>
                    Log out
                  </a></>):(
                    <>
                    </>
                  )}
                 
             
                  { importantData ? (
                    <>
                    </>
                       ) : (
                  <div>
                    
                    <Link to="/register">
                      <a href="service.html" class="dropdown-item">
                        Sign up
                      </a>
                    </Link>
                    <Link to="/login">
                      <a href="service.html" class="dropdown-item">
                        Log in
                      </a>
                    </Link>
                  </div>
                )}
                <Link to="/email">
                  <a href="service.html" class="dropdown-item">
                    Quote Form
                  </a>
                </Link>

                <Link to="/redux">
                  <a href="redux" class="dropdown-item">
                    redux{" "}
                  </a>
                </Link>
                <Link to="/hacker">
                  <a href="hacker" class="dropdown-item">
                    hacker rank{" "}
                  </a>
                </Link>
                <Link to="/detail">
                  <a href="service.html" class="dropdown-item">
                    Blog Detail
                  </a>
                </Link>
              </div>
            </div>
            <Link to="/contact">
              <a href="contact.html" class="nav-item nav-link">
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
