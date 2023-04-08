import React, { useState, useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { LatestPost } from "../store/redux/authSlice";
function LatestUser() {
  const dispatch = useDispatch();
  const this_is_user_post = useSelector((state) => state.user.latest);
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
    dispatch(LatestPost());
  }, [dispatch]);

  const POSTS_PER_PAGE = 3;
  return (
    <>
      {this_is_user_post ? (
        <div class="container-fluid py-6 px-5">
          <div class="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 class="display-5 mb-0">Latest Blog </h1>
            <hr class="w-25 mx-auto bg-primary" />
          </div>
          <div class="row g-5">
            {this_is_user_post
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
                        <img
                          class="img-fluid img-hover"
                          src={data.image}
                          alt=""
                        />
                      </div>
                      <div class="d-flex">
                        <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary px-4">
                          <h5 class="text-uppercase m-0 text-secondary  ">
                            {formatDate(data.createdAt)}
                          </h5>
                        </div>
                        <div class="d-flex flex-column justify-content-center py-3 px-4">
                          <div class="d-flex mb-2">
                            <small class="text-uppercase me-3 text-primary">
                              <i class="bi bi-person me-2 text-primary"></i>
                              {data.user.name}
                            </small>
                          </div>
                          <a
                            class="h5 text-primary"
                            href=""
                            style={{
                              width: "150px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {data.title}
                          </a>
                        </div>
                      </div>
                    </>
                  </div>
                </div>
              ))}
            {this_is_user_post.length > 4 && (
              <nav aria-label="Page navigation example ">
                <ul class="pagination justify-content-center ">
                  <li
                    class={`page-item  bg-primary text-white border-0 ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  ></li>
                  {Array.from({
                    length: Math.ceil(
                      this_is_user_post.length / POSTS_PER_PAGE
                    ),
                  }).map((_, index) => (
                    <li
                      key={index}
                      class={`page-item  bg-primary text-white border-0  ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <a
                        class="page-link  bg-primary text-white border-0"
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </a>
                    </li>
                  ))}
                  <li
                    class={`page-item  bg-primary text-white border-0 ${
                      currentPage ===
                      Math.ceil(this_is_user_post.length / POSTS_PER_PAGE)
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
