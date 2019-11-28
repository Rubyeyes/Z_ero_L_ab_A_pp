/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

module.exports = {
	seedDB: false,
	mode: 'dev',
	wechatConfig: {
	  token: 'xketolab0429',
	  appid: 'wxc097c7e19a255ff8',
	  encodingAESKey: 'KLCqlEIVAYahizKBYllhvUoktdrWO9gwoiuEOtTRnNz'
	},
	wechatConfigTest: {
	  token: 'xketolab0429',
	  appid: 'wx673df65ef31b77f1',
	  encodingAESKey: '7OfzGGG2NWhsqM0sfcOY82vWJarMN63NAC6C5QuVgrp'
	}
}

