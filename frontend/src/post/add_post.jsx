import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function AddPost() {
  const navigate = useNavigate();
  const { id } = useParams();

  const UserData = useSelector((state) => state.user.session);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [errors, setErrors] = useState({});

  const add_post = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);

    // Check for errors
    const newErrors = {};
    if (!title) {
      toast.success("title is required");
    }
    if (!description) {
      toast.success("Description is required");
    }
    if (!image) {
      toast.success("Image is required");
    }
    setErrors(newErrors);

    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      const response = await fetch(`http://localhost:3000/post/create/${id}`, {
        method: "POST",
        body: data,
      });
      const json = await response.json();
      if (response.ok) {
        setTimeout(() => {
          navigate("/user/detail");
        }, 1000);
        toast.success("Successfully post is added ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };
  const submitHandler = (e) => {
    setImage(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <div className="justify-content-center">
        <div class="bg-secondary p-5 ">
          <div className="container-sm">
            <form>
              <div class="row g-3">
                <div class="col-lg-4">
                  <div className="bg-secondary text-center">
                    <img
                      src={UserData.image}
                      alt=""
                      class="img-fluid mt-4 "
                      style={{
                        width: "auto",
                        maxHeight: "50%",
                        maxWidth: "50%",
                      }}
                    />
                  </div>

                  <div>
                    <div
                      class="btn-secondary text-center mt-4"
                      style={{ padding: "30px" }}
                    >
                      <p>
                        {" "}
                        <br />
                        {UserData.name}
                        <br /> {UserData.email}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="col-12  col-md-6 col-sm-9 mx-auto ">
                  <div class="wrapper">
                    <div class="container">
                      <div class="upload-container">
                        <div class="border-container">
                          <div class="icons fa-4x">
                            {selectedImage ? (
                              <img src={selectedImage} alt="" width={100} />
                            ) : (
                              <img src={image} alt="" width={100} />
                            )}
                          </div>
                          <input
                            required
                            type="file"
                            id="file-upload"
                            onChange={submitHandler}
                            style={{ marginTop: "15px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="input-group ">
                    <button class="btn btn-secondary mt-4" type="button">
                      Title
                    </button>
                    <input
                      type="name"
                      class="form-control bg-white border-0 mt-4"
                      style={{ height: "55px" }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div class="input-group ">
                    <button
                      class="btn btn-secondary mt-4"
                      type="button"
                      maxLength={10}
                    >
                      Description
                    </button>
                    <textarea
                      class="form-control bg-white border-0 mt-4"
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    class="btn btn-secondary w-100 py-3 mt-4"
                    type="submit"
                    onClick={add_post}
                  >
                    Add post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddPost;
