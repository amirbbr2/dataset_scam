routerApp.controller('AbuseController', function ($scope,$http) {

console.log('hey');

$scope.dmca_form = function(data){

$http({
  method:'POST',
  data:$scope.form_data,
  url:'/api/abuse'
}).then(function(){

alert('Thank you, We will handle your request as soon as possible')
$scope.form_data = {}
})



}



})
