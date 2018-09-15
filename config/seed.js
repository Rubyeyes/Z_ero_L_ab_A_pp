var mongoose = require('mongoose');

var Admin = mongoose.model('Admin');
var User = mongoose.model('User');
var Food = mongoose.model('Food');
var ArticleCategory = mongoose.model('ArticleCategory');
var Article = mongoose.model('Article');
var RecipeCategory = mongoose.model('RecipeCategory');
var Recipe = mongoose.model('Recipe');
var WebBanner = mongoose.model('WebBanner');
// var Info = mongoose.model('Info');
// var Fleet = mongoose.model('Fleet');
// var Service = mongoose.model('Service');
// var Image = mongoose.model('Image');
// var Order = mongoose.model('Order');

User.remove({}, function(err) {
	if (err) {
	} else {
		var user1 = new User();
		user1.username = 'Test User';
		user1.email = 'test@example.com';
		user1.role = 'user';
		user1.setPassword('test');
		user1.save(function(err) {
			if(err){return next(err);}
		});
	}
});

Admin.remove({}, function(err) {
	if (err) {
	} else {
		var admin = new Admin();
		admin.email = 'admin@example.com';
		admin.role = 'admin';
		admin.setPassword('admin');
		admin.save(function(err) {
			if(err){return next(err);}
		});
	}
});

ArticleCategory.remove({}, function(err) {
	if (err) {
		console.log(err);
	} else {
		var articleCategory = new ArticleCategory();	
	    articleCategory.title = "认识生酮饮食"; 
	    articleCategory.order = 0;
	    articleCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var articleCategory = new ArticleCategory();	
	    articleCategory.title = "科学、原理";
	    articleCategory.order = 1;
	    articleCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var articleCategory = new ArticleCategory();	
	    articleCategory.title = "开始生酮饮食前必读";
	    articleCategory.order = 2; 
	    articleCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })
	}
});

Article.remove({}, function(err) {
	if (err) {
		console.log(err);
	}
});

RecipeCategory.remove({}, function(err) {
	if (err) {
		console.log(err);
	} else {
		var recipeCategory = new RecipeCategory();	
	    recipeCategory.title = "食谱1"; 
	    recipeCategory.order = 0;
	    recipeCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var recipeCategory = new RecipeCategory();	
	    recipeCategory.title = "食谱2";
	    recipeCategory.order = 1;
	    recipeCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var recipeCategory = new RecipeCategory();	
	    recipeCategory.title = "食谱3";
	    recipeCategory.order = 2; 
	    recipeCategory.save(function(err) {
	    	if(err) {return next(err);}
	    })
	}
});

Recipe.remove({}, function(err) {
	if (err) {
		console.log(err);
	}
});

WebBanner.remove({}, function(err) {
	if (err) {
		console.log(err);
	} else {
		var webbanner = new WebBanner();	
	    webbanner.title = "Banner1"; 
	    webbanner.imgUrl = "https://cdn-images-1.medium.com/max/1000/1*0UZVaGJlOZ3YGyNW_hmtEw.jpeg";
	    webbanner.order = '0';
	    webbanner.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var webbanner = new WebBanner();	
	    webbanner.title = "Banner2";
	    webbanner.imgUrl = "https://www.joiiup.com/public/knowledgePic/201804111812451343_FB.jpg";
	    webbanner.order = '1';
	    webbanner.save(function(err) {
	    	if(err) {return next(err);}
	    })

	    var webbanner = new WebBanner();	
	    webbanner.title = "Banner3";
	    webbanner.imgUrl = "https://www.elle.com.hk/var/ellehk/storage/images/beauty_and_health/diet_fitness/ketogenic-diet-myth-and-facts/thinkstockphotos-856847176/24318125-1-chi-HK/ThinkstockPhotos-856847176_img_885_590.jpg"; 
	    webbanner.order = '2';
	    webbanner.save(function(err) {
	    	if(err) {return next(err);}
	    })
	}
});

// Food.remove({}, function(err) {
// 	if(err) {
// 		console.log(err);
// 	}
// });

// Info.remove({}, function(err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		var info = new Info();	
// 	    info.instagram = "http://www.instagram.com";
// 	    info.google_plus = "https://plus.google.com/";
// 	    info.facebook = "http://www.facebook.com";
// 	    info.weibo = "http://www.weibo.com";
// 	    info.qq = "http://w.qq.com/";
// 	    info.wechat = "https://web.wechat.com/";
// 	    info.email = "tianchangan@hotmail.com";
// 	    info.address = "123 abc st. city, ca 12345";
// 	    info.phone_number = "+1-234-567-8901";
// 	    info.company_info = "The 2016 Escalade and Escalade ESV are a perfect combination of sophistication, functionality and technology. At home on all roads, they deliver powerful performance when you need it. Created with craftsmanship not seen in other SUVs, the refined lines and features make one thing immediately apparent – it is first and foremost a Cadillac.";
// 	    info.company_name = "UE Limo Group";

// 	    info.sales = "Escalade $10/Hour";
// 	    info.daily = "All car $100/Day";

// 	    info.type = "info";
	    
// 	    info.save(function(err) {
// 	    	if(err) {return next(err);}
// 	    })
// 	}
// });

// Fleet.remove({}, function(err) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		var fleet = new Fleet();		
// 		fleet.brand = "Toyota" ;
// 		fleet.type = "Camry" ;
// 		fleet.description = "Nice fancy car" ;
// 		fleet.price = 12;
// 		fleet.price_day = 120;
// 		fleet.save(function(err) {
// 			if(err) {return next(err);}
// 		}) 

// 		var fleet2 = new Fleet();		
// 		fleet2.brand = "Honda" ;
// 		fleet2.type = "Accord" ;
// 		fleet2.description = "Cheap car" ;
// 		fleet2.price = 9;
// 		fleet2.price_day = 90;
// 		fleet2.save(function(err) {
// 			if(err) {return next(err);}
// 		}) 
// 	}
// });

// Service.remove({}, function(err) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		var service = new Service();		
// 		service.name = "Transfer to airport";
// 		service.description = "Help to pickup and drop off to LAX";
// 		service.price = 200;
// 		service.save(function(err) {
// 			if(err) {return next(err);}
// 		})
// 	}
// })

// Image.remove({}, function(err) {
// 	if(err) {return next(err);}
// })

// Order.remove({}, function(err) {
// 	if(err) {return next(err);}
// })
