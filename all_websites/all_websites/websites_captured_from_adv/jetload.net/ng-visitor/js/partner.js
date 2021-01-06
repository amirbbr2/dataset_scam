routerApp.controller('partner', function ($scope,$http) {

console.log('hey');

$http.get('/api/get/rewards').then(function(data){
//.tier1.countries.Tiers
var tier = data.data.Tiers
var tier1 = tier.tier1.countries;

console.log(tier1.CA);

for (var i = 0; i < tier.tier1.countries.length; i++) {
 console.log(tier[i]);
}



})


})
