import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIHook from "../APIHook";

import Button from "../Common/Button";

export default function LandingPage() {
  const userObject = {
    userID: localStorage.getItem("userID"),
    userName: localStorage.getItem("userName"),
  };
  const navigate = useNavigate();
  const [banned, setBanned] = useState(false);

  const checkBanned = async () => {
    const DBUser = await APIHook("GET", `user/${userObject.userID}`, {
      userID: userObject.userID,
    });
    if (DBUser.data.banned) {
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

  const loginPageHandler = () => {
    const path = "/login";
    navigate(path);
  };

  return (
    <div>
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
