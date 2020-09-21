
// signup
    function signup(){
      var curday = function(sp){
        today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+sp+mm+sp+yyyy);
        };
    const signupForm= document.querySelector('#signup-form');
    signupForm.addEventListener('submit',(e) => {
      e.preventDefault();
    
      //get user info
      const email = signupForm['txtEmail'].value;
      const password = signupForm['txtPassword'].value;
    
      //sign up the user
      auth.createUserWithEmailAndPassword(email , password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          userName : signupForm['userName'].value,
          date_member_signup: curday('/'),
          email:email,
          uid:cred.user.uid,
        }).then(()=>{ //relocate after signup
          if ( document.URL.includes("signup.html") ) {
            window.location.replace("admin.html");
            setTimeout(signupForm.reset, 1000);
        }
        })
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          alert("email exist!")
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
    })
  }

    //Login
function login(){
const Login = document.querySelector('#login-form');
Login.addEventListener('submit', (e) =>{
e.preventDefault();

// get user info
const email = Login['log-email'].value;
const password = Login['log-password'].value;

auth.signInWithEmailAndPassword(email, password).then(cred =>{
  if ( document.URL.includes("login.html") ) {
    location.replace("admin.html");
    setTimeout(Login.reset, 1000);
}
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert("password/email incorrect")
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
})
}
// logout
function logout(){
  auth.signOut().then(() =>{
    location.replace("login.html");
  });
}



    //setup seller store
function uploadCar(){ 
  var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
    };
    //get data
    var name=document.getElementById("carName").value;
    var miles=document.getElementById("miles").value;
    var model=document.getElementById("model").value;
    var price=document.getElementById("price").value;
    var id=document.getElementById("id").value;
    var description=document.getElementById("carDescription").value;
    console.log(name,miles,model,price,id,description, curday('/'))
      

             
        db.collection('inventory').add({
          carName:name,
          miles: miles,
          model: model,
          price: price,
          car_id: id,
          carDescription: description,
          date_car_made: curday('/'),
        }).then(()=>{
          //open shop
         setTimeout(location.reload(),2000);
          alert("car have being added to the inventory");
        })
           
}