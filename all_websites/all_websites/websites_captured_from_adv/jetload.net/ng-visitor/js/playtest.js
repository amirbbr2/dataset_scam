routerApp.controller('playtest', function ($scope,$http,$routeParams) {
var streamcode = $routeParams.t
console.log('scoped');
function video_player(type,source,file_name,server,logo,file_idx,file_ownerx,csrfx,subtitle){
//  $scope.bigbanner = true
  $('#bigbanner').hide()


  if (subtitle) {
    var sub_src = 'https://jetload.net/tmp/'+subtitle
  }
  else
  {
    var sub_src = '/embed/0yXGR.srt';
  }




  var spriteSheetUrl = server+'/v2/schema/'+file_name+'/thumbnails1.jpg';
  var numThumbs = 300;
  var thumbWidth = 126;
  var thumbHeight = 73;
  var numColumns = 10;
  var timeInterval = 60;
  var thumbs = ClapprThumbnailsPlugin.buildSpriteConfig(spriteSheetUrl, numThumbs, thumbWidth, thumbHeight, numColumns, timeInterval);
console.log(logo);
var player = new Clappr.Player({
        parentId: "#player",
source: source,
preload: 'metadata',
poster:server+'/v2/schema/'+file_name+'/thumbnails1.jpg',
watermark: logo, position: 'top-left',

        plugins:  {
        //  [ClapprNerdStats],[ClapprStats],

          core: [ClapprThumbnailsPlugin,LevelSelector,ClapprSubtitle],
          playback: [CDNByeClapprPlugin],

        },

        subtitle : {
    src : sub_src,
    auto : false, // automatically loads subtitle
    backgroundColor : 'transparent',
    fontWeight : 'normal',
    fontSize : '14px',
    color: 'yellow',
    textShadow : '1px 1px #000'
},



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

externalTracks: [
{
   src: 'effe',
   label: "Upload SRT"
},
{
  "language": "pt-BR",
  "languageName": "Português",
  "src": "resources/subtitles/pt-BR.vtt",
  "id": 0,
  "lang": "pt-BR",
  "label": "Português",
  "kind": "subtitles"
},


],



            hlsjsConfig: {
                 maxBufferSize: 0,       // Highly recommended setting
              maxBufferLength: 5,     // Highly recommended setting
              liveSyncDuration: 30,   // Highly recommended setting


            },

            p2pConfig: {
                     logLevel: 'debug',
                     live: false,        // set to true in live mode
                     getStats: function (totalP2PDownloaded, totalP2PUploaded, totalHTTPDownloaded) {
                         var total = totalHTTPDownloaded + totalP2PDownloaded;
                         console.log(total);
                    //     document.querySelector('#info').innerText = `p2p ratio: ${Math.round(totalP2PDownloaded/total*100)}%, saved traffic: ${totalP2PDownloaded}KB, uploaded: ${totalP2PUploaded}KB`;
                     },
                   },




              crossOrigin: 'anonymous', // Required if track loaded from another domain
        },

    });

    var count_play = 0

    player.on(Clappr.Events.PLAYER_PLAY, function() {
      count_play+=1

      if (count_play == 1) {
        $http({
        method: 'POST',
        url: '/count',
        data:{ip:csrfx,file_id:file_idx,file_owner:file_ownerx}
        }).then(function(d){

        })

      }

})


}





$http.get('/api/get_direct_video/'+streamcode).then(function(x){



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
video_player('mp4',xz.data,x.data.file.file_name,x.data.file.srv_id,logo,x.data.file.id,x.data.file.file_owner,data.csrf,x.data.file.file_subtitle)

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



if (file_low == 1 && file_med == 1) {
var video_url = server+'/v2/schema/'+file_name+'/master.m3u8'
console.log('its master');
}
else if(file_low != 1 ){
var video_url = server+'/v2/schema/'+file_name+'/med.m3u8'
console.log('its led');
}
else  {
var video_url = server+'/v2/schema/'+file_name+'/low.m3u8'
console.log("its low");
}


/**********Start The Video Player ************/
video_player('hls',video_url,file_name,server,logo,x.data.file.id,x.data.file.file_owner,data.csrf,x.data.file.file_subtitle)

}


})



})
