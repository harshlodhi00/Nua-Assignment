import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEnterOutline } from "react-icons/io5";

const Login = () => {
  const [emailTooltip, setEmailTooltip] = useState("");
  const [passwordTooltip, setPasswordTooltip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationMessage, setValidationMessage] = useState("");

  const navigate = useNavigate();

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      if (field === "Email") {
        setEmailTooltip("Email copied!");
        setTimeout(() => setEmailTooltip(""), 1000);
      } else if (field === "Password") {
        setPasswordTooltip("Password copied!");
        setTimeout(() => setPasswordTooltip(""), 1000);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setValidationMessage("Email and password are required!");
      return;
    }

    if (email === "johndoe@gmail.com" && password === "12345678") {
      localStorage.setItem("email", email);
      navigate("/search-a-book");
      setValidationMessage("Login Successful!");
    } else {
      setValidationMessage("Invalid credentials!");
    }
  };

  return (
    <div className="flex h-[100vh] flex-col justify-center px-6 py-12 lg:px-8 bg-slate-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {validationMessage && (
            <p
              className={` font-[500] text-sm ${
                validationMessage === "Login Successful!"
                  ? "text-green-400"
                  : "text-red-500"
              } `}
            >
              {validationMessage}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 text-center text-sm leading-5 text-gray-500">
        <p>Use sample credentials to login:</p>

        <div
          className="relative inline-block cursor-pointer mt-2"
          onClick={() => copyToClipboard("johndoe@gmail.com", "Email")}
        >
          <span className="font-medium text-indigo-600">Email: </span>
          johndoe@gmail.com
          {emailTooltip && (
            <div className="absolute left-0 -top-6 text-xs bg-black text-white px-2 py-1 rounded">
              {emailTooltip}
            </div>
          )}
        </div>
        <br />
        <div
          className="relative inline-block cursor-pointer mt-2 mb-2"
          onClick={() => copyToClipboard("12345678", "Password")}
        >
          <span className="font-medium text-indigo-600">Password: </span>
          12345678
          {passwordTooltip && (
            <div className="absolute left-0 -top-6 text-xs bg-black text-white px-2 py-1 rounded">
              {passwordTooltip}
            </div>
          )}
        </div>

        <p>Note: Tap to copy</p>
      </div>

      <button
        className="fixed top-10 right-10 px-4 py-2 bg-indigo-600 text-white rounded-md flex flex-row items-center  "
        onClick={() => {
          localStorage.setItem("email", "johndoe@email.com");
          navigate("/search-a-book");
        }}
      >
        <span className="mr-2"> Skip SignIn</span>
        <IoEnterOutline size={20} />
      </button>

      <div className=" fixed bottom-0 w-[100%] h-[50px] text-center md:px-6 ">
        &copy; {new Date().getFullYear()} - Made with ❤️ by{" "}
        <a
          className=" dark:text-blue-600 leading-6 underline hover:text-blue-400 duration-100"
          target="_blank"
          href="https://harshlodhi.netlify.app/"
        >
          Harsh Lodhi
        </a>
      </div>
    </div>
  );
};

export default Login;
