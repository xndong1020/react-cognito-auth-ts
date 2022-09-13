import React, { ChangeEvent, FormEvent, useState } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";

const initErrorState = {
  cognito: null,
  blankfield: false,
};

const ForgotPasswordVerification = () => {
  const [form, setForm] = useState({
    verificationcode: "",
    email: "",
    newpassword: "",
  });

  const [errors, setErrors] = useState(initErrorState);

  const clearErrorState = () => {
    setErrors(initErrorState);
  };

  const passwordVerificationHandler = async (event: FormEvent) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, form);
    if (error) {
      setErrors((prev) => ({ ...prev, ...error }));
    }

    // AWS Cognito integration here
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    document.getElementById(event.target.id)?.classList.remove("is-danger");
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Set new password</h1>
        <p>
          Please enter the verification code sent to your email address below,
          your email address and a new password.
        </p>
        <FormErrors formerrors={errors} />

        <form onSubmit={passwordVerificationHandler}>
          <div className="field">
            <p className="control">
              <input
                type="text"
                className="input"
                id="verificationcode"
                aria-describedby="verificationCodeHelp"
                placeholder="Enter verification code"
                value={form.verificationcode}
                onChange={onInputChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
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
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                type="password"
                className="input"
                id="newpassword"
                placeholder="New password"
                value={form.newpassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPasswordVerification;
