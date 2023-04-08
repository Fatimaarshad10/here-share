import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

function Setting() {
  const navigate = useNavigate();

  const UserData = useSelector((state) => state.user.session);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { id } = useParams();

  const PostDetail = async () => {
    const response = await fetch(`http://localhost:4000/post/data/${id}`, {
      method: "GET",
    });
    const json = await response.json();
    setTitle(json.title);
    setImage(json.image);
    setDescription(json.description);
  };

  const UpdateProducts = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", image);
    data.append("title", title);
    data.append("description", description);

    const response = await fetch(`http://localhost:3000/post/${id}`, {
      method: "PUT",
      body: data,
    });
    const json = await response.json();
    if (response.ok) {
      PostDetail();
      setTimeout(() => {
        navigate("/user/detail");
      }, 1000);
      toast.success("Successfully post is updated", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const submitHandler = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    PostDetail();
  }, []);

  return (
    <div>
      <div className="justify-content-center">
        <div className="bg-secondary p-5 ">
          <div className="container-sm">
            <form>
              <div className="row g-3">
                <div className="col-lg-4">
                  <div className=" bg-secondary text-center">
                    <img
                      src={UserData.image}
                      alt=""
                      className="img-fluid mt-4 "
                      style={{
                        width: "auto",
                        maxHeight: "50%",
                        maxWidth: "50%",
                      }}
                    />
                  </div>

                  <div>
                    <div
                      className="btn-secondary  text-center mt-4"
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

                <div className="col-12  col-md-6 col-sm-9 mx-auto ">
                  <div className="wrapper">
                    <div className="container">
                      <div className="upload-container">
                        <div className="border-container">
                          <div className="icons fa-4x">
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

                  <div className="input-group ">
                    <button className="btn btn-secondary  mt-4" type="button">
                      Title
                    </button>
                    <input
                      type="title"
                      className="form-control bg-white border-0 mt-4"
                      placeholder="Title"
                      style={{ height: "55px" }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="input-group ">
                    <button className="btn btn-secondary  mt-4" type="button">
                      Description
                    </button>
                    <textarea
                      className="form-control bg-white border-0 mt-4"
                      rows="5"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="btn btn-secondary w-100 py-3 mt-4"
                    type="submit"
                    onClick={UpdateProducts}
                  >
                    Save
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

export default Setting;
