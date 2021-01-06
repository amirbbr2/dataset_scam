routerApp.controller('download', function ($scope,$http,$routeParams) {
  var streamcode = $routeParams.t

  var referer = document.referrer;


  console.log(referer);


  $('#bigbanner').hide()

  $http.get('/api/get_direct_video/'+streamcode).then(function(x){


    function loadjscssfile(filename, filetype){
        if (filetype=="js"){ //if filename is a external JavaScript file
            var fileref=document.createElement('script')
            fileref.setAttribute("type","text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
            var fileref=document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref!="undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    }


    // Ads

    loadjscssfile('//newtueads.com/0e/3d/ac/0e3dac2680bdb723e13db9077657c718.js','js')
    loadjscssfile('/adcash.js','js')
    loadjscssfile('//deloplen.com/apu.php?zoneid=2591727','js')


/*
    $http.get('/api/get/ads').then(function(x){
      var ad = x.data

    $('.ads').append('<script type="text/javascript" src="//newmonads.com/0e/3d/ac/0e3dac2680bdb723e13db9077657c718.js"></script>')



    })
*/


    var data = x.data;
console.log(data);


if (data.type == 'deleted') {
$('#start').hide()
$('#file_information').hide(500)
$('#file_removed').show(200)

}


if (x.data.file.encoding_status == 'file') {

console.log(x.data.file.origin_filename);
$scope.dfile_name = x.data.file.origin_filename
$scope.dfile_size = bytesToSize(x.data.file.file_size)

$scope.download_file = function(){
$('#file_information').hide(500)
$('#download_now').show(500)
}


$scope.download_ready = function(){


  $http({
    method:'post',
    url:'/api/download',
    data:{file_name:x.data.file.file_name+'.'+x.data.file.file_ext,srv:x.data.file.srv_id}
  }).then(function(xd){



$('#start').hide(200)
$('#download').show(200)

console.log(x);
$http({
method: 'POST',
url: '/count',
data:{ip:x.data.csrf,file_id:x.data.file.id,file_owner:x.data.file.file_owner,referer:referer}
}).then(function(d){
console.log(d);

})

console.log(x.data);

var  link = document.createElement("a"); //create 'a' element
  link.setAttribute("href", xd.data); //replace "file" with link to file you want to download
  link.setAttribute("download", xd.data);// replace "file" here too
  link.click(); //virtually click <a> element to initiate download

})



}



}





})


})
