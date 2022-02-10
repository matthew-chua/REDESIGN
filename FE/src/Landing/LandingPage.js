import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingModal from "../Loading/LoadingModal";

// Components
import Button from "../Common/Button";

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

  const { fetchUserData, fetchUserLoading, fetchUserError, setFetchUserError, performFetchUser } =
    useFetch(FetchMethod.get, Routes.user.fetch+userObject.userID);

  const checkBanned = async () => {
    // const DBUser = await useFetch("GET", `user/${userObject.userID}`, {
    //   userID: userObject.userID,
    // });
    await performFetchUser();
    if (fetchUserData.banned) {
      setBanned(true);
    } else {
      //redirect to the loan page
      const path = "/loan";
      // navigate(path);
    }
  };

  useEffect(() => {
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
  }

  const loginPageHandler = () => {
    const path = "/login";
    navigate(path);
  };

  return (
    <div>
      <LoadingModal isLoading={isLoading()}/>

      {!banned && (
        <div>
          <h1>Sup bro</h1>
          <h3>Think you needa login</h3>
          <Button onClickHandler={loginPageHandler}>Login</Button>
        </div>
      )}

      {banned && (
        <div>
          <h1>YOU ARE BANNED</h1>
        </div>
      )}
    </div>
  );
}
