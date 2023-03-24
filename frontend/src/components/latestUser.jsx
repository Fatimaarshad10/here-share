import Blog1 from '../img/blog-1.jpg'
import Blog2 from '../img/blog-2.jpg'
import Blog3 from '../img/blog-3.jpg'
import '../css/bootstrap.min.css'
import '../css/main.css'
import React, { useState, useEffect } from "react";
import axios from "axios";
function LatestUser() {
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
{post ? (
   <div class="container-fluid py-6 px-5">
        <div class="text-center mx-auto mb-5" style={{maxWidth: '600px'}}>
            <h1 class="display-5 mb-0">Latest Blog Post</h1>
            <hr class="w-25 mx-auto bg-primary"/>
        </div>
        <div class="row g-5">
            <div class="col-lg-4">
                <div class="blog-item">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid" src={post[0].image} alt=""/>
                    </div>
                    <div class="bg-secondary d-flex">
                        <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                            <span>{formatDate(post[0].createdAt)}</span>
                        </div>
                        <div class="d-flex flex-column justify-content-center py-3 px-4">
                            <div class="d-flex mb-2">
                                <small class="text-uppercase me-3"><i class="bi bi-person me-2"></i>{post[0].user.name}</small>
                            </div>
                            <a class="h4" href="">{post[0].title}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-item">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid"src={post[1].image} alt=""/>
                    </div>
                    <div class="bg-secondary d-flex">
                        <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                            <h5 class="text-uppercase m-0">{formatDate(post[1].createdAt)}</h5>
                        </div>
                        <div class="d-flex flex-column justify-content-center py-3 px-4">
                            <div class="d-flex mb-2">
                                <small class="text-uppercase me-3"><i class="bi bi-person me-2"></i>{post[1].user.name}</small>
                            </div>
                            <a class="h4" href="">{post[1].title}</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog-item">
                    <div class="position-relative overflow-hidden">
                        <img class="img-fluid" src={post[2].image} alt=""/>
                    </div>
                    <div class="bg-secondary d-flex">
                        <div class="flex-shrink-0 d-flex flex-column justify-content-center text-center bg-primary text-white px-4">
                            <h5 class="text-uppercase m-0">{formatDate(post[2].createdAt)}</h5>
                        </div>
                        <div class="d-flex flex-column justify-content-center py-3 px-4">
                            <div class="d-flex mb-2">
                                <small class="text-uppercase me-3"><i class="bi bi-person me-2"></i>{post[2].user.name}</small>
                            </div>
                            <a class="h4" href="">{post[2].title}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  ):(<>

  </>)}
  </>

  )
}

export default LatestUser