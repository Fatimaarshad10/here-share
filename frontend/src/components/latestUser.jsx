import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestPost } from "../store/redux/authSlice";
function LatestUser() {
  const dispatch = useDispatch();
  const latestPost = useSelector((state) => state.user.latestPost);
  const [currentPage, setCurrentPage] = useState(1);

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }
  useEffect(() => {
    dispatch(fetchLatestPost());
  }, [dispatch]);
  const getUser = async (id) => {
    fetch(`http://localhost:3000/user/${id}`, {
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
      console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const POSTS_PER_PAGE = 3;
  return (
    <>
      {latestPost ? (
        <div class="container-fluid py-6 px-5">
          <div class="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 class="display-5 mb-0">Latest Blog </h1>
            <hr class="w-25 mx-auto bg-primary" />
          </div>
          <div class="row g-5">
            {latestPost
              .slice(
                (currentPage - 1) * POSTS_PER_PAGE,
                currentPage * POSTS_PER_PAGE
              )
              .map((data) => (
                <div class="col-lg-4">
                  <div class="blog-item">
                    <>
                      <div
                        class="position-relative overflow-hidden"
                        style={{ height: "40vh", objectFit: "cover" }}
                      >
                        <img class="img-fluid" src={data.image} alt="" />
                      </div>
                      <div class="bg-secondary d-flex">
                        <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                          <h5 class="text-uppercase m-0">
                            {formatDate(data.createdAt)}
                          </h5>
                        </div>
                        <div class="d-flex flex-column justify-content-center py-3 px-4">
                          <div class="d-flex mb-2">

                            <small class="text-uppercase me-3">
                              <i class="bi bi-person me-2"></i>
                              {getUser(data.user)}
                             
                            </small>
                          </div>
                          <a class="h4" href="">
                            {data.title}
                          </a>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              ))}
            {latestPost.length > 0 && (
              <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li
                    class={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                  ></li>
                  {Array.from({
                    length: Math.ceil(latestPost.length / POSTS_PER_PAGE),
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
                      currentPage ===
                      Math.ceil(latestPost.length / POSTS_PER_PAGE)
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

export default LatestUser;
