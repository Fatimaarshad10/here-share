import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import addImage from "../img/add_post.png";
import axios from "axios";
import { Link } from "react-router-dom";
function Blog() {
  const UserData = useSelector((state) => state.user.session);
  console.log(UserData);
  const [post, setPost] = useState("");
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
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(dateString).toLocaleString("en-US", options);
  }

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
            <div className=" bg-secondary text-center mt-2">
              <h1>Add post </h1>
              <Link to="/post/create">
                <img src={addImage} alt="add_image" width={200} />
              </Link>
            </div>
          </div>
          {post ? (
            <>
              <div class="col-lg-8">
                <div class="row g-5">
                  {post.map((data) => (
                    <div class="col-xl-6 col-lg-12 col-md-6">
                      <div class="blog-item">
                        <div
                          class="position-relative overflow-hidden"
                          style={{ height: "35vh" }}
                        >
                          <img class="img-fluid" src={data.image} alt="" />
                        </div>

                        <div class="bg-secondary d-flex" key={data._id}>
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
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
