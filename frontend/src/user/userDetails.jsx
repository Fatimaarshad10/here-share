import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import addImage from "../img/icons8-add-file-64.png";
import updateImage from "../img/icons8-update-50.png";
import deleteImage from "../img/icons8-close-48.png";
import readMore from "../img/icons8-more-24.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/main.css'
function Blog() {
  const UserData = useSelector((state) => state.user.session);
  const navigate = useNavigate();

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
  const deletePost = async (id) => {
    const res = await fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
    });
    const p = await res.json();
    if (res.ok) {
      const newPost = post.filter((p) => p._id !== id);
      setPost(newPost);
      navigate("/user/detail");
    } else {
    }
  };
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
  return (
    <>
      <div class="container-fluid py-6 px-5">
        <div class="row g-5">
          <div class="col-lg-4">
            <div className=" bg-secondary text-center ">
              <img
                src={UserData.image}
                alt=""
                class="img-fluid mt-4"
                style={{
                  width: "auto",
                  maxHeight: "50%",
                  maxWidth: "50%",
                }}
              />
            </div>

            <div>
              <div
                class="bg-primary text-center bg-secondary mt-4"
                style={{ padding: "30px" }}
              >
                <p className="text-uppercase ">{UserData.name}</p>
                <p>{UserData.email}</p>
                <p>
                  {UserData.detail === 'undefine' ? (
                    <>
                
                  </>
                  ):(
<>
{UserData.detail.split(" ").slice(0, 30).join(" ")}
                  {UserData.detail.split(" ").length > 30 ? "..." : ""}
</>
                  )}
                </p>
              </div>
            </div>
          </div>
          {post.length !== 0 ? (
            <>
              <div class="col-lg-8">
                <div class="row g-5">
                  {post
                    .slice(
                      (currentPage - 1) * POSTS_PER_PAGE,
                      currentPage * POSTS_PER_PAGE
                    )
                    .map((data) => (
                      <>
                       
                        <div class="col-xl-6 col-lg-12 col-md-6" key={data._id}>
                          <div class="blog-item">
                            <div
                              class="team-item position-relative overflow-hidden"
                              style={{ height: "35vh" }}
                            >
                               
                                <span className="position-absolute bg-secondary ">
                                      
                                      
                                    </span>
                              <img class="img-fluid" src={data.image} alt="" />
                              <div class="team-text w-100 position-absolute top-0 text-center bg-secondary  p-4">
                              <Link to={`/post/update/${data._id}`} >
                                        {" "}
                                        <img
                                          src={updateImage}
                                          alt="add_image "
                                          width={20}
                                        />{" "}
                                      </Link>
                                      <Link className="ms-2">
                                        {" "}
                                        <img
                                      
                                          src={deleteImage}
                                          alt="add_image"
                                          width={20}
                                          onClick={() => deletePost(data._id)}
                                        />{" "}
                                      </Link>
                      </div>

                            </div>

                            <div class="bg-secondary d-flex">
                              <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary px-4">
                                <span>{formatDate(data.createdAt)}</span>
                              </div>
                              <div class="d-flex flex-column justify-content-center py-3 px-4">
                                <div class="d-flex mb-2">
                                  <small class="text-uppercase me-3 text-primary">
                                    <i class="bi bi-person me-2 text-primary "></i>
                                    {data.user.name}
                                    

                                  
                                  </small>
                                </div>
                              
                                <a
                                  class="h5  text-primary"
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
                                <Link to={`/detail/${data._id}`} className=" text-primary">
                                  More{" "}
                                  <img
                                    src={readMore}
                                    alt="read_more_image"
                                    width={20}
                                  />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}

                  <div
                    class="col-xl-5 col-lg-12 col-md-6 bg-secondary ms-4 "
                    style={{ width: "22.3rem" }}
                  >
                    <div
                      class="blog-item text-center"
                      style={{ marginTop: "6rem", height: "35vh" }}
                    >
                      <Link to={`/post/create/${UserData._id}`}>
                        <img src={addImage} alt="add_image" width={120} />
                      </Link>
                    </div>
                  </div>
                  {post.length > 0 && (
                    <nav aria-label="Page navigation example">
                      <ul class="pagination justify-content-center">
                        <li
                          class={`page-item  bg-primary text-white border-0 ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        ></li>
                        {Array.from({
                          length: Math.ceil(post.length / POSTS_PER_PAGE),
                        }).map((_, index) => (
                          <li
                            key={index}
                            class={`page-item  bg-primary text-white border-0 ${
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
                          class={`page-item  bg-primary text-white border-0${
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
            <div class="col-lg-8">
              <div class="row g-5 text-center" style={{ marginTop: "8rem" }}>
                <div className="">
                  <Link to={`/post/create/${UserData._id}`}>
                    <img src={addImage} alt="add_image" width={70} />
                  </Link>
                  <h1>Share blogs</h1>
                  <p>When you share blog , they will appear on your profile.</p>
                  <Link to={`/post/create/${UserData._id}`} className="text-primary ">
                    Share your first blog{" "}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Blog;
