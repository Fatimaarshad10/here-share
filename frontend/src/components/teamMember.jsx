import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import axios from "axios";
function TeamMember() {
  const [user, setUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;

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

  return (
    <>
      {user ? (
        <div class="container-fluid py-6 px-5">
          <div class="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 class="display-5 mb-0">Our Team Members</h1>
          </div>
          <div class="row g-5">
            {user
              .slice(
                (currentPage - 1) * POSTS_PER_PAGE,
                currentPage * POSTS_PER_PAGE
              )
              .map((data) => (
                <div class="col-lg-4">
                  <div class="team-item position-relative overflow-hidden">
                    <img class="img-fluid w-100" src={data.image} alt="team1" />
                    <div class="team-text w-100 position-absolute top-50 text-center bg-primary p-4">
                      <h3 class="text-white">{data.name}</h3>
                      <p class="text-white text-uppercase mb-0">{data.admin}</p>
                    </div>
                  </div>
                </div>
              ))}
            {user.length > 0 && (
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li
                    class={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  ></li>
                  {Array.from({
                    length: Math.ceil(user.length / POSTS_PER_PAGE),
                  }).map((_, index) => (
                    <li
                      key={index}
                      class={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <a
                        class="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    class={`page-item ${
                      currentPage === Math.ceil(user.length / POSTS_PER_PAGE)
                        ? "disabled"
                        : ""
                    }`}
                  ></li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default TeamMember;
