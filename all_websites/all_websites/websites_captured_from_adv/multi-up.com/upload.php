<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<script src="js/prototype.js" type="text/javascript"></script>  
<script src="js/scriptaculous.js" type="text/javascript"></script>
<script type="text/javascript">
function generate_32chars() {
    var return_string = '';
    for (var i = 0; i < 32; i++) {
        var tmp_rand = Math.ceil(2*Math.random());
        if (tmp_rand == 1)
            return_string += String.fromCharCode(97 + Math.round(Math.random() * 5));
        else
            return_string += String.fromCharCode(48 + Math.round(Math.random() * 9));
    }
    return return_string;
}

var x_progress_id = generate_32chars();

var action_is_set = false;
function set_action(form_id) {
	if (!action_is_set)
	{
    $(form_id).action += x_progress_id;
    action_is_set = true;
	}
}

function get_size(input_bytes) {
    if (input_bytes > 1024*1024)
        return Math.round(input_bytes / (1024*1024), 2) + 'MB';
    else
        return Math.round((input_bytes / 1024), 2) + 'KB';     
}

var update_interval = 3;

function get_speed(transferred_bytes) {
    return Math.round(transferred_bytes / (1024*update_interval)) + 'KB/s';
}

function time_left(left, speed)
{
	var seconds_left = Math.round(left / speed);
	var sec = seconds_left % 60;
	var min = Math.round(seconds_left / 60);
	if (min < 10)
	{
		min = '0' + min;
	}
	if (sec < 10)
	{
		sec = '0' + sec;
	}
	
	return min + ':' + sec;
}        

function start_updating() {
Effect.SlideDown('slidedown_div');

var prev_received = 0;

new PeriodicalExecuter(function(ff) {
    new Ajax.Request('/progress?X-Progress-ID=' + x_progress_id, {
    method: 'get',
        onSuccess: function(response) {
        	
            var ev = eval(response.responseText);
            
            if (ev.size == 0 || ev.size == ev.received || ev.state == 'error' || ev.state == 'done')           
                ff.stop();
            
            $('time_left_id').innerHTML = time_left(ev.size - ev.received, (ev.received - prev_received)/update_interval);
            $('already_uploaded_id').innerHTML = get_size(ev.received);
            $('total_size_id').innerHTML = get_size(ev.size); 
            $('update_speed_id').innerHTML = get_speed(ev.received - prev_received);
            $('progress2').style.width = Math.round(ev.received/ev.size*100) + '%'; 
            $('progress2').innerHTML = Math.round(ev.received/ev.size*100) + '%';
            prev_received = ev.received;
            
        }
    })
}, update_interval);

}

</script>
</head>
<body>

<form method="post" action="http://multi-up.com/up.php?X-Progress-ID=" enctype="multipart/form-data" id="testform" onsubmit="set_action('testform'); start_updating();">
    <input id="userfile" name="upload" type="file" />
    <input type="submit" value="залить" />
    <small>(max 100MB)</small>
    <br />
</form>
<div id="slidedown_div" style="display: none;">
<!-- style="display: none;" -->

<div id="progress1" style="padding: 2px; width: 300px; height: 30px; border: 1px solid black; ">
<div id="progress2" style="width: 0%; height: 100%;  text-align: center; font-weight: bold; font-size: 22px; vertical-align: middle; background-color: blue;">
&nbsp;
</div>
</div>

<table>
	<tr>
		<td>Осталось</td>
		<td id="time_left_id">-</td>
	</tr>
	<tr>
		<td>Скорость выгрузки</td>
		<td id="update_speed_id">-</td>
	</tr>
	<tr>
		<td>Загружено</td>
		<td><span id="already_uploaded_id">0</span> из <span id="total_size_id">-</span></td>
	</tr>
</table>

</div>
 
</body>
</html>