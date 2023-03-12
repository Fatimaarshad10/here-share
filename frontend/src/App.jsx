import React  , {useState} from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";
import Contact from "./components/contact";
import Service from "./components/service";
import Home from "./components/home";
import Detail from "./components/detail";
import Blog from "./components/blog";
import Form from "./components/formpage";
import Register from "../src/SignUp/register";
import Login from "../src/SignUp/login";
import Fake from "./SignUp/fakedata";
import { useSelector } from "react-redux";

function App() {

  const UserData = useSelector((state) => state.user.session);
 
  // setData(UserData.email)
  return (
    <>
      <div>
        <Header />
        <Fake/>
        <Routes>
        { UserData !== null ? (
          <>
           <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
           <Route path="/blog" element={<Blog />} />
          <Route path="/form" element={<Form />} />
          <Route path="/detail" element={<Detail />} /> </> ) 
          :(<>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          </>)}
         
        
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
