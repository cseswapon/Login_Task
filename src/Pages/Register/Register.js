import React from "react";
import logImg from "../../image/logreg.png";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const Register = () => {
  const { register, handleSubmit,reset } = useForm();
  const onSubmit = (data) => {
    axios
      .post("https://ttmg-backend.herokuapp.com/api/auth/staffRegister", data)
      .then(function (res) {
        if (res.status === 200) {
          swal("Registion Successfully!", "Please Login!", "success");
          reset()
        }
      })
      .catch(function (error) {
        const data = { ...error }
        const status = data?.response?.status;
        if (status === 400) {
          swal(
            "Some of the fields are missing or incorrect",
            "Please try again!",
            "error"
          );
        } else if (status === 402) {
          swal(
            "User already exist with given email id",
            "Please try again!",
            "error"
          );
        } else {
          swal("Something missing error", "Please try again!", "error");
        }
      });
  };
  return (
    <>
      <div className="grid md:grid-cols-2 items-center container mx-auto">
        <div className="fromInput mx-auto">
          <h1 className="text-4xl font-bold mb-3 mr-3">Register</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="email" {...register("email")} />
            <input
              type="password"
              placeholder="password"
              {...register("password")}
            />
            <input type="text" placeholder="name" {...register("name")} />
            <input type="text" placeholder="mobile" {...register("mobile")} />
            <input
              className="cursor-pointer bg-violet-500 hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 p-1 rounded"
              value="Register"
              type="submit"
            />
            <p>
              Already
              <Link to="/login" className="text-red-500">
                {" "}
                Login
              </Link>{" "}
              Now.
            </p>
          </form>
        </div>
        <div>
          <img src={logImg} alt="avtor" />
        </div>
      </div>
    </>
  );
};

export default Register;
