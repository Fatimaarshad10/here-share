import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import blog1 from '../img/blog-1.jpg'
function Blog() {
    const UserData = useSelector((state) => state.user.session);
  console.log(UserData);
  const [post, setPost] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:4000/post")
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(post);
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
            {/* <!-- Blog list Start --> */}
            {post ? (
            <>
            <div class="col-lg-8">
                <div class="row g-5">
                {post.map((data) => (
                    <div class="col-xl-6 col-lg-12 col-md-6" key={data._id}>
                        <div class="blog-item">
                            <div class="position-relative overflow-hidden" style={{  height: '35vh'}}>
                                <img class="img-fluid" src={data.image} alt=""/>
                            </div>
                            <div class="bg-secondary d-flex">
                                <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                                   
                                    <span>{formatDate(data.createdAt)}</span>
                                </div>
                                <div class="d-flex flex-column justify-content-center py-3 px-4">
                                    <div class="d-flex mb-2">
                                        <small class="text-uppercase me-3"><i class="bi bi-person me-2"></i>{data.user.name}</small>
                                    </div>
                                    <a class="h4" href="">{data.title}</a>
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
            {/* <!-- Blog list End --> */}
            {/* <!-- Sidebar Start --> */}
            <div class="col-lg-4">
                {/* <!-- Search Form Start --> */}
                <div class="mb-5">
                    <div class="input-group">
                        <input type="text" class="form-control p-3" placeholder="Keyword"/>
                        <button class="btn btn-primary px-4"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                {/* <!-- Search Form End --> */}

                {/* <!-- Category Start --> */}
                <div class="mb-5">
                    <h2 class="mb-4">Categories</h2>
                    <div class="d-flex flex-column justify-content-start bg-secondary p-4">
                        <a class="h5 mb-3" href="#"><i class="bi bi-arrow-right text-primary me-2"></i>Web Design</a>
                        <a class="h5 mb-3" href="#"><i class="bi bi-arrow-right text-primary me-2"></i>Web Development</a>
                        <a class="h5 mb-3" href="#"><i class="bi bi-arrow-right text-primary me-2"></i>Web Development</a>
                        <a class="h5 mb-3" href="#"><i class="bi bi-arrow-right text-primary me-2"></i>Keyword Research</a>
                        <a class="h5" href="#"><i class="bi bi-arrow-right text-primary me-2"></i>Email Marketing</a>
                    </div>
                </div>
                {/* <!-- Category End --> */}

                {/* <!-- Recent Post Start --> */}
                <div class="mb-5">
                    <h2 class="mb-4">Recent Post</h2>
                    <div class="d-flex mb-3">
                        <img class="img-fluid" src={blog1} style={{width: '100px', height: '100px', objectFit: 'cover'}} alt=""/>
                        <a href="" class="h5 d-flex align-items-center bg-secondary px-3 mb-0">Lorem ipsum dolor sit amet adipis elit
                        </a>
                    </div>
                    <div class="d-flex mb-3">
                    <img class="img-fluid" src={blog1} style={{width: '100px', height: '100px', objectFit: 'cover'}} alt=""/>

                        <a href="" class="h5 d-flex align-items-center bg-secondary px-3 mb-0">Lorem ipsum dolor sit amet adipis elit
                        </a>
                    </div>
                    <div class="d-flex mb-3">
                    <img class="img-fluid" src={blog1} style={{width: '100px', height: '100px', objectFit: 'cover'}} alt=""/>

                        <a href="" class="h5 d-flex align-items-center bg-secondary px-3 mb-0">Lorem ipsum dolor sit amet adipis elit
                        </a>
                    </div>
                    <div class="d-flex mb-3">
                    <img class="img-fluid" src={blog1} style={{width: '100px', height: '100px', objectFit: 'cover'}} alt=""/>

                        <a href="" class="h5 d-flex align-items-center bg-secondary px-3 mb-0">Lorem ipsum dolor sit amet adipis elit
                        </a>
                    </div>
                    <div class="d-flex">
                    <img class="img-fluid" src={blog1} style={{width: '100px', height: '100px', objectFit: 'cover'}} alt=""/>

                        <a href="" class="h5 d-flex align-items-center bg-secondary px-3 mb-0">Lorem ipsum dolor sit amet adipis elit
                        </a>
                    </div>
                </div>
                {/* <!-- Recent Post End --> */}

                {/* <!-- Image Start --> */}
                <div class="mb-5">
                    <img src={blog1} alt="" class="img-fluid"/>
                </div>
                {/* <!-- Image End --> */}

                {/* <!-- Tags Start --> */}
                <div class="mb-5">
                    <h2 class="mb-4">Tag Cloud</h2>
                    <div class="d-flex flex-wrap m-n1">
                        <a href="#flex" class="btn btn-secondary m-1">Design</a>
                        <a href="#flex" class="btn btn-secondary m-1">Development</a>
                        <a href="#flex" class="btn btn-secondary m-1">Marketing</a>
                        <a href="#flex" class="btn btn-secondary m-1">SEO</a>
                        <a href="#flex" class="btn btn-secondary m-1">Writing</a>
                        <a href="#flex" class="btn btn-secondary m-1">Consulting</a>
                        <a href="#flex" class="btn btn-secondary m-1">Design</a>
                        <a href="#flex" class="btn btn-secondary m-1">Development</a>
                        <a href="#flex" class="btn btn-secondary m-1">Marketing</a>
                        <a href="#flex" class="btn btn-secondary m-1">SEO</a>
                        <a href="#flex" class="btn btn-secondary m-1">Writing</a>
                        <a href="#flex" class="btn btn-secondary m-1">Consulting</a>
                    </div>
                </div>
                {/* <!-- Tags End --> */}

                {/* <!-- Plain Text Start --> */}
                <div>
                    <h2 class="mb-4">Plain Text</h2>
                    <div class="bg-secondary text-center" style={{padding: '30px'}}>
                        <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet sit et diam dolor ipsum amet diam</p>
                        <a href="" class="btn btn-primary rounded-pill py-2 px-4">Read More</a>
                    </div>
                </div>
                {/* <!-- Plain Text End --> */}
            </div>
            {/* <!-- Sidebar End --> */}
        </div>
    </div>
    {/* <!-- Blog End --> */}

               

              
    </>
  )
}

export default Blog