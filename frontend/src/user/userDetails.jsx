import React from "react";
import blog1 from "../img/blog-1.jpg";
import { useSelector } from "react-redux";

function Blog() {
  const UserData = useSelector((state) => state.user.session);
  console.log(UserData);

  return (
    <>
    
      <div class="container-fluid py-6 px-5">
        <div class="row g-5">
          <div class="col-lg-4">
            <div className=" bg-secondary text-center">
              <img src={UserData.image} alt="" class="img-fluid mt-4 " style={{ borderRadius:'50%' , width: '50%'}} />
            </div>

            <div>
              <div class="bg-secondary text-center" style={{ padding: "30px" }}>
                <p>
                  {UserData.name}
                  <br/>
                  {UserData.email}
                </p>
                <a href="" class="btn btn-primary rounded-pill py-2 px-4">
                 edit
                </a>
              </div>
            </div>

            <div class="mb-5">
              <h2 class="mb-4">Categories</h2>
              <div class="d-flex flex-column justify-content-start bg-secondary p-4">
                <a class="h5 mb-3" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Web Design
                </a>
                <a class="h5 mb-3" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Web
                  Development
                </a>
                <a class="h5 mb-3" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Web
                  Development
                </a>
                <a class="h5 mb-3" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Keyword
                  Research
                </a>
                <a class="h5" href="#">
                  <i class="bi bi-arrow-right text-primary me-2"></i>Email
                  Marketing
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <div class="row g-5">
              <div class="col-xl-6 col-lg-12 col-md-6">
                <div class="blog-item">
                  <div class="position-relative overflow-hidden">
                    <img class="img-fluid" src={blog1} alt="" />
                  </div>
                  <div class="bg-secondary d-flex">
                    <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                      <span>01</span>
                      <h5 class="text-uppercase m-0">Jan</h5>
                      <span>2045</span>
                    </div>
                    <div class="d-flex flex-column justify-content-center py-3 px-4">
                      <div class="d-flex mb-2">
                        <small class="text-uppercase me-3">
                          <i class="bi bi-person me-2"></i>Admin
                        </small>
                        <small class="text-uppercase me-3">
                          <i class="bi bi-bookmarks me-2"></i>Web Design
                        </small>
                      </div>
                      <a class="h4" href="">
                        Magna sea dolor ipsum amet lorem eos
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-6 col-lg-12 col-md-6">
                <div class="blog-item">
                  <div class="position-relative overflow-hidden">
                    <img class="img-fluid" src={blog1} alt="" />
                  </div>
                  <div class="bg-secondary d-flex">
                    <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                      <span>01</span>
                      <h5 class="text-uppercase m-0">Jan</h5>
                      <span>2045</span>
                    </div>
                    <div class="d-flex flex-column justify-content-center py-3 px-4">
                      <div class="d-flex mb-2">
                        <small class="text-uppercase me-3">
                          <i class="bi bi-person me-2"></i>Admin
                        </small>
                        <small class="text-uppercase me-3">
                          <i class="bi bi-bookmarks me-2"></i>Web Design
                        </small>
                      </div>
                      <a class="h4" href="">
                        Magna sea dolor ipsum amet lorem eos
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-12 col-md-6">
                <div class="blog-item">
                  <div class="position-relative overflow-hidden">
                    <img class="img-fluid" src={blog1} alt="" />
                  </div>
                  <div class="bg-secondary d-flex">
                    <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                      <span>01</span>
                      <h5 class="text-uppercase m-0">Jan</h5>
                      <span>2045</span>
                    </div>
                    <div class="d-flex flex-column justify-content-center py-3 px-4">
                      <div class="d-flex mb-2">
                        <small class="text-uppercase me-3">
                          <i class="bi bi-person me-2"></i>Admin
                        </small>
                        <small class="text-uppercase me-3">
                          <i class="bi bi-bookmarks me-2"></i>Web Design
                        </small>
                      </div>
                      <a class="h4" href="">
                        Magna sea dolor ipsum amet lorem eos
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
