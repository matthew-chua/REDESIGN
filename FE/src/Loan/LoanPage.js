import React, { useEffect, useState, useContext } from "react";
import classes from "./LoanPage.module.css";
// import { TrolleyContext } from "../Context/TrolleyProvider";
import { Navigate, useParams } from "react-router";

import LoadingModal from "../Loading/LoadingModal";

// Network Imports
import useFetch from "../Network/useFetch";
import Routes from "../Network/Routes";
import FetchMethod from "../Network/FetchMethod";

export default function LoanPage() {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName"),
    userID: localStorage.getItem("userID"),
  });

  //represents state of loan
  //can be "locked", "unlocked" or "returned"
  const [loanState, setLoanState] = useState("locked");
  // const [loanObjectState, setLoanObjectState] = useState({});
  const [snake, setSnake] = useState(false);

  // // get Trolley ID 
  // const { value, setValue } = useContext(TrolleyContext);

  // useParams save trolleyID into a variable 
  const params = useParams();

  // const TID = "1"; 
  const TID = params.id; 
  console.log("TrolleyID: ", TID)

  // ==== Network Hooks ====

  // Create Loan
  const createLoanBody = {
    userID: user.userID,
    trolleyID: TID,
  };
  const [
    createLoanData,
    createLoanLoading,
    createLoanError,
    setCreateLoanError,
    performCreateLoan,
  ] = useFetch(FetchMethod.post, Routes.loan.createLoan, createLoanBody, false);

  // Fetch Trolley
  const [
    fetchTrolleyData,
    fetchTrolleyLoading,
    fetchTrolleyError,
    setFetchTrolleyError,
    performFetchTrolley,
  ] = useFetch(FetchMethod.get, Routes.trolley.trolley+params.id, null, false);

  // Fetch Loan
  const [
    fetchLoanData,
    fetchLoanLoading,
    fetchLoanError,
    setFetchLoanError,
    performFetchLoan,
  ] = useFetch(FetchMethod.get, Routes.loan.loan+params.id, null, false);

  console.log(Routes.loan.loan+params.id)

  const isLoading = () => {
    if (createLoanLoading || fetchTrolleyLoading || fetchLoanLoading) {
      return true; 
    } else {
      return false;
    }
  }
  
  const trolleyIsBorrowed = () => {
    return (
      fetchTrolleyData.shouldUnlock === true &&
      fetchTrolleyData.isUnlocked === true
    );
  };

  const unlockHandler = async () => {
    //make sure trolley is not borrowed
    // const trolley = await useFetch("GET", `trolley/${TID}`, {});
    await performFetchTrolley();
    console.log("here")
    console.log(fetchTrolleyData)

    // // create loan
    // await performCreateLoan();
    // // const loan = await useFetch("POST", "loan/createLoan", {
    // //   userID: user.userID,
    // //   trolleyID: TID,
    // // });
    // console.log("perform create loan")

    // // setLoanObjectState(createLoanData);
    // setLoanState("unlocked");
    // console.log("state: ", loanState)
  };

  useEffect(async () => {
    if (fetchTrolleyData){
      if (trolleyIsBorrowed()){
        console.log("fetching")
        setLoanState("error")
        console.log("error page")
      }
      else {
        await performCreateLoan();
      }
    }
  }, [fetchTrolleyData])

  useEffect(async () => {
    if (createLoanData){
      setLoanState("unlocked");
      }
  }, [createLoanData])

  const returnCheckHandler = async () => {
    // const currentLoan = await useFetch("GET", `loan/${createLoanData.loanID}`);
    // if (currentLoan.data.returned) {
    //   setLoanState("returned");
    // } else {
    //   setSnake(true); // LOL
    // }
    console.log("fetch loan called")
    await performFetchLoan()
  };
  console.log("snake: ", snake)

  useEffect(async () => {
    if (fetchLoanData){
      console.log("fetching loan data")
      if (fetchLoanData.returned) {
        setLoanState("returned");
        console.log("returned true")
      } else {
        setSnake(true); // LOL
        console.log(snake)
      }
    }


    // if (fetchTrolleyData){
    //   if (trolleyIsBorrowed()){
    //     setSnake(true);
    //   }
    //   else {
    //     setLoanState("returned");
    //     //make the endloan api call
    //     console.log("ENDING LOAN");
    //   }
    // }


  }, [fetchLoanData])
  
  // const backtohomeHandler = () => {
  //   const path = `/home/${params.id}`;
  //   navigate(path);
  // }

  return (
    <div className={classes.root}>
      <LoadingModal isLoading={isLoading()}/>
      {loanState !== "returned" && <h1>Welcome, {user.name}!</h1>}
      {loanState === "returned" && <h1>Thank you, {user.name}!</h1>}

      <div className={classes.content}>
        {loanState === "locked" && (
          <div className={classes.innerContent}>
            <p className={classes.icon}>
              <i className="fa fa-lock" onClick={unlockHandler}></i>
            </p>
            <p>Press to unlock!</p>
          </div>
        )}

        {loanState === "unlocked" && (
          <div className={classes.innerContent}>
            <p className={classes.icon} onClick={returnCheckHandler}>
              <i className="fa fa-unlock"></i>
            </p>
            <h1>{createLoanData.borrowDate.substring(0, 10)}</h1>
            <h1>{createLoanData.borrowDate.substring(11, 16)}</h1>
            <h3>Ready for use!</h3>
            <p>Please return your trolley within 24 hours.</p>
            <p>Tap the lock above once you've returned your trolley!</p>
            {snake && <p>CB U NEVER RETURN YET DONT LIE</p>}
          </div>
        )}

        {loanState === "error" && (
          <div className={classes.innerContent}>
            <p className={classes.iconError}>
              <i className="fa fa-lock"></i>
            </p>
            <p>Error, trolley is already unlocked.</p>
            <p>Please try another trolley.</p>
            <p>Close this page and scan another QR Code!</p>
            {/* <button onClick={backtohomeHandler}>Back to Home</button> */}
          </div>
        )}

        {loanState === "returned" && (
          <div className={classes.innerContent}>
            <p className={classes.iconReturned}>
              <i class="fa fa-lock"></i>
            </p>
            <h3>Trolley Returned!</h3>
            <p>You can close the page</p>
            <p>Thank you for returning the trolley
              Best citizen EVER</p>
          </div>
        )}
      </div>
    </div>
  );
}
