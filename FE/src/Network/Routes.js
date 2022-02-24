const user = "user/"
const trolley = "trolley/"
const loan = "loan/"

const Routes = {
    // User
    user: {
        user: user,
        signInWithPhoneNumber: `${user}signInWithPhoneNumber`,
        verifyOTP: `${user}verifyOTP`,
        createUser: `${user}createUser`,
        banUser: `${user}banUser`,
    },

    // Trolley
    trolley: {
        trolley: trolley,
        createTrolley: `${trolley}createTrolley`,
        setShouldUnlock: `${trolley}setShouldUnlock`,
        setIsUnlocked: `${trolley}setIsUnlocked`,
        returnTrolley: `${trolley}returnTrolley`,
    },

    // Loans
    loan: {
        loan: loan,
        createLoan: `${loan}createLoan`,
        endLoan: `${loan}endLoan`
    }
}
export default Routes;