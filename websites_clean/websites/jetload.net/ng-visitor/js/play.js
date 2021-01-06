routerApp.controller('play', function ($scope,$http,$routeParams) {
var streamcode = $routeParams.t
document.location.href = "https://jetload.net/e/"+streamcode;
return;

var referer = document.referrer;



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




function video_player(type,source,file_name,server,logo,file_idx,file_ownerx,csrfx,subtitle,archive){
//  $scope.bigbanner = true
  $('#bigbanner').hide()

  if (archive == 1) {
  var spriteSheetUrl = server+'/v2/schema/archive/'+file_name+'/thumbnails1.jpg';
  }
  else {
  var spriteSheetUrl = server+'/v2/schema/'+file_name+'/thumbnails1.jpg';
  }
  //var spriteSheetUrl = server+'/v2/schema/'+file_name+'/thumbnails1.jpg';
  var numThumbs = 300;
  var thumbWidth = 126;
  var thumbHeight = 73;
  var numColumns = 10;
  var timeInterval = 60;
  var thumbs = ClapprThumbnailsPlugin.buildSpriteConfig(spriteSheetUrl, numThumbs, thumbWidth, thumbHeight, numColumns, timeInterval);

$http.get('https://jetload.net/api/get/subtitles/'+file_idx+'').then(function(sub){
var new_sub_arr = []
var sub = sub.data

if (type == 'hls') {
  for (var i = 0; i < sub.length; i++) {
  new_sub_arr.push({src:'/api/read/subtitles/'+sub[i].sub_file,label:sub[i].sub_lang})
}
}


if (type == 'mp4') {
  for (var i = 0; i < sub.length; i++) {
  new_sub_arr.push({src:'/tmp/'+sub[i].sub_file,label:sub[i].sub_lang})
}
}

const config = {

  segments:{
// number of segments to pass for processing to P2P algorithm
forwardSegmentCount:50, // usually should be equal or greater than p2pDownloadMaxPriority and httpDownloadMaxPriority
},

 loader: {
   trackerAnnounce: [
      "wss://hlsplay.com:8433",
   ],
cachedSegmentExpiration:86400000,
cachedSegmentsCount:1000,
requiredSegmentsPriority:3,
httpDownloadMaxPriority:9,
httpDownloadProbability:0.06,
httpDownloadProbabilityInterval: 1000,
httpDownloadProbabilitySkipIfNoPeers: true,
p2pDownloadMaxPriority: 50,
simultaneousP2PDownloads:50,
httpUseRanges: true,
 }
};


if (p2pml.hlsjs.Engine.isSupported()) {
  var engine = new p2pml.hlsjs.Engine(config);

var player = new Clappr.Player({
        parentId: "#player",
source: source,
preload: 'metadata',
playback: {
                  hlsjsConfig: {
                      liveSyncDurationCount: 7,
                      loader: engine.createLoaderClass()
                  }
                },
poster:spriteSheetUrl,
watermark: logo, position: 'top-left',

        plugins:  {
        //  [ClapprNerdStats],[ClapprStats],

          core: [ClapprThumbnailsPlugin,LevelSelector],

        },
    /*    logo: {
    path: logo,
  }, */

  scrubThumbnails: {
    backdropHeight: 64, // set to 0 or null to disable backdrop
        spotlightHeight: 84, // set to 0 or null to disable spotlight
        backdropMinOpacity: 0.4, // optional
        backdropMaxOpacity: 1, // optional
        thumbs: thumbs

},


        levelSelectorConfig: {
title: 'Quality',
labels: {
2: '720P', // 500kbps
1: '480P', // 240kbps
0: '360P', // 120kbps
},
disableVideoTagContextMenu: true,
events: {
onReady: function() {  },
},

},
mediacontrol: {seekbar: "#d8a114", buttons: "#a232bc"},
mute: false,
        autoPlay: false,
        playback: {

externalTracks: new_sub_arr,





              crossOrigin: 'anonymous', // Required if track loaded from another domain
        },

    });
  }
    p2pml.hlsjs.initClapprPlayer(player);

    engine.on("peer_connect", peer => console.log("peer_connect", peer.id));
  engine.on("peer_close", peerId => console.log("peer_close", peerId));
  engine.on("Events.PieceBytesDownloaded", function (method, bytes, peerId) {

  console.log('downloaded:'+bytes+'from:'+peerId);


  })

    var count_play = 0

    $('div.cc-controls').show()


    player.on(Clappr.Events.PLAYER_PLAY, function() {
      count_play+=1

      if (count_play == 1) {
        $http({
        method: 'POST',
        url: '/count',
        data:{ip:csrfx,file_id:file_idx,file_owner:file_ownerx,referer:referer}
        }).then(function(d){

        })

      }

})
})
// Before this line

}





$http.get('/api/get_direct_video/'+streamcode).then(function(x){

/*
  $http.get('/api/get/ads').then(function(x){

  $('.ads').append('<script type="text/javascript" src="//newmonads.com/0e/3d/ac/0e3dac2680bdb723e13db9077657c718.js"></script>')

  })
*/

  var script = document.createElement('script');
  script.src = '//newmonads.com/0e/3d/ac/0e3dac2680bdb723e13db9077657c718.js'
  var scriptx = document.createElement('script');
  scriptx.src = '//deloplen.com/apu.php?zoneid=2591727'


var data = x.data;
var logo = data.logo

if (logo == 'empty') {
  var logo = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
}
else {
var logo = '/user_logo/'+logo
}

console.log(x.data.type);

if (x.data.type == 'deleted') {
  $('.v_info').hide()
  $('#file_information').hide(500)
  $('#file_removed').show(200)
}

if (x.data.type == 'pending') {
  $('.v_info').hide()
  $('#file_information').hide(500)
  $('.encoding_info').show(200)
  var id = x.data.file.srv_id


  $http.get('/api/srv/'+id+'').then(function(x){


    var url = x.data.hostname
    var url = url.split('https://').join('');
    var usr_id = '13';//$('#username').val();
    ws = adonis.Ws('wss://'+url+'').connect()
    ws.on('open', () => {
    console.log('connected');
    ws.getSubscription('files').emit('message',usr_id)
    })
    ws.on('error', () => {
      console.log('We got a error');
    })
    const reply = ws.subscribe('files')
    reply.on(usr_id,function(d){


    // Low Quality
    /*
    var low_stats = JSON.parse(d.new_val.stats_low)
    var low_percent = low_stats.percent
    console.log(d.new_val.user_id);
    $('#min').text('360P Quality Encoding '+low_percent.toFixed()+'%')

    // Med Quality
    if (d.new_val.stats_med) {
      var med_stats = JSON.parse(d.new_val.stats_med)
      var med_percent = med_stats.percent
      $('#low').text('480P Quality Encoding '+med_percent.toFixed()+'%')
    }
    // High Quality
    if (d.new_val.stats_high) {
    var high_stats = JSON.parse(d.new_val.stats_high)
    var high_percent = high_stats.percent
    $('#med').text('720P Quality Encoding '+high_percent.toFixed()+'%')
    }
*/


    })

  })



}



if (x.data.type == 'mp4') {
//https://jetsrv01.jetload.net/v2/schema/downloads/B9uUOzLRZGsAJjcYMPHc.mp4?md5=Gjmg8Tarx-MfZPsQMmCLxQ&expires=1555600021

$http({
  url:'/api/download',
  method:'post',
  data:{file_name:x.data.file.file_name+'.mp4',srv:x.data.file.srv_id}
}).then(function(xz){
console.log(xz);

console.log(xz.data);
video_player('mp4',xz.data,x.data.file.file_name,x.data.file.srv_id,logo,x.data.file.id,x.data.file.file_owner,data.csrf,x.data.file.file_subtitle,x.data.file.archive)

})

$scope.file_name = data.file.origin_filename
$scope.file_format = data.type.toUpperCase();
$scope.file_size = bytesToSize(data.file.file_size)

return ;

}







if (data.type == 'hls') {
  var file_low = data.file.low
  var file_med = data.file.med
  var file_high = data.file.high

  var server = data.server.hostname
  var file_name = data.file.file_name
  var csrf = data.csrf
  var file_id = data.file.file_id
  var usr =  data.file.file_owner

  $scope.file_name = data.file.origin_filename
  $scope.file_format = data.type.toUpperCase();
  $scope.file_size = bytesToSize(data.file.file_size)


if (data.file.provider == 'HLSPlay') {
//  var video_url = server+'/v2/schema/archive/'+file_name+'/master.m3u8'
  var video_url = server+'/hls_serve/'+file_name+'/pl2.m3u8'
}
else {
  var archive = data.file.archive
  if (file_low == 1 && file_med == 1) {
  if (archive == 1) {
    var video_url = server+'/v2/schema/archive/'+file_name+'/master.m3u8'
  }
  else {
    var video_url = server+'/v2/schema/'+file_name+'/master.m3u8'
  }

  }

  else if(file_low != 1 ){
  if (archive == 1) {
    var video_url = server+'/v2/schema/archive/'+file_name+'/med.m3u8'
  }
  else {
    var video_url = server+'/v2/schema/'+file_name+'/med.m3u8'
  }

  }

  else  {

    if (archive == 1) {
      var video_url = server+'/v2/schema/archive/'+file_name+'/low.m3u8'
    }
    else {
      var video_url = server+'/v2/schema/'+file_name+'/low.m3u8'
    }
    }
}





/**********Start The Video Player ************/
video_player('hls',video_url,file_name,server,logo,x.data.file.id,x.data.file.file_owner,data.csrf,x.data.file.file_subtitle,x.data.file.archive)

}


})



})
