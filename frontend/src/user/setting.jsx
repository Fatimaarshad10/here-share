import React  ,{useState , useEffect}from "react";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const UpdateProducts = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    const response = await fetch(`http://localhost:3000/user/${UserData._id}`, {
      method: "PUT",
      body: data,
    });
    const json = await response.json();
    dispatch(Success(json));
    if (response.ok) {
      toast.success('Successfully User Is Updated!', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  };
  useEffect(() => {
    if (UserData) {
      setEmail(UserData.email);
      setPassword(UserData.password);
    }
  }, []);
  const deleteUser = async () => {
    const res = await fetch(`http://localhost:3000/user/${UserData._id}`, {
      method: "DELETE",
    });
    const p = await res.json();
    console.log(p);
    dispatch(Success((p)))
    if(res.ok){
    navigate("/register");

    }

  };
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
                       width:'auto', 
                       maxHeight:'50%', 
                        maxWidth:'50%',
                        
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

                      <Link to="/update">
                        <a
                          class="btn bg-secondary  text-primary rounded-pill py-2 px-4"
                          href="#"
                        >
                          Update
                        </a>
                      </Link>
                      <Link to="/setting">
                        <a
                          class=" btn bg-secondary  text-primary  rounded-pill py-2 px-4"
                          href="#"
                        >
                          Setting
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-7 col-sm-9 py-6 px-5 mx-auto mt-3 ">
                  <div class="input-group  ">
                    <button class="btn btn-secondary b-3" type="button">
                      Email
                    </button>
                    <input
                      type="email"
                      class="form-control bg-white border-0 mb-3"
                      placeholder="Your Email" 
                       value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "55px" }}
                    />
                  </div>
                  <div class="input-group ">
                    <button class="btn  btn-secondary mt-2" type="button">
                      Password
                    </button>
                    <input
                      type="password"
                      
                      onChange={(e) => setPassword(e.target.value)}
                      class="form-control bg-white border-0 mt-2 "
                      placeholder="New password"
                      style={{ height: "55px" }}
                    />
                  </div>

                  <button class="btn btn-secondary w-100 py-3 mt-4" type="submit" onClick={UpdateProducts}>
                    Save
                  </button>
                  <p className="text-center mt-4 text-primary">OR</p>
                  <p className="mt-3 text-primary">Delete your account</p>
                  <p className="text-primary">
                    Once you click the delete button, all your data will be
                    lost.
                  </p>
                  <button class="btn btn-secondary  w-100 py-3 mt-4" type="submit" onClick={deleteUser}>
                    Eliminate
                  </button>
                  
                </div>
<ToastContainer />

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
