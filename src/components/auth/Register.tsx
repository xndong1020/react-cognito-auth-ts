import React, { ChangeEvent, FormEvent, useState } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";

const initErrorsState = {
  cognito: null,
  blankfield: false,
  passwordmatch: false,
};

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState(initErrorsState);

  const navigate = useNavigate();

  const clearErrorState = () => {
    setErrors(initErrorsState);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, form);
    if (error) {
      setErrors((prev) => ({ ...prev, ...error }));
    }

    // AWS Cognito integration here
    const { username, email, password } = form;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      navigate("/welcome");
    } catch (err) {
      const error = !(err as any).message ? { message: err } : err;
      setErrors((prev) => ({ ...prev, cognito: error as any }));
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    document.getElementById(event.target.id)?.classList.remove("is-danger");
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Register</h1>
        <FormErrors formerrors={errors} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                id="username"
                aria-describedby="userNameHelp"
                placeholder="Enter username"
                value={form.username}
                onChange={onInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={form.email}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="password"
                placeholder="Password"
                value={form.password}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="confirmpassword"
                placeholder="Confirm password"
                value={form.confirmpassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock" />
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Register</button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
