/**
 * 作者: Andy
 * 时间: 2017-11-07 
 * 描述:  获取当前项目的配置
 * 		path、appname、之类的信息
 */
(function(exports) {
	"use strict";
	
	exports.GetInformation = {
		clientInformation : window.clientInformation 
		,
		contextPath : function(){
			return window.location.pathname;
		},
		projectName : function() {
			return this.contextPath().split("/")[1];
		}
	};
})(window);