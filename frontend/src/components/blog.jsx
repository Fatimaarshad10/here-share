import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onePost, LatestPost } from "../store/redux/authSlice";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [recentPost, setRecentPost] = useState(1);
  const POSTS_PER_PAGE = 4;
  const RECENT_PER_PAGE = 4;
  const this_is_user_post = useSelector((state) => state.user.userpost);
  const this_is_latest_post = useSelector((state) => state.user.latest);
  console.log(this_is_user_post)

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }
  useEffect(() => {
    dispatch(onePost());
    dispatch(LatestPost());
  }, [dispatch]);

  return (
    <>
      <div class="container-fluid py-6 px-5">
        <div class="row g-5">
          {this_is_user_post ? (
            <>
              <div class="col-lg-8">
                <div class="row g-5">
                  {this_is_user_post
                    .slice(
                      (currentPage - 1) * POSTS_PER_PAGE,
                      currentPage * POSTS_PER_PAGE
                    )
                    .map((data) => (
                      <div class="col-xl-6 col-lg-12 col-md-6" key={data._id}>
                        <div class="blog-item">
                          <div
                            class="position-relative overflow-hidden"
                            style={{ height: "35vh" }}
                          >
                            <img class="img-fluid" src={data.image} alt="" />
                          </div>
                          <div class="bg-secondary d-flex">
                            <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                              <span>{formatDate(data.createdAt)}</span>
                            </div>
                            <div class="d-flex flex-column justify-content-center py-3 px-4">
                              <div class="d-flex mb-2">
                                <small class="text-uppercase me-3">
                                  <i class="bi bi-person me-2"></i>
                                  {data.user.name}
                                </small>
                              </div>
                              <a class="h5" href=""  style={{ width: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> 
                                {data.title}
                              </a>
                              <Link to={`/detail/${data._id}`}>Read more</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                      <li
                        class={`page-item ${
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
                          Math.ceil(this_is_user_post.length / POSTS_PER_PAGE)
                            ? "disabled"
                            : ""
                        }`}
                      ></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div class="col-lg-4">
            <div class="mb-5">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control p-3"
                  placeholder="Keyword"
                />
                <button class="btn btn-primary px-4">
                  <i class="bi bi-search"></i>
                </button>
              </div>
            </div>

            {this_is_latest_post ? (
              <div class="mb-5">
                <h2 class="mb-4">Recent Post</h2>
                {this_is_latest_post
                  .slice(
                    (recentPost - 1) * RECENT_PER_PAGE,
                    recentPost * RECENT_PER_PAGE
                  )
                  .map((data) => (
                    <div class="d-flex mb-3" key={data._id}>
                      <img
                        class="img-fluid"
                        src={data.image}
                        style={{
                          width: "200px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        alt=""
                      />
                      <a
                        href=""
                        class="h5 d-flex align-items-center bg-secondary px-3 mb-0"
                        style={{ width: "200px" }}
                      >
                        {data.title}
                      </a>
                    </div>
                  ))}
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li
                      class={`page-item ${recentPost === 1 ? "disabled" : ""}`}
                    ></li>
                    {Array.from({
                      length: Math.ceil(
                        this_is_latest_post.length / RECENT_PER_PAGE
                      ),
                    }).map((_, index) => (
                      <li
                        key={index}
                        class={`page-item ${
                          recentPost === index + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          class="page-link"
                          onClick={() => setRecentPost(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      class={`page-item ${
                        recentPost ===
                        Math.ceil(this_is_latest_post.length / RECENT_PER_PAGE)
                          ? "disabled"
                          : ""
                      }`}
                    ></li>
                  </ul>
                </nav>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
