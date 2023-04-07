import React, { useState } from "react";
import "../css/bootstrap.min.css";
import "../css/main.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Contact() {
  const navigate = useNavigate();

  const UserData = useSelector((state) => state.user.session);
  const email = UserData.email;
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });
      const data = await response.json();
      if (data.success) {
        console.log(data);
      } else {
        setTimeout(() => {
          navigate("/");
        }, 1000);

        toast("Your message has been sent ");
      }
    } catch {
      toast("All fields must be filled.");
    }
  };
  return (
    <>
      <div class="container-fluid bg-secondary px-0">
        <div class="row g-0">
          <div class="col-lg-6 py-6 px-5">
            <h1 class="display-5 mb-4">Contact For Any Queries</h1>
            <form onSubmit={handleSubmit}>
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="form-floating-2"
                      placeholder="name@example.com"
                      value={UserData.email}
                    />
                    <label for="form-floating-2">Email address</label>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-floating">
                    <textarea
                      class="form-control"
                      placeholder="Message"
                      id="form-floating-4"
                      style={{ height: "150px" }}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                    <label for="form-floating-4">Message</label>
                  </div>
                </div>
                <div class="col-12">
                  <button class="btn btn-secondary w-100 py-3" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div class="col-lg-6" style={{ minHeight: "400px" }}>
            <div class="position-relative h-100">
              <iframe
                class="position-relative w-100 h-100"
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=gcuf+(gcuf)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                frameborder="0"
                style={{ border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Contact;
