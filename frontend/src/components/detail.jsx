import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Blog1 from "../img/blog-1.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function Detail() {
  const UserData = useSelector((state) => state.user.session);
  const [detail, setDetail] = useState("");
  const [comment, setComment] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 3;
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }
  const { id } = useParams();
  const PostDetail = async () => {
    const response = await fetch(`http://localhost:4000/post/data/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    setDetail(json);
    if (response.ok) {
      console.log("detail page is open ");
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:4000/post/${detail._id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment,
        }),
      }
    );
    const json = await response.json();
    setDetail(json);
    if (response.ok) {
      toast.success("Successfully post is added ", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("comment is add ");
    }
  };
  useEffect(() => {
    PostDetail();
  }, []);

  return (
    <>
      <div class="container-fluid py-6 px-5">
        <div class="row g-5">
          <div class="col-lg-8">
            <div class="mb-5">
              <img class="img-fluid w-100 mb-5" src={detail.image} alt="" />
              <h1 class="mb-4">{detail.title}</h1>
              <p>{detail.description}</p>
            </div>

            {detail ? (
              <div class="mb-5">
                <h2 class="mb-4">{detail.comments.length} Comments</h2>
                {detail.comments
                  .slice(
                    (currentPage - 1) * POSTS_PER_PAGE,
                    currentPage * POSTS_PER_PAGE
                  )
                  .map((data) => (
                    <div class="d-flex mb-4">
                      <img
                        src={detail.user.image}
                        class="img-fluid rounded-circle"
                        style={{ width: "45px", height: "45px" }}
                      />
                      <div class="ps-3">
                        <h6>
                          <a href="">{detail.user.name}</a>{" "}
                          <small>
                            <i>{formatDate(detail.user.createdAt)}</i>
                          </small>
                        </h6>
                        <p>{data}</p>
                        <button class="btn btn-sm btn-light">Reply</button>
                      </div>
                    </div>
                  ))}
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <li
                      class={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                    ></li>
                    {Array.from({
                      length: Math.ceil(
                        detail.comments.length / POSTS_PER_PAGE
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
                        Math.ceil(detail.comments.length / POSTS_PER_PAGE)
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

            <div class="bg-secondary p-5 ">
              <h2 class="mb-4">Leave a comment</h2>
              <form onSubmit={addComment}>
                <div class="row g-3">
                  <div class="col-12 col-sm-6">
                    <input
                      type="text"
                      class="form-control bg-white border-0"
                      placeholder="Your Name"
                      value={UserData.name}
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <input
                      type="email"
                      class="form-control bg-white border-0"
                      placeholder="Your Email"
                      value={UserData.email}
                      style={{ height: "55px" }}
                    />
                  </div>

                  <div class="col-12">
                    <textarea
                      class="form-control bg-white border-0"
                      rows="5"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div class="col-12">
                    <button class="btn btn-primary w-100 py-3" type="submit">
                      Leave Your Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

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

            <div class="mb-5">
              <img src={Blog1} alt="" class="img-fluid" />
            </div>

            <div class="mb-5">
              <h2 class="mb-4">Tag Cloud</h2>
              <div class="d-flex flex-wrap m-n1">
                <a href="" class="btn btn-secondary m-1">
                  Design
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Development
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Marketing
                </a>
                <a href="" class="btn btn-secondary m-1">
                  SEO
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Writing
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Consulting
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Design
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Development
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Marketing
                </a>
                <a href="" class="btn btn-secondary m-1">
                  SEO
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Writing
                </a>
                <a href="" class="btn btn-secondary m-1">
                  Consulting
                </a>
              </div>
            </div>

            <div>
              <h2 class="mb-4">Plain Text</h2>
              <div class="bg-secondary text-center" style={{ padding: "30px" }}>
                <p>
                  Vero sea et accusam justo dolor accusam lorem consetetur,
                  dolores sit amet sit dolor clita kasd justo, diam accusam no
                  sea ut tempor magna takimata, amet sit et diam dolor ipsum
                  amet diam
                </p>
                <a href="" class="btn btn-primary rounded-pill py-2 px-4">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Detail;
