import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import TextField from "../Common/TextField";
import classes from "./LoginPage.module.css";

export default function LoginPage() {
  const [pageState, setPageState] = useState(1);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [disabled, setDisabled] = useState(true);

  const [userState, setUserState] = useState({
    name: "",
    phoneNumber: "",
    banned: false,
  });

  const inputNumberHandler = (e) => {
    //forgot how to do it the proper way
    setUserState({
      ...userState,
      phoneNumber: e.target.value,
    });
  };

  const nameHandler = (e) => {
    setUserState({
      ...userState,
      name: e.target.value,
    });
  };

  const OTPHandler = (e) => {
    setOTP(e.target.value);
  };

  const verifyOTP = () => {
    //send api call to messagebird to verify OTP
  };

  const page1NextHandler = () => {
    setPageState(2);
    setDisabled(true);
  };

  const page2NextHandler = () => {
    verifyOTP();

    //redirect if verification is successful
    setPageState(3);
    setDisabled(true);

    //else set error state
  };

  const createUserHandler = () => {
    //send api to create user with userState
    console.log(userState);

    //use returned object to store userobject in localstorage

    //redirect to the loan page once done
    const path = "/loan";
    navigate(path);
  };

  useEffect(() => {
    if (pageState === 1) {
      if (userState.phoneNumber.replace(/\s/g, "").length === 11) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (pageState === 2) {
      if (OTP.replace(/\s/g, "").length === 6) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (userState.name.replace(/\s/g, "").length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [userState, OTP]);

  return (
    <div className={classes.root}>
      {pageState === 1 && (
        <div className={classes.page1root}>
          <h1> Enter your mobile number</h1>
          <h3>We will send you a confirmation code</h3>
          <TextField
            onChange={inputNumberHandler}
            className={classes.input}
            value={userState.phoneNumber}
            placeholder="+65 8123 4567"
          />
          <Checkbox text={"Stay signed in"} initialState={true} />
          <Button onClickHandler={page1NextHandler} isDisabled={disabled}>
            Next
          </Button>
          <p className={classes.bottomText}>
            By signing up, you agree with our <br /> <a>Terms and Conditions</a>{" "}
            and {" "}
            <a>Privacy Policy</a>
          </p>
        </div>
      )}

      {pageState === 2 && (
        <div className={classes.page2root}>
          <h1>Enter code sent to your number</h1>
          <h3>
            We sent the code to <br />
            {userState.phoneNumber}
          </h3>
          <TextField
            onChange={OTPHandler}
            className={classes.input}
            value={OTP}
            placeholder="Your code here"
          ></TextField>
          <Button onClickHandler={page2NextHandler} isDisabled={disabled}>
            Verify
          </Button>
          <p className={classes.bottomText}>Didn't receive code? Resend</p>
        </div>
      )}

      {pageState === 3 && (
        <div className={classes.page3root}>
          <h1>Create Account</h1>
          <h3>Enter your full name</h3>
          <TextField
            onChange={nameHandler}
            className={classes.input}
            placeholder="eg. John Doe"
          />
          <Button onClickHandler={createUserHandler} isDisabled={disabled}>
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
