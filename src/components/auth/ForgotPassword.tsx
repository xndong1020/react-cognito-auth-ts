import React, { ChangeEvent, FormEvent, useState } from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const initErrorState = {
  cognito: null,
  blankfield: false,
};

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });

  const [errors, setErrors] = useState(initErrorState);

  const clearErrorState = () => {
    setErrors(initErrorState);
  };

  const forgotPasswordHandler = async (event: FormEvent) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, form);
    if (error) {
      setErrors((prev) => ({ ...prev, ...error }));
    }

    // AWS Cognito integration here
    try {
      const res = await Auth.forgotPassword(form.email);
      console.log("res", res);
      toast.success(`New temporary password has been sent to ${form.email}`);
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
        <h1>Forgot your password?</h1>
        <p>
          Please enter the email address associated with your account and we'll
          email you a password reset link.
        </p>
        <FormErrors formerrors={errors} />

        <form onSubmit={forgotPasswordHandler}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                type="email"
                className="input"
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
            <p className="control">
              <button className="button is-success">Submit</button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
