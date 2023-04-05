import React from "react";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import "../index.css";
import { Form } from "react-router-dom";
import img from "../assets/illustration.jpg";
const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Take Control <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your own
          journey today.
        </p>
        <Form method="post">
          <input
            type="hidden"
            autocomplete="false"
            name="_action"
            value="newUser"
          />
          <input
            type="text"
            name="userName"
            required
            placeholder="what is your name?"
            aria-label="Your Name"
            autoComplete="off"
          />
          <button type="submit" className="btn btn--dark">
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={img} width={600} />
    </div>
  );
};

export default Intro;
