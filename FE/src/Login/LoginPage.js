import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import LoadingModal from "../Loading/LoadingModal";
import logo from "../Assets/LOGO.png";

import Button from "../Common/Button";
import Checkbox from "../Common/Checkbox";
import TextField from "../Common/TextField";
import classes from "./LoginPage.module.css";

// Network Imports
import useFetch from "../Network/useFetch";
import Routes from "../Network/Routes";
import FetchMethod from "../Network/FetchMethod";

export default function LoginPage() {
  const [pageState, setPageState] = useState(1);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [disabled, setDisabled] = useState(true);
  // const [OTPError, setOTPError] = useState(false);
  // const [OTPRes, setOTPRes] = useState();

  // useParams save trolleyID into a variable
  const params = useParams();

  const [userState, setUserState] = useState({
    name: "",
    phoneNumber: "",
  });

  // Sign In With Phone Number
  const signInBody = { recipient: userState.phoneNumber };

  const [
    signInData,
    signInLoading,
    signInError,
    setSignInError,
    performSignIn,
  ] = useFetch(
    FetchMethod.post,
    Routes.user.signInWithPhoneNumber,
    signInBody,
    false
  );

  // Verify OTP
  const verifyOTPBody = {
    id: signInData ? signInData.id : null,
    token: OTP,
  };
  const [
    verifyOTPData,
    verifyOTPLoading,
    verifyOTPError,
    setVerifyOTPError,
    performVerifyOTP,
  ] = useFetch(FetchMethod.post, Routes.user.verifyOTP, verifyOTPBody, false);

  const createUserBody = {
    name: userState.name,
    phoneNumber: userState.phoneNumber.replace(/\s/g, "").substring(0),
  };
  const [
    createUserData,
    createUserLoading,
    createUserError,
    setCreateUserError,
    performCreateUser,
  ] = useFetch(FetchMethod.post, Routes.user.createUser, createUserBody, false);

  const isLoading = () => {
    if (signInLoading || verifyOTPLoading || createUserLoading) {
      return true;
    } else {
      return false;
    }
  };

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

  const page1NextHandler = async () => {
    await performSignIn();
  };

  const page2NextHandler = async () => {
    // setOTPError(false);
    await performVerifyOTP();

    //redirect if verification is successful
    setPageState(3);
    // setDisabled(true);

    //else set error state
    // setOTPError(true);
  };

  const createUserHandler = async () => {
    //check if user in DB (use phone no), if not create

    //send api to create user with userState
    await performCreateUser();
  };

  // ==== Helpers ====
  const phoneNumberIsValid = () => {
    return userState.phoneNumber.replace(/\s/g, "").length === 11;
  };

  const otpIsValid = () => {
    return OTP.replace(/\s/g, "").length === 6;
  };

  const nameIsValid = () => {
    return userState.name.replace(/\s/g, "").length > 0;
  };

  // Verify TextFields
  useEffect(() => {
    if (isPageOne()) {
      setDisabled(!phoneNumberIsValid());
    } else if (isPageTwo()) {
      setDisabled(!otpIsValid());
    } else {
      setDisabled(!nameIsValid());
    }
  }, [userState, OTP, signInData, verifyOTPData, createUserData]);

  useEffect(() => {
    if (createUserData) {
      //use returned object to store userobject in localstorage
      localStorage.setItem("userID", createUserData.userID);
      localStorage.setItem("userName", createUserData.name);
      //redirect to the loan page once done
      const path = `/${Routes.loan.loan}${params.id}`;
      navigate(path);
    }
  }, [createUserData]);

  const isPageOne = () => {
    return signInData === null;
  };

  const isPageTwo = () => {
    // Don't remove the comment below -- actual logic when no longer testing
    return signInData && verifyOTPData === null;

    // Remove this when no longer testing
    // return signInData !== null && pageState !== 3;
  };

  const isPageThree = () => {
    // Don't remove the comment below -- actual logic when no longer testing
    return verifyOTPData && createUserData === null;

    // Remove this when no longer testing
    // return pageState === 3;
  };

  return (
    <div className={classes.root}>
      <LoadingModal isLoading={isLoading()} />
      {isPageOne() && (
        <div className={classes.page1root}>
          <img src={logo} className={classes.logo} />
          <h1> Enter your mobile number</h1>
          <h3>We will send you a confirmation code</h3>
          <TextField
            onChange={inputNumberHandler}
            value={userState.phoneNumber}
            placeholder="+65 8123 4567"
            error={signInError}
            setError={setSignInError}
            errorText="Invalid phone number entered, please try again!"
            numberInput={true}
          />
          <Checkbox text={"Stay signed in"} initialState={true} />
          <Button onClickHandler={page1NextHandler} isDisabled={disabled}>
            Next
          </Button>
          <p className={classes.bottomText}>
            By signing up, you agree with our <br /> <a>Terms and Conditions</a>{" "}
            and <a>Privacy Policy</a>
          </p>
          <p className={classes.footer}>&copy; Super Mario Bros.</p>
        </div>
      )}

      {isPageTwo() && (
        <div className={classes.page2root}>
          <img src={logo} className={classes.logo} />
          <h1>Enter code sent to your number</h1>
          <h3>
            We sent the code to <br />
            {userState.phoneNumber}
          </h3>
          <TextField
            onChange={OTPHandler}
            value={OTP}
            placeholder="Your code here"
            error={verifyOTPError}
            setError={setVerifyOTPError}
            errorText="Wrong code entered! Please try again."
            numberInput={true}
          ></TextField>
          <Button onClickHandler={page2NextHandler} isDisabled={disabled}>
            Verify
          </Button>
          <p className={classes.bottomText}>
            Didn't receive code? <a>Resend</a>
          </p>
          <p className={classes.footer}>&copy; Super Mario Bros.</p>
        </div>
      )}

      {isPageThree() && (
        <div className={classes.page3root}>
          <img src={logo} className={classes.logo} />
          <h1>Create Account</h1>
          <h3>Enter your full name</h3>
          <TextField
            onChange={nameHandler}
            placeholder="eg. John Doe"
            error={createUserError}
            setError={setCreateUserError}
            errorText="Error: could not create account"
          />
          <Button onClickHandler={createUserHandler} isDisabled={disabled}>
            Done
          </Button>
          <p className={classes.footer}>&copy; Super Mario Bros.</p>
        </div>
      )}
    </div>
  );
}
