const user = "user/"
const Routes = {
    // User
    user: {
        user: "user/",
        signInWithPhoneNumber: `${user}signInWithPhoneNumber`,
        verifyOTP: `${user}verifyOTP`,
        createUser: `${user}createUser`,
        banUser: `${user}/banUser`,
    },

    // Trolley
    trolley: {
        fetch: "trolley/",
        createTrolley: `${fetch}/createTrolley`,
        setShouldUnlock: `${fetch}/setShouldUnlock`,
        setIsUnlocked: `${fetch}/setIsUnlocked`,
        returnTrolley: `${fetch}/returnTrolley`,
    },

    // Loans
    loan: {
        fetch: "loan/",
        createLoan: `${fetch}createLoan`,
        endLoan: `${fetch}endLoan`
    }
}
export default Routes;