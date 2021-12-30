import React from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import logImg from "../../image/logreg.png";
import { useForm } from "react-hook-form";
import "./Login.css";
import axios from "axios";
const Login = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("https://ttmg-backend.herokuapp.com/api/auth/staffLogin", data)
      .then(function (res) {
        if (res.status === 200) {
          swal("Login Successfully!", "Welcome This home page!", "success");
          navigate("/home");
          reset();
        } else {
          swal(
            "Oops Somethig error please check all field",
            "Please try again!",
            "error"
          );
        }
      })
      .catch(function (error) {
        const data = { ...error };
        const response = data?.response?.status;
        if (response === 400) {
          swal("Oops Email or Password missing!", "Please try again!", "error");
        } else if (response === 401) {
          swal(
            "Oops Email or Password is incorrect !",
            "Please try again!",
            "error"
          );
        }
      });
  };
  return (
    <>
      <div className="grid md:grid-cols-2 items-center container mx-auto">
        <div className="fromInput">
          <h1 className="text-4xl font-bold mb-3 mr-3">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="email" {...register("email")} />
            <input
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <input
              className="cursor-pointer bg-violet-500 hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 p-1 rounded"
              value="Login"
              type="submit"
            />
          </form>
          <p>
            Please
            <Link to="/register" className="text-red-500">
              {" "}
              Register
            </Link>{" "}
            Now.
          </p>
        </div>
        <div>
          <img src={logImg} alt="avtor" />
        </div>
      </div>
    </>
  );
};

export default Login;
