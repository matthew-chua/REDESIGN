import React, { useEffect, useState } from "react";
import classes from "./LoanPage.module.css";

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

  const TID = "1";

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
  ] = useFetch(FetchMethod.get, Routes.trolley.fetch, null, false);

  // Fetch Loan
  const [
    fetchLoanData,
    fetchLoanLoading,
    fetchLoanError,
    setFetchLoanError,
    performFetchLoan,
   ] = useFetch(FetchMethod.get, Routes.loan.fetch, null, false);

  const trolleyIsBorrowed = () => {
    return (
      fetchTrolleyData.shouldUnlock === true ||
      fetchTrolleyData.isUnlocked === true
    );
  };

  const unlockHandler = async () => {
    //make sure trolley is not borrowed
    // const trolley = await useFetch("GET", `trolley/${TID}`, {});
    await performFetchTrolley();

    if (trolleyIsBorrowed()) {
      setLoanState("error");
      return;
    }

    // create loan
    await performCreateLoan();
    // const loan = await useFetch("POST", "loan/createLoan", {
    //   userID: user.userID,
    //   trolleyID: TID,
    // });

    // setLoanObjectState(createLoanData);
    setLoanState("unlocked");
  };

  const returnCheckHandler = async () => {
    // const currentLoan = await useFetch("GET", `loan/${createLoanData.loanID}`);
    // if (currentLoan.data.returned) {
    //   setLoanState("returned");
    // } else {
    //   setSnake(true); // LOL
    // }

    await performFetchLoan();
    if (fetchLoanData.returned) {
      setLoanState("returned");
    } else {
      setSnake(true); // LOL
    }
  };

  return (
    <div className={classes.root}>
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
              <i class="fa fa-unlock"></i>
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
              <i class="fa fa-lock"></i>
            </p>
            <p>Error, trolley is already unlocked.</p>
            <p>Please try another trolley.</p>
          </div>
        )}

        {loanState === "returned" && (
          <div className={classes.innerContent}>
            <p className={classes.iconReturned}>
              <i class="fa fa-lock"></i>
            </p>
            <h3>Trolley Returned!</h3>
          </div>
        )}
      </div>
    </div>
  );
}
