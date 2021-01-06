$(document).ready(function(){
	wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100,
        callback:     function(box) {
          console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
        }
      }
    );
    wow.init();

	var percent 	= [0.40,0.60,0.80,1];
	var minMoney 	= [20,3001,7001,20001];
	var maxMoney	= [3000,7000,20000,200000];
	$("#amount").val(minMoney[0]);
	
	//Calculator
	function calc(){
		amount = parseFloat($("#amount").val());
		id = -1;
		var length = percent.length;
		var i = 0;
		do {
			if(minMoney[i] <= amount && amount <= maxMoney[i]){
				id = i;
				i = i + length;
			}
			i++
		}
		while(i < length)
		
		if(id != -1){

			profitHourly = amount / 100 * percent[id];
			profitHourly = profitHourly.toFixed(3);
			profitDaily = amount / 100 * percent[id] * 24;
			profitDaily = profitDaily.toFixed(3);
			profitWeekly = profitDaily * 7;
			profitWeekly = profitWeekly.toFixed(3);
			profitMonthly = profitDaily * 30;
			profitMonthly = profitMonthly.toFixed(3);


			if(amount < minMoney[id] || isNaN(amount) == true){
				$("#profitHourly").text("Error!");
				$("#profitDaily").text("Error!");
				$("#profitWeekly").text("Error!");
				$("#profitMonthly").text("Error!");
			} else {
				$("#profitHourly").text("$" + profitHourly);
				$("#profitDaily").text("$" + profitDaily);
				$("#profitWeekly").text("$" + profitWeekly);
				$("#profitMonthly").text("$" + profitMonthly);
			}
		} else {
			$("#profitHourly").text("Error!");
			$("#profitDaily").text("Error!");
			$("#profitWeekly").text("Error!");
			$("#profitMonthly").text("Error!");
		}
	}
	if($("#amount").length){
		calc();
	}
	$("#amount").keyup(function(){
		calc();
	});

});
