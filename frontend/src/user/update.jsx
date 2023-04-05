import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Success } from "../store/redux/authSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Setting() {
  const UserData = useSelector((state) => state.user.session);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");

  const [name, setName] = useState("");
  const [admin, setAdmin] = useState("");
  const [detail, setDetail] = useState("");

  const [image, setImage] = useState(null);
  const UpdateProducts = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", image);
    data.append("name", name);
    data.append("admin", admin);
    data.append("detail", detail);

    const response = await fetch(`http://localhost:3000/user/${UserData._id}`, {
      method: "PUT",
      body: data,
    });
    const json = await response.json();
    dispatch(Success(json));
    if (response.ok) {
      setTimeout(() => {
        navigate("/user/detail");
      }, 1000);
      toast.success('Successfully User Is Updated!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };
  const submitHandler = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };
  useEffect(() => {
    if (UserData) {
      setName(UserData.name);
      setAdmin(UserData.admin);
      setImage(UserData.image);
      setDetail(UserData.detail);
    }
  }, []);

 
  return (
    <div>
      <div className="justify-content-center">
        <div class="bg-secondary p-5 ">
          <div className="container-sm">
            <form>
              <div class="row g-3">
                <div class="col-lg-4">
                  <div className=" bg-secondary  text-center">
                    <img
                      src={UserData.image}
                      alt=""
                      class="img-fluid mt-4 "
                      style={{
                       width:'auto', 
                       maxHeight:'50%', 
                        maxWidth:'50%',
                        
                      }}
                    />
                  </div>

                  <div>
                    <div
                      class=" bg-primary text-center  mt-4"
                      style={{ padding: "30px" }}
                    >
                      <p>
                        {" "}
                       
                        <br/>
                        {UserData.name}
                        <br /> {UserData.email}{" "}
                      </p>

                      <Link to="/update">
                        <a
                          class="btn  bg-secondary  text-primary rounded-pill py-2 px-4"
                          href="#"
                        >
                          Update
                        </a>
                      </Link>
                      <Link to="/setting">
                        <a
                          class=" btn bg-secondary  text-primary rounded-pill py-2 px-4"
                          href="#"
                        >
                          Setting
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="col-12  col-md-6 col-sm-9 mx-auto ">
                 
                    <div class="wrapper">
                      <div class="container">
                        <div class="upload-container">
                          <div class="border-container">
                          <div className="icons fa-4x">
          {selectedImage ? (
            <img src={selectedImage} alt="" width={100} />
          ) : (
            <img src={UserData.image} alt="" width={100} />
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
                    <button class="btn  btn-primary mt-4" type="button">
                      Name
                    </button>
                    <input
                      type="name"
                      class="form-control bg-white border-0 mt-4"
                      placeholder="Phone number"
                      style={{ height: "55px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-check form-check-inline mt-4">
  <input
    required
    className="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault1"
    value="admin"
    onChange={(e) => setAdmin(e.target.value)}
  />
  <label className="form-check-label text-primary" htmlFor="flexRadioDefault1">
    Admin
  </label>
</div>
<div className="form-check form-check-inline mt-4">
  <input
    required
    className="form-check-input"
    type="radio"
    name="flexRadioDefault"
    id="flexRadioDefault2"
    value="user"
    onChange={(e) => setAdmin(e.target.value)}
  />
  <label className="form-check-label  text-primary" htmlFor="flexRadioDefault2">
    User
  </label>
</div>

                  <div class="input-group ">
                    <button class="btn  btn-primary mt-4" type="button" maxLength={10}>
                      Detail
                    </button>
                    <textarea
                      class="form-control bg-white border-0 mt-4"
                      rows="5"
                      placeholder="Detail"
                      value={detail}
                      onChange={(e) => setDetail(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    class="btn btn-primary w-100 py-3 mt-4"
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
