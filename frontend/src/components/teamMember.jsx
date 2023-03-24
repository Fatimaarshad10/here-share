import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";

import axios from "axios";

function TeamMember() {
  const [user, setUser] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/user")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(user[0]);
  return (
    <>
      {user ? (
        <div class="container-fluid py-6 px-5">
          <div class="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 class="display-5 mb-0">Our Team Members</h1>
          </div>
          <div class="row g-5">
            <div class="col-lg-4">
              <div class="team-item position-relative overflow-hidden">
                <img class="img-fluid w-100" src={user[0].image} alt="team1" />
                <div class="team-text w-100 position-absolute top-50 text-center bg-primary p-4">
                  <h3 class="text-white">{user[0].name}</h3>
                  <p class="text-white text-uppercase mb-0">{user[0].admin}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="team-item position-relative overflow-hidden">
                <img class="img-fluid w-100" src={user[1].image} alt="" />
                <div class="team-text w-100 position-absolute top-50 text-center bg-primary p-4">
                  <h3 class="text-white">{user[1].name}</h3>
                  <p class="text-white text-uppercase mb-0">{user[1].admin}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="team-item position-relative overflow-hidden">
                <img class="img-fluid w-100" src={user[2].image} alt="" />
                <div class="team-text w-100 position-absolute top-50 text-center bg-primary p-4">
                  <h3 class="text-white">{user[2].name}</h3>
                  <p class="text-white text-uppercase mb-0">{user[2].admin}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TeamMember;
