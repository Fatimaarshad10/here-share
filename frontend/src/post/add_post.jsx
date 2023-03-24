import React, { useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../img/Untitled design.png";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";

function AddPost() {
  const UserData = useSelector((state) => state.user.session);
  console.log(UserData);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const add_post = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("image", image);

    const response = await fetch(
      `http://localhost:3000/post/create/${UserData._id}`,
      {
        method: "POST",
        body: data,
      }
    );
    const json = await response.json();
    console.log(json.data);
    if (response.ok) {
      toast.success("Successfully post is added ", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const submitHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const Container = styled.div`
    .wrapper {
      margin: auto;
      max-width: 300px;
      text-align: center;
    }

    .container {
      background-color: #f9f9f9;
      padding: 10px;
      border-radius: 10px;
    }

    .upload-container {
      background-color: rgb(239, 239, 239);
      border-radius: 6px;
      padding: 5px;
    }

    .border-container {
      border: 5px dashed rgb(243, 82, 90);
      padding: 20px;
    }
    .icons {
      color: #95afc0;
      opacity: 0.55;
    }
  `;
  return (
    <div>
      <div className="justify-content-center">
        <div class="bg-secondary p-5 ">
          <div className="container-sm">
            <form>
              <div class="row g-3">
                <div class="col-lg-4">
                  <div className=" bg-secondary text-center">
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
                      class="bg-secondary text-center"
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
                  <Container>
                    <div class="wrapper">
                      <div class="container">
                        <div class="upload-container">
                          <div class="border-container">
                            <div class="icons fa-4x">
                              <img src={Profile} alt="" width={100} />
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
                  </Container>

                  <div class="input-group ">
                    <button class="btn  btn-primary mt-4" type="button">
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
                      class="btn  btn-primary mt-4"
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
                    class="btn btn-primary w-100 py-3 mt-4"
                    type="submit"
                    onClick={add_post}
                  >
                    Add post
                  </button>
                  <ToastContainer />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
