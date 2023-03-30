import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import addImage from "../img/add_post.png";
import axios from "axios";
function Blog() {
  const UserData = useSelector((state) => state.user.session);
  const [post, setPost] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 4;
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  }
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${UserData._id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
console.log(post)

  return (
    <>
      <div class="container-fluid py-6 px-5">
        <div class="row g-5">
          <div class="col-lg-4">
            <div className=" bg-secondary text-center">
              <img
                src={UserData.image}
                alt=""
                class="img-fluid mt-4 "
                style={{ borderRadius: "50%", width: "50%", height: "30vh" }}
              />
            </div>

            <div>
              <div class="bg-secondary text-center" style={{ padding: "30px" }}>
                <p className="text-uppercase">{UserData.name}</p>
                <br />
                <p>{UserData.email}</p>
              </div>
            </div>
          </div>
          {post ? (
            <>
              <div class="col-lg-8">
                <div class="row g-5">
                  <div className="">
                    <Link to="/post/create">
                      <img src={addImage} alt="add_image" width={100} />
                    </Link>
                  </div>
                  {post
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

                              <a class="h4" href="">
                                {data.title}
                              </a>
                              <Link to={`/detail/${data._id}`}>Read more</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {post.length > 0 && (
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li
                          class={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        ></li>
                        {Array.from({
                          length: Math.ceil(post.length / POSTS_PER_PAGE),
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
                            Math.ceil(post.length / POSTS_PER_PAGE)
                              ? "disabled"
                              : ""
                          }`}
                        ></li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
