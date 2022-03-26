import React, { useEffect, useState, useContext } from "react";
import classes from "./LoanPage.module.css";
import { useParams } from "react-router";

import LoadingModal from "../Loading/LoadingModal";
import logo from "../Assets/LOGO.png";

// Network Imports
import useFetch from "../Network/useFetch";
import Routes from "../Network/Routes";
import FetchMethod from "../Network/FetchMethod";

export default function LoanPage() {
  const [user, setUser] = useState({
    name: localStorage.getItem("userName"),
    userID: localStorage.getItem("userID"),
  });

  // true when the user clicks the return lock button
  const [userDidClickReturn, setUserDidClickReturn] = useState(false);

  // useParams save trolleyID into a variable
  const params = useParams();

  const TID = params.id;

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
  ] = useFetch(
    FetchMethod.get,
    Routes.trolley.trolley + params.id,
    null,
    false
  );

  // Fetch Loan
  const [
    fetchLoanData,
    fetchLoanLoading,
    fetchLoanError,
    setFetchLoanError,
    performFetchLoan,
  ] = useFetch(
    FetchMethod.get,
    Routes.loan.loan + params.id + "/" + user.userID,
    null,
    false
  );

  // ====== Derived States ======
  const isLoading =
    createLoanLoading || fetchTrolleyLoading || fetchLoanLoading;
  const lockedState =
    fetchTrolleyData &&
    !fetchTrolleyData.shouldUnlock &&
    !fetchTrolleyData.isUnlocked &&
    !userDidClickReturn;
  const unlockedState = fetchLoanData && !fetchLoanData.returned;
  const errorState =
    fetchTrolleyData &&
    (fetchTrolleyData.shouldUnlock || fetchTrolleyData.isUnlocked) &&
    !fetchLoanData && !isLoading;
  const returnedState =
    fetchTrolleyData &&
    !fetchTrolleyData.shouldUnlock &&
    !fetchTrolleyData.isUnlocked &&
    userDidClickReturn;
  const lockWithoutReturningState =
    fetchLoanData && !fetchLoanData.returned && userDidClickReturn;
  console.log("fetchLoanData", fetchLoanData);

  // ========= Handlers ==========
  const unlockHandler = async () => {
    //make sure trolley is not borrowed
    await performCreateLoan();
  };

  // ========== Network ===========
  useEffect(() => {
    performFetchTrolley();
    performFetchLoan();
    // start by fetching trolley.
    // if trolley is borrowed
    // if borrowed, check if its by user -- using loan
    // if by user, set unlocked state
    // otherwise, set error

    // on click of borrow,
    // create loan
    // if success, set unlocked state

    // on click of return , check if trolley is returned
    // if trolley returned, set returned

    // states:
    // locked -- when trolley returned => fetchTrolleyData.returned == true
    // returned -- when trolley returned + borrowed previously
    // => fetchTrolleyData.returned = true && returnedState == true

    // error -- trolley borrowed
    // unlocked -- when trolley borrowed + user borrowed it
  }, []);

  useEffect(async () => {
    if (createLoanData) {
      performFetchTrolley();
      performFetchLoan();
    }
  }, [createLoanData]);

  const returnCheckHandler = async () => {
    setUserDidClickReturn(true);
    performFetchTrolley();
    performFetchLoan();
  };

  console.log("TIME", Number(fetchLoanData.borrowDate.substring(11,13))+8)


const hour = Number(fetchLoanData.borrowDate.substring(11,13))+8



  return (
    <div className={classes.root}>
      <LoadingModal isLoading={isLoading} />
      <img src={logo} className={classes.logo}/>
      {!returnedState && <h1>Welcome, <br/>{user.name}!</h1>}
      {returnedState && <h1>Thank you, <br/>{user.name}!</h1>}

      <div className={classes.content}>
        {lockedState && (
          <div className={classes.innerContent}>
            <p className={classes.icon}>
              <i className="fa fa-lock" onClick={unlockHandler}></i>
            </p>
            <p>Tap to unlock!</p>
            {/* <p className={classes.footer}>&copy; Super Mario Bros.</p> */}
          </div>
        )}

        {unlockedState && (
          <div className={classes.innerContent}>
            <p className={classes.icon} onClick={returnCheckHandler}>
              <i className="fa fa-unlock"></i>
            </p>
            <h3>{fetchLoanData.borrowDate.substring(0, 10)} -   {hour}:{fetchLoanData.borrowDate.substring(14, 16)}</h3>
            {/* <h3>{fetchLoanData.borrowDate.substring(11, 16)}</h3> */}
            <h3>Ready for use!</h3>
            <p>Remove the lock once you see the green light!</p>
            <p>Please return your trolley within 24 hours.</p>
            <p>Tap the lock above once you've returned your trolley!</p>
            {lockWithoutReturningState && (
              <p
                className={`${classes.errorText} ${
                  lockWithoutReturningState ? classes.errorShake : ""
                }`}
              >
                Oops, looks like the trolley has not been returned! Please try
                again
              </p>
            )}
            {/* <p className={classes.footer}>&copy; Super Mario Bros.</p> */}
          </div>
        )}
        {errorState && (
          <div className={classes.innerContent}>
            <p className={classes.iconError}>
              <i className="fa fa-lock"></i>
            </p>
            <p>Error, trolley is already unlocked.</p>
            <p>Please try another trolley.</p>
            <p>Close this page and scan another QR Code!</p>
          </div>
        )}

        {returnedState && (
          <div className={classes.innerContent}>
            <p className={classes.iconReturned}>
              <i class="fa fa-lock"></i>
            </p>
            <h3>Trolley Returned!</h3>
            <p>
              Thank you for returning the trolley! <br />
              The green light should now be off.
            </p>
            <p>You can now close the page.</p>
            <button
              onClick={() => {
                setUserDidClickReturn(false);
              }}
            >
              Borrow again!
            </button>
            {/* <p className={classes.footer}>&copy; Super Mario Bros.</p> */}
          </div>
        )}
      <p className={classes.footer}>&copy; Super Mario Bros.</p>
      </div>

    </div>
  );
}
