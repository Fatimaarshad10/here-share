import React from "react";
import { Routes, Route ,  Navigate } from "react-router-dom";
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
import UserDetails from "./user/userDetails";
import Update from "./user/update.jsx";
import { useSelector } from "react-redux";
import { GlobalStyle } from "../src/styles/global";
import Setting from "./user/setting";
import AddPost from "./post/add_post";

function App() {
  const UserData = useSelector((state) => state.user.session);

  return (
    <>
      <div>
        <GlobalStyle />
        <Header />

        <Routes>
          {UserData ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/service" element={<Service />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/form" element={<Form />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/update" element={<Update />} />
              <Route path="/user/detail" element={<UserDetails />} />
              <Route path="/post/create" element={<AddPost />} />
            </>
          ) : (
            <>
             <Route path="/" element={<Navigate replace to="/register" />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
