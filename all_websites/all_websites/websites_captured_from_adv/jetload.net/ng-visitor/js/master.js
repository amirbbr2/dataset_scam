routerApp.controller('MasterController', function ($scope,$http,$window) {

$scope.login_user = function(){
//  alert('15 min maintenance')

$http({
  url:'/login_in',
  data:{password:$scope.login_password,username:$scope.login_email},
  method:'POST'
}).then(function(data){
  console.log(data.data);
  if (data.data != 'ok') {
    alert('Wrong Password or Email')
  }
  else {
  //  $window.location.href("/u/#!/home");

    setTimeout(function () {
        window.location.href = "https://jetload.net/u/#!/home";
    }, 500);

  }

})

}


$('.nice-select').hide()

$scope.topFunction = function() {
document.body.scrollTop = 0; // For Safari
document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


var usr_lng = getCookie('my_language');

 if (!usr_lng) {
   console.log('error');
   var usr_lng = 'en'
 }

console.log(usr_lng);

$scope.languagesx = usr_lng
var user_language = $scope.languagesx

$http.get('/api/v_lang').then(function(data){

// Change Language
$scope.changeLang = function(){
document.cookie = "my_language = "+$scope.languagesx+"";
var datax = data.data


$scope.trans_login = data.data[$scope.languagesx].trans_login
$scope.trans_register = data.data[$scope.languagesx].trans_register
$scope.trans_money = data.data[$scope.languagesx].trans_money


$scope.why = data.data[$scope.languagesx].trans_choose
$scope.trans_MainTitle = data.data[$scope.languagesx].trans_MainTitle
$scope.trans_MainDesc = data.data[$scope.languagesx].trans_MainDesc
$scope.trans_whyDesc = data.data[$scope.languagesx].trans_whyDesc
$scope.card1_title = data.data[$scope.languagesx].card1_title
$scope.card1_desc = data.data[$scope.languagesx].card1_desc

$scope.card2_title = data.data[$scope.languagesx].card2_title
$scope.card2_desc = data.data[$scope.languagesx].card2_desc

$scope.card3_title = data.data[$scope.languagesx].card3_title
$scope.card3_desc = data.data[$scope.languagesx].card3_desc

$scope.card4_title = data.data[$scope.languagesx].card4_title
$scope.card4_desc = data.data[$scope.languagesx].card4_desc

$scope.card5_title = data.data[$scope.languagesx].card5_title
$scope.card5_desc = data.data[$scope.languagesx].card5_desc

$scope.card6_title = data.data[$scope.languagesx].card6_title
$scope.card6_desc = data.data[$scope.languagesx].card6_desc


$scope.trans_create_account  = data.data[$scope.languagesx].trans_create_account
$scope.trans_sign_in  = data.data[$scope.languagesx].trans_sign_in
$scope.trans_full_name = data.data[$scope.languagesx].trans_full_name
$scope.trans_email = data.data[$scope.languagesx].trans_email
$scope.trans_password = data.data[$scope.languagesx].trans_password
$scope.trans_cpassword = data.data[$scope.languagesx].trans_cpassword
$scope.trans_agrm = data.data[$scope.languagesx].trans_agrm




 }
 // End change Language


 $scope.trans_login = data.data[$scope.languagesx].trans_login
 $scope.trans_register = data.data[$scope.languagesx].trans_register
 $scope.trans_money = data.data[$scope.languagesx].trans_money



 $scope.why = data.data[user_language].trans_choose
 $scope.trans_MainTitle = data.data[user_language].trans_MainTitle
 $scope.trans_MainDesc = data.data[$scope.languagesx].trans_MainDesc
 $scope.trans_whyDesc = data.data[$scope.languagesx].trans_whyDesc
 $scope.card1_title = data.data[$scope.languagesx].card1_title
 $scope.card1_desc = data.data[$scope.languagesx].card1_desc

 $scope.card2_title = data.data[$scope.languagesx].card2_title
 $scope.card2_desc = data.data[$scope.languagesx].card2_desc

 $scope.card3_title = data.data[$scope.languagesx].card3_title
 $scope.card3_desc = data.data[$scope.languagesx].card3_desc

 $scope.card4_title = data.data[$scope.languagesx].card4_title
 $scope.card4_desc = data.data[$scope.languagesx].card4_desc

 $scope.card5_title = data.data[$scope.languagesx].card5_title
 $scope.card5_desc = data.data[$scope.languagesx].card5_desc

 $scope.card6_title = data.data[$scope.languagesx].card6_title
 $scope.card6_desc = data.data[$scope.languagesx].card6_desc


 $scope.trans_create_account  = data.data[$scope.languagesx].trans_create_account
 $scope.trans_sign_in  = data.data[$scope.languagesx].trans_sign_in

 $scope.trans_full_name = data.data[$scope.languagesx].trans_full_name
 $scope.trans_email = data.data[$scope.languagesx].trans_email
 $scope.trans_password = data.data[$scope.languagesx].trans_password
 $scope.trans_cpassword = data.data[$scope.languagesx].trans_cpassword
 $scope.trans_agrm = data.data[$scope.languagesx].trans_agrm

})



})
