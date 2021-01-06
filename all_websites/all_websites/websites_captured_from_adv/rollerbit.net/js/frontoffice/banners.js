$(document).ready(function(){
  	//Chart Total investments
    var banner_url = $('#banner-section').data('url');

    $.get(banner_url).then(setBanners);

    function setBanners(data) 
    {
    	if(data.banners.length)
    	{
    		let template = `<div class="col text-center"><a target="_blank" href="${data.banners[0].url}"><img src="${data.banners[0].file_url}" alt="banner1"></a></div>`;

    		$('#banner-section').append(template);
    	}

    	if(data.banners.length>1)
    	{
    		let template = `<div class="col text-center"><a target="_blank" href="${data.banners[1].url}"><img src="${data.banners[1].file_url}" alt="banner2"></a></div>`;

    		$('#banner-section').append(template);
    	}

        if(data.banners.length>2)
        {
            let template = `<div class="col text-center"><a target="_blank" href="${data.banners[2].url}"><img src="${data.banners[2].file_url}" alt="banner3"></a></div>`;

            $('#banner-section').append(template);
        }
    }
});
