import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestPost, fetchAllPost } from "../store/redux/authSlice";

function Blog() {
  const dispatch = useDispatch();

  const latestPost = useSelector((state) => state.user.latestPost);
  const AllPost = useSelector((state) => state.user.AllPost);

  useEffect(() => {
    dispatch(fetchLatestPost());
    dispatch(fetchAllPost());
  }, [dispatch]);

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
          {AllPost ? (
            <>
              <div class="col-lg-8">
                <div class="row g-5">
                  {AllPost.map((data) => (
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

            {latestPost ? (
              <div class="mb-5">
                <h2 class="mb-4">Recent Post</h2>
                {latestPost.map((data) => (
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
                      {data.description}
                    </a>
                  </div>
                ))}
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
