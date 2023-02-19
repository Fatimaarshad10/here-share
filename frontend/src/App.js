import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import About from "./components/about";
import Contact from "./components/contact";
import Service from "./components/service";
import Home from './components/home'
import Detail from "./components/detail";
import Blog from "./components/blog";
import Formage from "./components/formpage";
import Register from "./SignUp/register";
import Login from "./SignUp/login";
function App() {
  return (
    <>

    <div>

    <Header />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/email" element={<Formage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />


      </Routes>
      <Footer/>

      </div>
    </>
  );
}

export default App;
