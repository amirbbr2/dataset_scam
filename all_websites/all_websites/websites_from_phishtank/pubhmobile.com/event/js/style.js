$(document).ready(() => {
            $('.loader').fadeOut();
        })
        $('.claim').click(() => {
            $('.result').fadeOut();
            $('.login').fadeIn();
        })
        $('#fb').click(()=>{
            $('.login-facebook').fadeIn();
        })
        $('#tw').click(()=>{
            $('.login-twitter').fadeIn();
        })
        $('.close-fb').click(()=>{
            $('.login-facebook').fadeOut();
        })
        $('.close-other').click(()=>{
            $('.login-twitter').fadeOut();
        })
        const audio = document.createElement('audio');
        audio.setAttribute('src','media/spin.mp3');
        $('body').append(audio);
        function play(){
            document.getElementsByTagName('audio')[0].play();
            $('.result').fadeIn();
            $('.mask').show();
        }
        $('.start').click(() => {
            $('.hasil').remove();
            var acak = setInterval(() => {
            var a = $(".hadiah > .card").toArray();
            const random = Math.floor(Math.random() * 6);
            a[random].style.transform = "scale(1.1)";
            a[random].style.border = "2px solid white";
              setTimeout(() => {
                a[random].style.transform = "scale(1)";
                a[random].style.border = "2px solid red";
              },99)
        },100)
        let img = setInterval(() => {
            const random = Math.floor(Math.random() * 6) + 1;
            const imgs = document.createElement('img');
            imgs.setAttribute('src','img/reward/' + random + '.png');
            imgs.setAttribute('class','hasil');
            $('.append').append(imgs);
        },2000)
        setTimeout(() => {
            clearInterval(acak);
            clearInterval(img);
            $('.claim').show();
        },10100)
        })