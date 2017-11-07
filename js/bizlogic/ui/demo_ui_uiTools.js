/**
 * 作者: dailc
 * 时间: 2016-06-12
 * 描述:  UI操作
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
			'css/libs/mui.picker.min.css',
			'css/libs/mui.poppicker.css',
			'js/libs/mui.min.js',
			'js/libs/mui.picker.min.js',
			'js/libs/mui.poppicker.js'
		], function() {
			initListeners();
		});
	}
	/**
	 * @description 监听
	 */
	function initListeners() {
		//提示
		mui('#header').on('tap', '#info', function() {
			var tips = '1.UI显示相关,封装一些常见UI显示\n';
			tips += '2.这里主要是同时兼容了H5与H5+形式\n';
			UITools.alert({
				content: tips,
				title: '说明',
				buttonValue: '我知道了'
			}, function() {
				console.log('确认alert');
			});
		});
		//创建测试actionSheet
		mui('.mui-content').on('tap', '#createTestActionSheet', function() {
			UITools.actionSheet(null, [{
				title: '1',
				value: '11',
				//className 只有h5版本有效
				className: 'ui-red'
			}, {
				title: '2'
			}], function(btn) {
				console.log('选择回调' + JSON.stringify(btn));
			});
		});
		//创建测试alert
		mui('.mui-content').on('tap', '#createTestAlert', function() {
			UITools.alert({
				content: '测试alert',
				title: '提示',
				buttonValue: '我知道了'
			}, function() {
				console.log('确认alert');
			});
		});
		//创建测试Confirm
		mui('.mui-content').on('tap', '#createTestConfirm', function() {
			UITools.confirm({
				content: '测试Confirm',
				title: '确认',
				buttons: ['确定', '取消']
			}, function(index) {
				console.log('选择了:' + index);
			});
		});
		//显示测试等待框
		mui('.mui-content').on('tap', '#showTestWaitingDialog', function() {
			UITools.showWaiting('测试waiting', {
				padlock: true,
				loading: {
					display: 'inline',
					icon: '../../img/img_voice_icon.png'
				}
			});
		});
		//创建测试日期选择框
		/*
		 * rs.value 拼合后的 value
		 * rs.text 拼合后的 text
		 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
		 * rs.m 月，用法同年
		 * rs.d 日，用法同年
		 * rs.h 时，用法同年
		 * rs.i 分（minutes 的第二个字母），用法同年
		 */
		mui('.mui-content').on('tap', '#createTestDatePicker', function() {
			var cDate = new Date('2015-10-10');
			var bDate = new Date('2014-10-10');
			var eDate = new Date('2016-10-10');
			UITools.pickDate({
				title: '选择日期',
				date: cDate,
				minDate: bDate,
				maxDate: eDate
			}, function(rs, year, month, day) {
				console.log('选择的年,月,日为:' + rs.y.value + '年' + rs.m.value + '月' + rs.d.value + '日');
				console.log('确认年月日:' + year + '年' + month + '月' + day + '日')
			});
		});
		//创建测试时间选择框
		mui('.mui-content').on('tap', '#createTestTimePicker', function() {
			var cDTime = new Date('2015-10-10 02:10');
			UITools.pickTime({
				title: '选择时间',
				is24Hour: true,
				dTime: cDTime
			}, function(rs, hour, min) {
				console.log('选择的时,分为:' + rs.h.value + '时' + rs.i.value + '分');
				console.log('确认时分:' + hour + '时' + min + '分')
			});
		});
		//创建测试月份选择框
		mui('.mui-content').on('tap', '#createTestMonthPicker', function() {
			var cDate = new Date('2015-10-10');
			var bDate = new Date('2014-10-10');
			var eDate = new Date('2016-10-10');
			UITools.pickDate({
				title: '选择日期',
				date: cDate,
				minDate: bDate,
				maxDate: eDate,
				type: 'month'
			}, function(rs, year, month, day) {
				console.log('选择的年,月,日为:' + rs.y.value + '年' + rs.m.value + '月' + rs.d.value + '日');
				console.log('确认年月日:' + year + '年' + month + '月' + day + '日')
			});
		});
		//创建测试日期时间选择框
		mui('.mui-content').on('tap', '#createTestDateTimePicker', function() {
			var cDTime = new Date('2015-3-10 2:10');
			UITools.pickDateTime({
				dateTime: cDTime,
				'beginYear': '2012',
				'endYear': null
			}, function(rs, year, month, day, hour, min) {
				console.log('选择的年,月,日,时,分为:' + year + '年' + month + '月' + day + '日' + hour + '时' + min + '分');
			});
		});
		//创建测试输入框
		mui('.mui-content').on('tap', '#createTestInput', function() {
			UITools.prompt({
				content: '输入内容',
				title: '输入框',
				tip: '请输入',
				buttons: ['确定', '取消']
			}, function(text) {
				console.log('输入的内容:' + text);
			});
		});
		//创建测试toast
		mui('.mui-content').on('tap', '#createTestToast', function() {
			UITools.toast('测试toast', {
				icon: '../../img/img_voice_icon.png'
			});
		});
		//创建测试Poper
		mui('.mui-content').on('tap', '#createTestPoper', function() {
			UITools.showPopPicker([{
				value: 'value1',
				text: 'text1'
			}, {
				value: 'value2',
				text: 'text2'
			}], function(text, value, item) {
				console.log('选择的text:' + text + ',value:' + value + ',原始item:' + JSON.stringify(item));
			});
		});
		//创建测试二级Poper
		mui('.mui-content').on('tap', '#createTestLayer2Poper', function() {
			UITools.showPopPicker([{
				value: 'value111',
				text: 'text111',
				children: [{
					value: 'value11',
					text: 'text11',
				}, {
					value: 'value12',
					text: 'text12',
				}]
			}, {
				value: 'value222',
				text: 'text222',
				children: [{
					value: 'value21',
					text: 'text21',
				}, {
					value: 'value22',
					text: 'text22',
				}]
			}], function(text, value, item, items) {
				console.log('选择的text:' + text + ',value:' + value + ',原始item:' + JSON.stringify(item));
			}, 2);
		});
		//创建测试3级Poper
		mui('.mui-content').on('tap', '#createTestLayer3Poper', function() {
			UITools.showPopPicker([{
				value: '110000',
				text: '北京市',
				children: [{
					value: "110101",
					text: "北京市",
					children: [{
						value: "110101",
						text: "东城区"
					}, {
						value: "110102",
						text: "西城区"
					}, {
						value: "110103",
						text: "崇文区"
					}, {
						value: "110104",
						text: "宣武区"
					}, {
						value: "110105",
						text: "朝阳区"
					}, {
						value: "110106",
						text: "丰台区"
					}, {
						value: "110107",
						text: "石景山区"
					}, {
						value: "110108",
						text: "海淀区"
					}, {
						value: "110109",
						text: "门头沟区"
					}, {
						value: "110111",
						text: "房山区"
					}, {
						value: "110112",
						text: "通州区"
					}, {
						value: "110113",
						text: "顺义区"
					}, {
						value: "110114",
						text: "昌平区"
					}, {
						value: "110115",
						text: "大兴区"
					}, {
						value: "110116",
						text: "怀柔区"
					}, {
						value: "110117",
						text: "平谷区"
					}, {
						value: "110228",
						text: "密云县"
					}, {
						value: "110229",
						text: "延庆县"
					}, {
						value: "110230",
						text: "其它区"
					}]
				}]
			}, {
				value: '120000',
				text: '天津市',
				children: [{
					value: "120100",
					text: "天津市",
					children: [{
						value: "120101",
						text: "和平区"
					}, {
						value: "120102",
						text: "河东区"
					}, {
						value: "120103",
						text: "河西区"
					}, {
						value: "120104",
						text: "南开区"
					}, {
						value: "120105",
						text: "河北区"
					}, {
						value: "120106",
						text: "红桥区"
					}, {
						value: "120107",
						text: "塘沽区"
					}, {
						value: "120108",
						text: "汉沽区"
					}, {
						value: "120109",
						text: "大港区"
					}, {
						value: "120110",
						text: "东丽区"
					}, {
						value: "120111",
						text: "西青区"
					}, {
						value: "120112",
						text: "津南区"
					}, {
						value: "120113",
						text: "北辰区"
					}, {
						value: "120114",
						text: "武清区"
					}, {
						value: "120115",
						text: "宝坻区"
					}, {
						value: "120116",
						text: "滨海新区"
					}, {
						value: "120221",
						text: "宁河县"
					}, {
						value: "120223",
						text: "静海县"
					}, {
						value: "120225",
						text: "蓟县"
					}, {
						value: "120226",
						text: "其它区"
					}]
				}]
			}], function(text, value, item,items) {
				console.log('选择的text:' + text + ',value:' + value + ',原始item:' + JSON.stringify(item)+',实际值:'+JSON.stringify(items));
			}, 3);
		});
	}
});