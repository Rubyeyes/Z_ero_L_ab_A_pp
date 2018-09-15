var googleTranslate = require('google-translate')(process.env.API_KEY);
var mongoose = require('mongoose');
var Food = mongoose.model('Food');

// function delayFunc() {
// 	var abc = 1;
// }


Food.find({})
	.exec(function(err, foods) {
		if(err){return next(err);}
		for(var t = 0, i = t; i < t+300; i++) { (function(myFood) {
			if (typeof myFood.Shrt_Desc != undefined) {

				googleTranslate.translate(myFood.Shrt_Desc, 'zh_CN', function(err, translation) {
					if(err) {
						console.log(err);
					}
					myFood.Shrt_Desc_zh_CN = translation.translatedText;
					myFood.save();
					console.log(i);
					console.log(translation.translatedText)
				});

			}
		})(foods[i])

			// foods[i].Shrt_Desc_zh_CN = foods[i].Shrt_Desc;
			// foods[i].GmWt_Desc1_zh_CN = foods[i].GmWt_Desc1;
			// foods[i].GmWt_Desc2_zh_CN= foods[i].GmWt_Desc2;

			// console.log(foods[i].Shrt_Desc);

			// setTimeout(delayFunc, 30000);
			

			// function delayFunc() {
			// 	googleTranslate.translate('My name is Brandon', 'zh_CN', function(err, translation) {
			// 		if(err) {
			// 			console.log(err);
			// 		}
			// 	  console.log(translation.translatedText);
			// 	  // =>  Mi nombre es Brandon
			// 	});
			// }

		}
	});



// googleTranslate.translate('My name is Brandon', 'zh_CN', function(err, translation) {
//   console.log(translation.translatedText);
//   // =>  Mi nombre es Brandon
// });
