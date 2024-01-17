function Userauth(){
    let checkUserLogin = JSON.parse(localStorage.getItem('checkUserLogin'));
  return checkUserLogin;
}

export default Userauth