import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import TextField from "../Common/TextField";
import classes from "./LoginPage.module.css";

import APIHook from "../APIHook";

export default function LoginPage() {
  const [pageState, setPageState] = useState(1);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [OTPError, setOTPError] = useState(false);
  const [OTPRes, setOTPRes] = useState()

  const [userState, setUserState] = useState({
    name: "",
    phoneNumber: "",
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

  const verifyOTP = async () => {
    //send api call to messagebird to verify OTP
    const res = await APIHook("POST", "user/verifyOTP", {
      id: OTPRes.id,
      token: OTP
    })

    //if res.data.verified == true ...
    //else ...

    
  };
  
  const sendOTP = async () => {
    const res = await APIHook("POST", "user/signInWithPhoneNumber", {
      recipient: userState.phoneNumber
    })
    // console.log("OTP RES", res);
    setOTPRes(res.data);
  }

  const page1NextHandler = async () => {
    await sendOTP();
    setPageState(2);
    setDisabled(true);
  };

  const page2NextHandler = async () => {
    setOTPError(false)
    await verifyOTP();

    //redirect if verification is successful
    setPageState(3);
    setDisabled(true);

    //else set error state
    setOTPError(true)
  };

  const createUserHandler = async () => {
    
    //check if user in DB (use phone no), if not create
    
    //send api to create user with userState
    const userObject = await APIHook("POST", "user/createUser", {
      phoneNumber: userState.phoneNumber.replace(/\s/g, "").substring(0),
      name: userState.name
    });
    

    //use returned object to store userobject in localstorage
    localStorage.setItem('userID', userObject.data.userID);
    localStorage.setItem('userName', userObject.data.name);
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
  }, [userState, OTP, pageState]);

  return (
    <div className={classes.root}>
      {pageState === 1 && (
        <div className={classes.page1root}>
          <h1> Enter your mobile number</h1>
          <h3>We will send you a confirmation code</h3>
          <TextField
            onChange={inputNumberHandler}
            value={userState.phoneNumber}
            placeholder="+65 8123 4567"
          />
          <Checkbox text={"Stay signed in"} initialState={true} />
          <Button onClickHandler={page1NextHandler} isDisabled={disabled}>
            Next
          </Button>
          <p className={classes.bottomText}>
            By signing up, you agree with our <br /> <a>Terms and Conditions</a>{" "}
            and <a>Privacy Policy</a>
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
            value={OTP}
            placeholder="Your code here"
            error={OTPError}
            setError={setOTPError}
            errorText="Wrong code entered! Please try again."
          ></TextField>
          <Button onClickHandler={page2NextHandler} isDisabled={disabled}>
            Verify
          </Button>
          <p className={classes.bottomText}>
            Didn't receive code? <a>Resend</a>
          </p>
        </div>
      )}

      {pageState === 3 && (
        <div className={classes.page3root}>
          <h1>Create Account</h1>
          <h3>Enter your full name</h3>
          <TextField
            onChange={nameHandler}
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
