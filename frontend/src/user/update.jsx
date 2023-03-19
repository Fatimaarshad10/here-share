import React , {useState , useEffect}from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Success } from "../store/redux/authSlice";

function Setting() {
  const UserData = useSelector((state) => state.user.session);
console.log(UserData)
const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState("");
  const [detail, setDetail] = useState("");
  
  const [image, setImage] = useState(null);
    const UpdateProducts = async (e ) => {
      e.preventDefault()
      
      const data = new FormData()
      data.append('image', image)
      data.append('name', name)     
      data.append('email',email)
      data.append('password',password)  
      data.append('admin',admin)   
      data.append('detail',detail)   

      const response = await fetch(`http://localhost:3000/user/${UserData._id}`, {
        method: "PUT",
        body: data 
      });
      const json = await response.json();
      dispatch(Success(json))

      if (response.ok) {
     
  console.log('data is right')
      }
      
       
    };
    const submitHandler = (e) => {
      setImage(e.target.files[0]);
    };
    useEffect(() => {
  if(UserData){
    setEmail(UserData.email)
    setName(UserData.name)
    setPassword(UserData.password)
    setAdmin(UserData.admin)
    setImage(UserData.image)
    setDetail(UserData.detail)

  }
    }, [])
    
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
      border: 5px dashed rgba(198, 198, 198, 0.65);
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
            <form >
              <div class="row g-3">
                <div class="col-lg-4">
                  <div className=" bg-secondary text-center">
                    <img
                      src={UserData.image}
                      alt=""
                      class="img-fluid mt-4 "
                      style={{
                        borderRadius: "50%",
                        width: "50%",
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
                        {UserData.name}
                        <br /> {UserData.email}{" "}
                      </p>

                      <Link to="/update">
                        <a
                          class="btn btn-primary rounded-pill py-2 px-4"
                          href="#"
                        >
                          Update
                        </a>
                      </Link>
                      <Link to="/setting">
                        <a
                          class=" btn btn-primary rounded-pill py-2 px-4"
                          href="#"
                        >
                          Setting
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>

                <div class="col-12  col-md-6 col-sm-9 mx-auto ">
                <input
              type="file"
              onChange={submitHandler}
             style={{marginTop:'15px'}}
             
            />
                  <input
                    type="email"
                    class="form-control bg-white border-0 mt-2 "
                    placeholder="Your Name"
                    value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    style={{ height: "55px" }}
                  />
                  <input
                    type="name"
                    class="form-control bg-white border-0 mt-4"
                    placeholder="Phone number"
                    style={{ height: "55px" }}
                    value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                   <input
                    type="password"
                    class="form-control bg-white border-0 mt-4"
                    placeholder="Phone number"
                    style={{ height: "55px" }}
                    value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <div class="form-check form-check-inline mt-4">
                    <input
                      required
                      class="form-check-input "
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      value="admin"
                      onChange={(e) => setAdmin(e.target.value)}
                    />
                    Admin
                  </div>
                  <div class="form-check form-check-inline mt-4">
                    <input
                      required
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault2"
                      value="user"
                      onChange={(e) => setAdmin(e.target.value)}

                    />
                    User
                  </div>
                  <textarea
                    class="form-control bg-white border-0 mt-4"
                    rows="5"
                    placeholder="Detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                  ></textarea>

                  <button class="btn btn-primary w-100 py-3 mt-4" type="submit" onClick={UpdateProducts}>
                    Save
                  </button>
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
