$(document).ready(function () {

  $('#register-button').click(function(event){
    event.preventDefault();

    checkPasswordMatch();

   var email = $('#reg-email').val();
   var pass = $('#reg-pass').val();
   var confirmPassword = $('#confirm-pass').val();

     //make sure valid email
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (email == '' || !re.test(email))
    {
        $('.alert').attr('class', 'alert alert-yellow alert-dismissable')
        $('.alert').css('display','block').html("Please Enter a Valid Email Address");
        return false;
    }

    if(confirmPassword == pass){
       var data = {};
       data.email = email;
       data.pass = pass;

              $.ajax({ 
                  url: "/signup",
                  type: "POST",
                  dataType: "json",
                  data: JSON.stringify(data),
                  contentType: "application/json",
                  cache: false,
                  timeout: 5000,
                  async: false,
                  complete: function() {
                  },
                  success: function(data) {
                    console.log('success');
                    var theData = JSON.stringify(data);
                    var resp = JSON.parse(theData);
                    console.log(resp.objectId);
                    var data = {};
                    data.id = resp.objectId;
                    var message = resp["message"]
                    console.log('message:'+message)
                     if(message != null && message.indexOf("already") > 1){
                       
                          $('.alert').attr('class', 'alert alert-yellow alert-dismissable')
                          $('.alert').css('display','block').html("Email is already associated with account");
                     }
                     else{
                          window.location.href = "/account";
                     }
                 },
                  error: function(data) {
                    console.log("error")
                    console.log(JSON.stringify(data));
                  },
                });
     }
     else{
        $('.alert').attr('class', 'alert alert-yellow alert-dismissable')
        $('.alert').css('display','block').html("Password Fields Do Not Match");
      }
  });//register clicked

  //checking passwords match
  function checkPasswordMatch(){
    var password = $('#reg-pass').val();
    var confirmPassword = $('#confirm-pass').val();

    if(password != confirmPassword){
        $('.alert').attr('class', 'alert alert-yellow alert-dismissable')
        $('.alert').css('display','block').html("Password Fields Do Not Match");

    }
    else{
      $('.alert').css('display','none').html("");
    }
  }//password check end function

  $("#confirm-pass").keyup(checkPasswordMatch);

  $("#reg-pass").keyup(function(){
    $('.alert').css('display','none').html("");
  });
});//doc ready