/**
 * 作者: dailc
 * 时间: 2016-07-11
 * 描述: 直播点播 -乐视云直播
 */
define(function(require, exports, module) {
	"use strict";
	//每一个页面都要引入的工具类
	var CommonTools = require('CommonTools_Core');
	var WindowTools = require('WindowTools_Core');
	var UITools = require('UITools_Core');
	var KeyBoardTools = require('KeyBoardTools_Core');
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
			//乐视云直播的本地脚本
			//网络地址为http://yuntv.letv.com/player/live/blive.js
			'js/libs/blive.js'
		], function() {
			initListeners();
			init();
		});
	}
	/**
	 * @description 初始化
	 */
	function init() {
		(function() {
			function getUrlParams() {
				var flashVars = {
					"activityId": "A2016010500713",
					vu: "www.lecloud.com",
					ark: "106",
					"gpcflag": 1,
					"callbackJs": "TTVideoInit"
				};
				var url = window.location.search;
				if(url.indexOf("?") != -1) {
					var str = url.substr(1);
					var strs = str.split("&");
					for(var i = 0; i < strs.length; i++) {
						var key = strs[i].substr(0, strs[i].indexOf("="));
						var value = strs[i].substr(strs[i].indexOf("=") + 1);
						flashVars[key] = value;
					}
				}
				return flashVars;
			}
			var playerConf = getUrlParams();
			var p = new CloudLivePlayer();
			p.init(getUrlParams(), "player");
			var callBox = document.getElementById("callBackBox");

			function TTVideoInit(type, data) {
				var div = document.createElement("DIV");
				var myDate = new Date();
				div.innerHTML = "<span>" + myDate.toLocaleTimeString() + "</span>" + "===>" + "type:" + type + ";----data" + JSON.stringify(data);
				console && console.log(type, data);
				callBox.appendChild(div);
				var api = document.getElementById("${application}");
			}

			var apiArr = [{
					name: "playNewId",
					type: "set",
					info: "playNewId()",
					hasArgs: true,
					argtype: "object",
					default: '{"uu":"0d46d0f0cb","vu":"30a224d661"}'
				}, {
					name: "getVideoSetting",
					type: "get",
					info: "getVideoSetting()",
					hasArgs: false
				}, {
					name: "getVideoTime",
					type: "get",
					info: "getVideoTime()",
					hasArgs: false
				}, {
					name: "pauseVideo",
					type: "set",
					info: "pauseVideo()",
					hasArgs: false
				}, {
					name: "resumeVideo",
					type: "set",
					info: "resumeVideo()",
					hasArgs: false
				}
				//   ,{name:"seekTo",type:"set",info:"seekTo(100)",hasArgs:true,argtype:"number",default:100}
				//  ,{name:"replayVideo",type:"set",info:"replayVideo()", hasArgs:false}
				, {
					name: "closeVideo",
					type: "set",
					info: "closeVideo()",
					hasArgs: false
				}, {
					name: "setVolume",
					type: "set",
					info: "setVolume(1)",
					hasArgs: true,
					default: "0.5"
				}, {
					name: "shutDown",
					type: "set",
					info: "shutDown()",
					hasArgs: false
				}, {
					name: "startUp",
					type: "set",
					info: "startUp()",
					hasArgs: false
				}, {
					name: "setDefinition",
					type: "set",
					info: "setDefinition('1080p')",
					hasArgs: true,
					argtype: "string",
					default: "800"
				}, {
					name: "getDefinition",
					type: "get",
					info: "getDefinition()",
					hasArgs: false
				}, {
					name: "getDefaultDefinition",
					type: "get",
					info: "getDefinition()",
					hasArgs: false
				}, {
					name: "getDefinitionList",
					type: "get",
					info: "getDefinitionList()",
					hasArgs: false
				}
				//        ,{name:"setVideoPercent",type:"set",info:"setVideoPercent(1)",hasArgs:true,argtype:"number"}
				//        ,{name:"getVideoPercent",type:"get",info:"getVideoPercent()",hasArgs:false}
				//        ,{name:"setVideoScale",type:"set",info:"setVideoScale(1.777)",hasArgs:true,argtype:"number"}
				//        ,{name:"getVideoScale",type:"get",info:"getVideoScale()",hasArgs:false}
				//        ,{name:"resetVideoScale",type:"set",info:"resetVideoScale()",hasArgs:false,argtype:"number"}
				//        ,{name:"fullVideoScale",type:"set",info:"resetVideoScale()",hasArgs:false,argtype:"number"}
				//        ,{name:"setVideoRect",type:"set",info:"setVideoRect({'x':100,'y':100,'width':100,'height':100})",hasArgs:true,argtype:"object"}
				, {
					name: "getLoadPercent",
					type: "get",
					info: "getLoadPercent()",
					hasArgs: false
				}
				//        ,{name:"getDownloadSpeed",type:"get",info:"getDownloadSpeed()",hasArgs:false}
				//        ,{name:"getPlayRecord",type:"get",info:"getPlayRecord()",hasArgs:false}
				//        ,{name:"getPlayState",type:"get",info:"getPlayState()",hasArgs:false}
				//        ,{name:"setVideoColor",type:"set",info:"setVideoColor(50,50,50,50)",hasArgs:true,argtype:"int",num:4}
				//        ,{name:"getVideoColor",type:"get",info:"getVideoColor()",hasArgs:false}
				, {
					name: "getVersion",
					type: "get",
					info: "getVersion()",
					hasArgs: false
				}
				//   ,{name:"setAutoReplay",type:"set",info:"setAutoReplay(true)",hasArgs:true,argtype:"boolean",default:true}
			];
			//    var apiArr = [
			//        {name:"getBufferPercent",type:"get",info:"getBufferPercent()",hasArgs:false}
			//        ,{name:"getUsingUrl",type:"get",info:"getUsingUrl()",hasArgs:false}
			//        ,{name:"getVideoColor",type:"get",info:"getVideoColor()",hasArgs:false}
			//        ,{name:"getDefinition",type:"get",info:"getDefinition()",hasArgs:false}
			//        ,{name:"getDefaultDefinition",type:"get",info:"getDefaultDefinition()",hasArgs:false}
			//        ,{name:"getVideoPercent",type:"get",info:"getVideoPercent()",hasArgs:false}
			//        ,{name:"getVideoRotation",type:"get",info:"getVideoRotation()",hasArgs:false}
			//        ,{name:"getVideoScale",type:"get",info:"getVideoScale()",hasArgs:false}
			//        ,{name:"getDownloadSpeed",type:"get",info:"getDownloadSpeed()",hasArgs:false}
			//        ,{name:"getDefinitionMatchList",type:"get",info:"getDefinitionMatchList()",hasArgs:false}
			//        ,{name:"getDefinitionList",type:"get",info:"getDefinitionList()",hasArgs:false}
			//        ,{name:"getLoadPercent",type:"get",info:"getLoadPercent()",hasArgs:false}
			//        ,{name:"getPlayRecord",type:"get",info:"getPlayRecord()",hasArgs:false}
			//        ,{name:"getPlayState",type:"get",info:"getPlayState()",hasArgs:false}
			//        ,{name:"getVersion",type:"get",info:"getVersion()",hasArgs:false}
			//        ,{name:"getVideoSetting",type:"get",info:"getVideoSetting()",hasArgs:false}
			//        ,{name:"getVideoTime",type:"get",info:"getVideoTime()",hasArgs:false}
			//        ,{name:"pauseVideo",type:"set",info:"pauseVideo()",hasArgs:false}
			//        ,{name:"resumeVideo",type:"set",info:"resumeVideo()",hasArgs:false}
			//        ,{name:"replayVideo",type:"set",info:"replayVideo()",hasArgs:false}
			//        ,{name:"closeVideo",type:"set",info:"closeVideo()",hasArgs:false}
			//        ,{name:"jumpVideo",type:"set",info:"jumpVideo(true)",hasArgs:true,argtype:"int",default:1}
			//        ,{name:"seekTo",type:"set",info:"seekTo(100)",hasArgs:true,argtype:"number",default:100}
			//        ,{name:"setAutoReplay",type:"set",info:"setAutoReplay(true)",hasArgs:true,argtype:"boolean",default:true}
			//        ,{name:"setContinuePlay",type:"set",info:"setContinuePlay(true)",hasArgs:true,argtype:"boolean",default:true}
			//        ,{name:"setDefinition",type:"set",info:"setDefinition('1080p')",hasArgs:true,argtype:"string",default:"1000"}
			//        ,{name:"setFlashvars",type:"set",info:"setFlashvars({'autoplay':0})",hasArgs:true,argtype:"object"}
			//        ,{name:"setGpu",type:"set",info:"setGpu(true)",hasArgs:true,argtype:"int",default:1}
			//        ,{name:"setJump",type:"set",info:"setJump(true)",hasArgs:true,argtype:"boolean",default:true}
			//        ,{name:"setLejuData",type:"set",info:"setLejuData({'uu':xx,'vu':xx})",hasArgs:true,argtype:"object",default:'{"uu":"260814d2a9","vu":"86501f728b"}'}
			//        ,{name:"setVideoColor",type:"set",info:"setVideoColor(50,50,50,50)",hasArgs:true,argtype:"int",num:4,default:"50,50,50,50"}
			//        ,{name:"setVideoPercent",type:"set",info:"setVideoPercent(1)",hasArgs:true,argtype:"number",default:"0.75"}
			//        ,{name:"setVideoRect",type:"set",info:"setVideoRect({'x':100,'y':100,'width':100,'height':100})",hasArgs:true,argtype:"object",default:'{"x":100,"y":100,"width":100,"height":100}'}
			//        ,{name:"setVideoRotation",type:"set",info:"setVideoRotation(45)",hasArgs:true,argtype:"int",default:45}
			//        ,{name:"setVideoScale",type:"set",info:"setVideoScale(16/9)",hasArgs:true,argtype:"number",default:"16/9"}
			//        ,{name:"resetVideoScale",type:"set",info:"resetVideoScale()",hasArgs:false}
			//        ,{name:"fullVideoScale",type:"set",info:"fullVideoScale()",hasArgs:false}
			//        ,{name:"setVolume",type:"set",info:"setVolume(1)",hasArgs:true,argtype:"number",default:"0.5"}
			//        ,{name:"shutDown",type:"set",info:"shutDown()",hasArgs:false}
			//        ,{name:"startUp",type:"set",info:"startUp()",hasArgs:false}
			//    ];
			function clearCallback() {
				callBox.innerHTML = "";
			}
			var apiResult = {
				addResult: function(data) {
					var result;;
					var value = data;
					if(typeof(data) == "object") {
						result = "" + JSON.stringify(data) + "\n";
					} else if("undefined" == typeof(data)) {
						result = "" + "" + "\n";
					} else {
						result = "" + data + "\n";
					}
					var nr = result.replace(/\n/g, "<br>");
					document.getElementById("ApiResultBox").innerHTML = nr;
					return result;
				}
			}
			var btnBox = document.getElementById("btnBox");
			var btnList = document.getElementById("callbackApi");
			var api = p.sdk;

			function setUpAPI() {
				for(var i = 0; i < apiArr.length; i++) {
					var li = document.createElement("LI");
					li.style.float = "left";
					li.style.width = "400px";
					var liDiv = document.createElement("DIV");
					var result = document.createElement("INPUT");
					result.type = "text";
					if(apiArr[i].type == "get") {
						result.disabled = "disabled"
					}
					var input = document.createElement("INPUT");
					input.title = apiArr[i].info;
					input.type = "button";
					input.value = apiArr[i].name;
					input.data = apiArr[i];
					input.resultbox = result;
					liDiv.appendChild(result);
					liDiv.appendChild(input);
					li.appendChild(liDiv);
					btnList.appendChild(li);
					if(apiArr[i].hasOwnProperty("default")) {
						result.value = apiArr[i].default;
					}
					input.onclick = function() {
						var curactionobj = this.data;
						var action = curactionobj.name;
						var args = this.resultbox.value;
						if(curactionobj.hasArgs) {
							//try{
							if(curactionobj.hasOwnProperty("num")) {
								//JSONUtil
								var arr = args.split(",");
								if(curactionobj.type == "get") {
									this.resultbox.value = apiResult.addResult(api[action](arr[0], arr[1], arr[2], arr[3]));
								} else {
									apiResult.addResult(api[action](arr[0], arr[1], arr[2], arr[3]));
								}
							} else {
								if(curactionobj.argtype == "object") {
									if(curactionobj.type == "get") {
										this.resultbox.value = apiResult.addResult(api[action](JSON.parse(args)));;
									} else {
										apiResult.addResult(api[action](JSON.parse(args)));
									}
								} else if(curactionobj.argtype == "boolean") {
									if(args == "false") {
										args = false;
									} else {
										args = true
									}
									if(curactionobj.type == "get") {
										this.resultbox.value = apiResult.addResult(api[action](args));
									} else {
										apiResult.addResult(api[action](Boolean(args)));
									}
								} else {
									if(curactionobj.type == "get") {
										this.resultbox.value = apiResult.addResult(api[action](args));
									} else {
										apiResult.addResult(api[action](args));
									}
								}
							}
							//                    }catch(e){
							//                        alert(apiResult.addResult({info:"调用接口失败1",messages:e.message}));
							//                    }
						} else {
							//  try{
							if(curactionobj.type == "get") {
								this.resultbox.value = apiResult.addResult(api[action]());
							} else {
								apiResult.addResult(api[action]());
							}
							//                    }catch(e){
							//                        alert(apiResult.addResult({info:"调用接口失败2",messages:e.message}));
							//                    }
						}
					}
				}
			}
			setUpAPI();
		})();
	}

	/**
	 * @description 监听
	 */
	function initListeners() {
		//提示
		mui('#header').on('tap', '#info', function() {
			var tips = '1.乐视云直播示例\n';
			tips += '2.H5模式下直播只有观看功能\n';
			tips += '3.目前直播网页只能部署到服务器端才能正常播放\n';
			tips += '4.这个是直播接口全面测试\n';
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