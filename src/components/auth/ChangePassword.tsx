import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import axios from "../../_utils/axiosInstance";

import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";

import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";

const initErrorsState = {
  cognito: null,
  blankfield: false,
  passwordmatch: false,
};

const ChangePassword = () => {
  const [form, setForm] = useState({
    user: undefined,
    name: undefined,
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState(initErrorsState);

  const location = useLocation();
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const clearErrorState = () => {
    setErrors(initErrorsState);
  };

  useEffect(() => {
    (() => {
      console.log("location.state", location.state);
      const state = location.state as any;
      if (state && state.u) {
        setForm((prev) => ({
          ...prev,
          user: state.u,
          name: state.e,
        }));
      }
    })();
  }, [location.state]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Form validation
    clearErrorState();
    const error = Validate(event, form);
    if (error) {
      setErrors((prev) => ({ ...prev, ...error }));
    } else {
      // AWS Cognito integration here
      try {
        await axios.post("/changePassword", {
          user: form.user,
          newPassword: form.newPassword,
        });

        setUser({
          isAuthenticated: true,
          name: form.name,
          uid: form.user,
        });

        navigate("/products");
      } catch (err: any) {
        toast.error(err.response.data.error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      try {
      } catch (error) {
        console.error(error);
      }
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    document.getElementById(event.target.id)?.classList.remove("is-danger");
  };

  return (
    <section className="section auth">
      <div className="container">
        <h1>Change Password</h1>
        <FormErrors formerrors={errors} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="newPassword"
                placeholder="New password"
                value={form.newPassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={onInputChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
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
              <button className="button is-success">Change password</button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangePassword;
