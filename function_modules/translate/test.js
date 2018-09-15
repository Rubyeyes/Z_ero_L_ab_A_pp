
console.log("I am doing my 5 minutes check");
for(var i = 0; i<2; i++) {	(function() {

		var minutes = 0.1, the_interval = minutes * 60 * 1000;
		setInterval(function() {
		  console.log("I am doing my 5 minutes check");
		  // do your stuff here
		}, the_interval);
	})
}

// var minutes = 0.1, the_interval = minutes * 60 * 1000;
// console.log("I am doing my 5 minutes check");
// setInterval(function() {
// 	console.log("I am doing my 5 minutes check");
// 	// do your stuff here
// }, the_interval);