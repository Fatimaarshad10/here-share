import React from 'react'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Setting() {
  const UserData = useSelector((state) => state.user.session);


  return (
   
    <div>

    <div className="justify-content-center">
        <div class="bg-secondary p-5 ">
            <div className="container-sm">


                <form>
                    <div class="row g-3">
                        <div class="col-lg-4">
                            <div className=" bg-secondary text-center">
                                <img src={
                                        UserData.image
                                    }
                                    alt=""
                                    class="img-fluid mt-4 "
                                    style={
                                        {
                                            borderRadius: '50%',
                                            width: '50%'
                                        }
                                    }/>
                            </div>

                            <div>
                                <div class="bg-secondary text-center"
                                    style={
                                        {padding: "30px"}
                                }>
                                    <p> {
                                        UserData.name
                                    }
                                        <br/> {
                                        UserData.email
                                    } </p>

                                    <Link to="/update">
                                        <a class="btn btn-primary rounded-pill py-2 px-4" href="#">
                                            Update
                                        </a>
                                    </Link>
                                    <Link to="/setting">
                                        <a class=" btn btn-primary rounded-pill py-2 px-4" href="#">
                                            Setting
                                        </a>
                                    </Link>

                                </div>
                            </div>
                        </div>

                        
                        <div class="col-12 col-sm-6 py-6 px-5 mx-auto mt-5">
                            <input type="email" class="form-control bg-white border-0 " placeholder="Your Email"
                                style={
                                    {height: '55px'}
                                }/>
                                 <input type="password" class="form-control bg-white border-0 mt-4" placeholder="Password"
                                style={
                                    {height: '55px'}
                                }/>
                            <button class="btn btn-primary w-100 py-3 mt-4" type="submit">Save</button>

                        </div>
                      
                        </div>
                       

                        
                </form>
            </div>
        </div>
    </div>

</div>

  )
}

export default Setting
