import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import FormErrors from "../FormErrors";
import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../contexts/AuthContext";

const initErrorState = {
  cognito: null,
  blankfield: false,
};

const LOCK_DOWN_TIME_IN_SECONDS = 30;

const LogIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(initErrorState);

  const [seconds, setSeconds] = useState(0);
  const [timerActivated, setTimerActivated] = useState(false);
  const [buttonStatus, setButtonStatus] = useState({
    touched: false,
    disabled: false,
  });

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    if (seconds === 0) {
      setButtonStatus({ touched: true, disabled: false });
      setTimerActivated(false);
    } else if (timerActivated) {
      setTimeout(() => {
        if (isMounted) {
          setSeconds((prevState) => prevState - 1);
        }
      }, 1000);
    }
    return () => {
      isMounted = false;
    };
  }, [timerActivated, seconds]);

  useEffect(() => {
    setButtonStatus({ touched: false, disabled: false });
  }, []);

  const clearErrorState = () => {
    setErrors(initErrorState);
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
    const { username, password } = form;

    try {
      const loginResult = await Auth.signIn(username, password);
      setUser({
        isAuthenticated: true,
        name: username,
        uid: loginResult.username,
      });
      console.log("loginResult", loginResult);

      if (loginResult.challengeName === "NEW_PASSWORD_REQUIRED") {
        navigate("/changepassword", {
          replace: true,
          state: { u: loginResult.username, e: username },
        });
      } else {
        navigate("/products");
      }
    } catch (err) {
      const error = !(err as any).message ? { message: err } : err;
      toast.error((err as any).message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      if ((err as any).message === "Password attempts exceeded") {
        setTimerActivated(true);
        setButtonStatus({ touched: true, disabled: true });
        setSeconds(LOCK_DOWN_TIME_IN_SECONDS);
      }
      setErrors((prev) => ({ ...prev, cognito: error as any }));
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.id]: event.target.value }));
    document.getElementById(event.target.id)?.classList.remove("is-danger");
  };

  const { disabled } = buttonStatus;
  const btnLabel = !disabled ? "Login" : "Please retry in ";
  const lockMessage =
    seconds > 0 ? `(${seconds.toString().padStart(2, "0")}s) seconds` : "";

  return (
    <section className="section auth">
      <div className="container">
        <h1>Log in</h1>
        <FormErrors formerrors={errors} />

        <form onSubmit={handleSubmit}>
          <div className="field">
            <p className="control">
              <input
                className="input"
                type="text"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter username or email"
                value={form.username}
                onChange={onInputChange}
              />
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
            <p className="control">
              <a href="/forgotpassword">Forgot password?</a>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-success" disabled={disabled}>
                {btnLabel} {lockMessage}
              </button>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
