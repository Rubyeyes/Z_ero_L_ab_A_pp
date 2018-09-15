var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');
var wechat = require('wechat');

var app = express();

// import environment configuration
var config = require('../config/environment/development');
var wechatConfig = config.wechatConfig;

app.use(express.query());

/* ========================================================== 
wechat api
============================================================ */
router.use('/', wechat(wechatConfig, function (req, res, next) {
		var message = req.weixin;

		if (message.MsgType === 'text') {
			switch (message.Content) {
				case '提问': res.reply({
			      content: '如果是一般的问题，可以直接微信留言，不过师姐有时可能会看漏……\n如果是特别重要的问题，可以发到师姐的邮箱：xketolab@gmail.com，师姐会争取在三天内答复。',
			      type: 'text'
			    });

			    case '松仁': res.reply({
			      content: '松仁（每100g）\n⚠ 可适量吃哦\n脂肪：68g\n碳水化合物：13g\n膳食纤维：3.7g\n蛋白质：14g',
			      type: 'text'
			    }); 

			    default: res.reply({
			      content: ' (●ﾟωﾟ●)我很有可能不在线~\n\n要不要考虑一下回复「提问」？\n\n☀️点击下面的菜单，开始生酮之旅……\n↓↓↓',
			      type: 'text'
			    });


			}

		} else if(message.MsgType === 'event') {
			switch (message.Event) {
				case 'subscribe': res.reply({
					content: ' 喵！\n终于等到了你了哇ヾ(o◕∀◕)ﾉ\n\n我是师姐，以前学营养学和医学信息，有4年临床营养学研究经验，现在在洛杉矶一家公司做营养顾问。\n谢谢你的关注！\n么么哒！(●´З｀●)\n\n🙋🏻有任何关于生酮饮食的问题，请回复「提问」\n☀️点击菜单，开始生酮之旅……\n↓↓↓',
			      	type: 'text'
				})
			}
		}
		
	})
);

module.exports = router;