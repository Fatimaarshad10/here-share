import React, { useEffect } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchLatestPost } from "../store/redux/authSlice";
function LatestUser() {
  const dispatch = useDispatch();
  const latestPost = useSelector((state) => state.user.latestPost);

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
  return (
    <>
      {latestPost ? (
        <div class="container-fluid py-6 px-5">
          <div class="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
            <h1 class="display-5 mb-0">Latest Blog latestPost</h1>
            <hr class="w-25 mx-auto bg-primary" />
          </div>
          <div class="row g-5">
            <div class="col-lg-4">
              <div class="blog-item">
                <div
                  class="position-relative overflow-hidden"
                  style={{ height: "40vh", objectFit: "cover" }}
                >
                  <img class="img-fluid" src={latestPost[0].image} alt="" />
                </div>
                <div class="bg-secondary d-flex">
                  <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                    <h5 class="text-uppercase m-0">
                      {formatDate(latestPost[0].createdAt)}
                    </h5>
                  </div>
                  <div class="d-flex flex-column justify-content-center py-3 px-4">
                    <div class="d-flex mb-2">
                      <small class="text-uppercase me-3">
                        <i class="bi bi-person me-2"></i>
                        {latestPost[0].user.name}
                      </small>
                    </div>
                    <a class="h4" href="">
                      {latestPost[0].title}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="blog-item">
                <div
                  class="position-relative overflow-hidden"
                  style={{ height: "40vh", objectFit: "cover" }}
                >
                  <img class="img-fluid" src={latestPost[1].image} alt="" />
                </div>
                <div class="bg-secondary d-flex">
                  <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                    <h5 class="text-uppercase m-0">
                      {formatDate(latestPost[1].createdAt)}
                    </h5>
                  </div>
                  <div class="d-flex flex-column justify-content-center py-3 px-4">
                    <div class="d-flex mb-2">
                      <small class="text-uppercase me-3">
                        <i class="bi bi-person me-2"></i>
                        {latestPost[1].user.name}
                      </small>
                    </div>
                    <a class="h4" href="">
                      {latestPost[1].title}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="blog-item">
                <div
                  class="position-relative overflow-hidden"
                  style={{ height: "40vh" }}
                >
                  <img class="img-fluid" src={latestPost[2].image} alt="" />
                </div>
                <div class="bg-secondary d-flex">
                  <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                    <h5 class="text-uppercase m-0">
                      {formatDate(latestPost[2].createdAt)}
                    </h5>
                  </div>
                  <div class="d-flex flex-column justify-content-center py-3 px-4">
                    <div class="d-flex mb-2">
                      <small class="text-uppercase me-3">
                        <i class="bi bi-person me-2"></i>
                        {latestPost[2].user.name}
                      </small>
                    </div>
                    <a class="h4" href="">
                      {latestPost[2].title}
                    </a>
                  </div>
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

export default LatestUser;
