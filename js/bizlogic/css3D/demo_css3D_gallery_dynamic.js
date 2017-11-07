/**
 * 作者: dailc
 * 时间: 2016-09-07
 * 描述: 3d动态照片墙
 */
define(function(require, exports, module) {
	"use strict";
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	// initready 要在所有变量初始化做完毕后
	CommonTools.initReady(initData);
	/**
	 * @description 初始化数据,结合initReady使用
	 * plus情况为plusready
	 * 其它情况为直接初始化
	 */
	function initData() {
		//引入必备文件,下拉刷新依赖于mui与mustache
		CommonTools.importFile([
			'js/libs/mui.min.js',
			'js/libs/Gallery3DEffect.js'
		], function() {
			initListeners();
			var width = window.innerWidth/2;
			//初始化舞台
			new Gallery3DEffect('#stage',["../../img/css3D/img_01.jpg", "../../img/css3D/img_02.jpg", "../../img/css3D/img_03.jpg", "../../img/css3D/img_01.jpg", "../../img/css3D/img_02.jpg", "../../img/css3D/img_03.jpg", "../../img/css3D/img_01.jpg", "../../img/css3D/img_02.jpg", "../../img/css3D/img_03.jpg"],{
				width:width ||200,
				height:300,
				perspective:3000||2000,
				rotateX:-10,
				rotateY:0
			}).init();
		});
	}
	/**
	 * @description 监听
	 */
	function initListeners() {
		//提示
		mui('#header').on('tap', '#info', function() {
			var tips = '1.3D动态照片墙\n';
			tips += '2.自己封装,实现动态图片生成照片墙效果\n';
			UITools.alert({
				content: tips,
				title: '说明',
				buttonValue: '我知道了'
			}, function() {
				console.log('确认alert');
			});
		});
	
	}
});