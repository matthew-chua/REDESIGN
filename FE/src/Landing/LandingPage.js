import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
// import { TrolleyContext } from "../Context/TrolleyProvider";

import LoadingModal from "../Loading/LoadingModal";

// Components
import Button from "../Common/Button";
import logo from "../Assets/LOGO.png";
import classes from "./LandingPage.module.css";

// Network Imports
import useFetch from "../Network/useFetch";
import Routes from "../Network/Routes";
import FetchMethod from "../Network/FetchMethod";

export default function LandingPage() {
  const userObject = {
    userID: localStorage.getItem("userID"),
    userName: localStorage.getItem("userName"),
  };
  const navigate = useNavigate();
  const [banned, setBanned] = useState(false);

  const [
    fetchUserData,
    fetchUserLoading,
    fetchUserError,
    setFetchUserError,
    performFetchUser,
  ] = useFetch(FetchMethod.get, Routes.user.user + userObject.userID);

  // useParams save trolleyID into a variable
  const params = useParams();

  const checkBanned = async () => {
    // const DBUser = await useFetch("GET", `user/${userObject.userID}`, {
    //   userID: userObject.userID,
    // });
    await performFetchUser();
    // if (fetchUserData.banned) {
    //   setBanned(true);
    //   console.log("setting ban true")
    // } else {
    //   //redirect to the loan page
    //   const path = `/loan/${params.id}`;
    //   navigate(path);
    // }
  };

  useEffect(async () => {
    if (fetchUserData) {
      if (fetchUserData.banned) {
        setBanned(true);
        console.log("setting ban true");
      } else if (params.id) {
        //redirect to the loan page
        const path = `/loan/${params.id}`;
        navigate(path);
      }
    }
  }, [fetchUserData]);

  // // get current Trolley ID
  // const { value, setValue } = useContext(TrolleyContext);

  useEffect(() => {
    // // useContext save trolleyID params.id
    // setValue(params.id)

    //check if user is logged in
    if (userObject.userID && userObject.userName) {
      console.log("BANNED?", banned);
      //check if user is banned
      checkBanned();
    }
  }, []);

  const isLoading = () => {
    if (fetchUserLoading) {
      return true;
    } else {
      return false;
    }
  };

  const loginPageHandler = () => {
    const path = `/login/${params.id}`;
    navigate(path);
  };

  return (
    <div className={classes.root}>
      <LoadingModal isLoading={isLoading()} />

      {!banned && (
        <div>
          <h1>Welcome to</h1>
          <img src={logo} className={classes.logo} />
          <p>
            Seems like this is your first time, click the button below to create
            an account!
          </p>
          <Button onClickHandler={loginPageHandler}>Create Account</Button>
        </div>
      )}

      {banned && (
        <div>
          <h1>YOU ARE BANNED</h1>
        </div>
      )}
      <p className={classes.footer}>&copy; Super Mario Bros.</p>
    </div>
  );
}
