const Loan = require("./Loan/loanSchema");
const User = require("./User/userSchema");

//function to get all loans
const getLoans = async () => {
  
  const query = { 'returned': false }
  return Loan.find(query);
  
}

const ban = (userID) => {

  const query = {'userID': userID}
  const update = {'banned': true}

  User.findOneAndUpdate(query, update)
  .then((res)=>{
    console.log(res);
    console.log("SUCCESS");
  })
  .catch((err)=>{
    console.log("ERROR", err);
  })
}

const BanUsers = async () => {
  
  console.log("TIMEOUT TEST")

  //get all loans
  const openLoans = await getLoans();
  
  //check for loans that are expired
  // console.log(openLoans[0]);

  let now = new Date();
  now.setDate(now.getDate()-1)
  
  openLoans.forEach((loan) => {
    if (loan['borrowDate'] < now){
      console.log("NEED TO BAN", loan);

      //ban the user
      ban(loan['userID']);

    }
  })

  


}

module.exports = {
    BanUsers
  };