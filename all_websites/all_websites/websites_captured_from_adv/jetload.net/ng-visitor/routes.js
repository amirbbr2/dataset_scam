var routerApp = angular.module('routerApp', ['ngRoute']);
routerApp.config(function(    $routeProvider) {

$routeProvider
.when('/home', {
    templateUrl: '/jet/ng/ressources/dashboard.html' ,
    controller: 'DashboardController'
})


.when('/', {
    templateUrl: '/ng-visitor/html/homepage.html' ,
    controller: 'homepage'
})

.when('/v/:t', {
    templateUrl: '/ng-visitor/html/play.html' ,
    controller: 'play'
})
.when('/v/:t/:n', {
    templateUrl: '/ng-visitor/html/play.html' ,
    controller: 'play'
})






//Test

.when('/test/:t', {
    templateUrl: '/ng-visitor/html/playtest.html' ,
//    controller: 'playtest'
})
.when('/test/:t/:n', {
    templateUrl: '/ng-visitor/html/playtest.html' ,
    controller: 'playtest'
})


//End Test


.when('/d/:t', {
    templateUrl: '/ng-visitor/html/download.html' ,
    controller: 'download'
})
.when('/d/:t/:n', {
    templateUrl: '/ng-visitor/html/download.html' ,
    controller: 'download'
})

/********************Visitor Side***************************/
.when('/Abuse-report', {
    templateUrl: '/ng-visitor/html/visitor/Abuse-report.html' ,
    controller: 'AbuseController'
})

.when('/Terms', {
    templateUrl: '/ng-visitor/html/visitor/ToS.html' ,
  //  controller: 'AbuseController'
})

.when('/Privacy', {
    templateUrl: '/ng-visitor/html/visitor/Privacy.html' ,
  //  controller: 'AbuseController'
})

.when('/DMCA', {
    templateUrl: '/ng-visitor/html/visitor/DMCA.html' ,
  //  controller: 'AbuseController'
})

.when('/Partner', {
    templateUrl: '/ng-visitor/html/visitor/affiliate.html' ,
    controller: 'partner'
})

/*
.when('/', {
    templateUrl: '/jet/ng/ressources/visitor/homepage.html' ,
  //  controller: 'AbuseController'
})
*/

.when('/api_docs', {
    templateUrl: '/jet/ng/ressources/visitor/api_docs.html' ,
  //  controller: 'AbuseController'
})




     .otherwise({ redirectTo: '/' });
});
