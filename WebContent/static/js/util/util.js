(function($){
	var n = navigator;
	var dua = n.userAgent,
	dav = n.appVersion,
	tv = parseFloat(dav);
	$.isKhtml = (dav.indexOf("Konqueror") >= 0) ? tv : 0;
	$.isWebKit = parseFloat(dua.split("WebKit/")[1]) || undefined;
	$.isChrome = parseFloat(dua.split("Chrome/")[1]) || undefined;
	var index = Math.max(dav.indexOf("WebKit"), dav.indexOf("Safari"), 0);
	if(index && !$.isChrome){
		$.isSafari = parseFloat(dav.split("Version/")[1]);
		if(!$.isSafari || parseFloat(dav.substr(index + 7)) <= 419.3){
			$.isSafari = 2;
		}
	}
	if(dua.indexOf("Gecko") >= 0 && !$.isKhtml && !$.isWebKit){ $.isMozilla = $.isMoz = tv; }
	if($.isMoz){
		$.isFF = parseFloat(dua.split("Firefox/")[1] || dua.split("Minefield/")[1] || dua.split("Shiretoko/")[1]) || undefined;
	}
	if(document.all && !$.isOpera){
		$.isIE = parseFloat(dav.split("MSIE ")[1]) || undefined;
		if($.isIE >= 8 && document.documentMode != 5){
			$.isIE = document.documentMode;
		}
	}	
	$._escapeString = function(str){
		return ('"' + str.replace(/(["\\])/g, '\\$1') + '"').
			replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").
			replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
	}
	$.isString = function(/*anything*/ it){
		return !!arguments.length && it != null && (typeof it == "string" || it instanceof String); // Boolean
	}
	$.isFunction = function(it){
		var t = typeof it; // must evaluate separately due to bizarre Opera bug. See #8937 
		return it && (t == "function" || it instanceof Function); // Boolean
	}
	$.isArray = function(/*anything*/ it){
		return it && (it instanceof Array || typeof it == "array"); // Boolean
	}
	$.arrayByKey = function(array,key){
		var out=Array();
		for(var i in array){
			out[typeof key!="undefined"?array[i][key]:array[i]] = array[i];
		};
		return out;
	}
	$.isObject = function(/*anything*/ it){
		return it !== undefined &&
			(it === null || typeof it == "object" || $.isArray(it) || $.isFunction(it)); // Boolean
	}
	$.toJson = function(it){
		if(it === undefined){
			return "undefined";
		}
		var objtype = typeof it;
		if(objtype == "number" || objtype == "boolean"){
			return it + "";
		}
		if(it === null){
			return "null";
		}
		if($.isString(it)){ 
			return $._escapeString(it); 
		}
		var recurse = arguments.callee;
		var newObj;
		var tf = it.__json__||it.json;
		if($.isFunction(tf)){
			newObj = tf.call(it);
			if(it !== newObj){
				return recurse(newObj);
			}
		}
		if(it.nodeType && it.cloneNode){ // isNode
			throw new Error("Can't serialize DOM nodes");
		}
		
		if($.isArray(it)){
			var res = $.map(it, function(obj){
				var val = recurse(obj);
				if(typeof val != "string"){
					val = "undefined";
				}
				return val;
			});
			return "[" + res.join(",") + "]";
		}
		if(objtype == "function"){
			return null; // null
		}	
		var output = [], key;
		for(key in it){
			var keyStr, val;
			if(typeof key == "number"){
				keyStr = '"' + key + '"';
			}else if(typeof key == "string"){
				keyStr = $._escapeString(key);
			}else{
				// skip non-string or number keys
				continue;
			}
			val = recurse(it[key]);
			if(typeof val != "string"){
				// skip non-serializable values
				continue;
			}
			// FIXME: use += on Moz!!
			//	 MOW NOTE: using += is a pain because you have to account for the dangling comma...
			output.push(keyStr + ":" + val);
		}
		return "{" + output.join("," ) + "}"; // String
	}
	$.fromJson = function(/*String*/ json){
		return eval("(" + json + ")"); // Object
	}

	$.mixin = function(/*Object*/ target, /*Object*/ source, empty){
		if(typeof empty =="undefined"){
			var empty = {};
		}
  		var name, s, i;
  		for(name in source){
   			s = source[name];
   			if(!(name in target) || (target[name] !== s && (!(name in empty) || empty[name] !== s))){
    			target[name] = s;
   			}
  		}
  		return target; // Object
	}
	$.fn.extend({
		createDialog :function(config){
			if(typeof config =="undefined"){
				var config = {
				};
			}
			
			typeof(config['width'])=='undefined'&&(config['width']=800);
			typeof(config['height'])=='undefined'&&(config['height']=380);
			typeof(config['title'])=='undefined'&&(config['title']='dialog');
			typeof(config['modal'])=='undefined'&&(config['modal']=true);
			typeof(config['url'])=='undefined'&&(config['url']='');
			typeof(config['dataDialog'])=='undefined'&&(config['dataDialog']={});
			typeof(config['onComplete'])=='undefined'&&(config['onComplete']=undefined);
			
			//创建容器
			if ($("#_windowDialog").length <= 0){  
				$('<div id="_windowDialog"></div>').appendTo('body');
			}
			
			
			//传递数据方式 
			$("#_windowDialog").data("dataDialog",config.dataDialog);
			$("#_windowDialog").data('_config',config)
			
			//弹出窗口
			$('#_windowDialog').window({   
				width: config.width,
				height:config.height, 
				title: config.title, 
				modal: config.modal, 
				content:'<iframe scrolling="auto" frameborder="0" src="'+config.url+'" style="width:100%;height:100%;overflow-x:hidden;overflow:auto;" id="_windowDialog"></iframe>'
			});  
		},
		getDialogData : function(config){
			return parent.$("#_windowDialog").data("dataDialog"); 
		},
		closeDialog : function(){
			var config = parent.$("#_windowDialog").data('_config');
			if (config['onComplete'] != undefined)  
				config['onComplete'].call();
			parent.$("#_windowDialog").window('close'); 
		}
	});
	
	//上传组件
	$.fn.extend({
		plupload:function(settings){
			
			if(typeof settings =="undefined"){
				var settings = {};
			}
			if(typeof(settings['browse_button'])=='undefined'){
				return "undefined";
			}
			
			if(typeof(settings['container'])=='undefined'){
				return "undefined";
			}
			
			typeof(settings['runtimes'])=='undefined'&&(settings['runtimes']='flash,html4,html5,gears,silverlight,browserplus');
			typeof(settings['url'])=='undefined'&&(settings['url']=unieap.WEB_ROOT + "/PhFileAction.do?method=upload");
			typeof(settings['max_file_size'])=='undefined'&&(settings['max_file_size']='10mb');
			typeof(settings['flash_swf_url'])=='undefined'&&(settings['flash_swf_url']=unieap.WEB_ROOT + '/ph/comp/plupload/js/plupload.flash.swf');
			typeof(settings['silverlight_xap_url'])=='undefined'&&(settings['silverlight_xap_url']=unieap.WEB_ROOT + +'/ph/comp/plupload/js/plupload.silverlight.xap');
			typeof(settings['resize'])=='undefined'&&(settings['resize']={width : 320, height : 240, quality : 90});
			typeof(settings['callback'])=='undefined'&&(settings['callback'] = function(up, file){});
			
			var uploader = new plupload.Uploader(settings);
			
			//初始化事件
			uploader.bind('Init', function(up, params) { 
				$('#filelist').html("<div>当前运行环境: " + params.runtime + "</div>");  
		    });  
			//添加文件后事件
			uploader.bind('FilesAdded', function(up, files) {  
				$.each(files, function(i, file) {  
					$('#filelist').append( '<div class="pic_list" id="' + file.id + '">' +  
						file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' + 
							'<a class="pic_delete" data-val='+files[i].id+' href="#">[删除]</a></div>'
					);  
				});  
				uploader.refresh(); // Reposition Flash/Silverlight  
			});
			
			//删除按钮事件绑定
			$('a.pic_delete').live("click",function(e) {  
			   	$(this).parent().remove();  
				var toremove = '';  
				var id=$(this).attr("data-val");  
				for(var i in uploader.files){  
					if(uploader.files[i].id === id){  
						toremove = i;  
		        	}  
				}  
				uploader.files.splice(toremove, 1);  
				uploader.refresh();
			});
			
			//进度条事件
			uploader.bind('UploadProgress', function(up, file) {  
				$('#' + file.id + " b").html(file.percent + "%");  
				$('#' + file.id + " a").remove();
			});  
			
			//错误事件
			uploader.bind('Error', function(up, err) {  
				$('#filelist').append("<div>Error: " + err.code + ", Message: " + err.message +  
					(err.file ? ", File: " + err.file.name : "") + "</div>"  
				);  
				uploader.refresh(); // Reposition Flash/Silverlight  
				}
			);  
			
			uploader.bind('UploadComplete',function(up,files){
					settings['callback'].call(window,up,files);
				}
			); 
			
			//上传完成
			uploader.bind('FileUploaded', function(up, file) {  
				$('#' + file.id + " b").html("100%");  
			});  
			
			//初始化
			uploader.init();
			return uploader;
		}
	});
	
	//收集表单信息
	$.fn.extend({
		collect: function(){
			var parameters = {};
			var _unCheckName = {};
			$(":input",this).each(function(i){
				var item = $(this);
				if(item.hasClass("easyui-datebox")){
					var value = item.datebox('getValue');
					if(value==null||value==''||item.attr('valueFormat')==null){
						var tmpDate = $.dateParserForCollect(value,'yyyy-MM-dd');
						if (tmpDate != null) {
							parameters[item.attr("comboname")] = tmpDate.getTime();
						} else {
							parameters[item.attr("comboname")] = null;
						}
					}else{
						parameters[item.attr("comboname")] = $.dateParserForCollect(value,item.attr('valueFormat'),{dataType:"string",valueFormat:item.attr('displayFormat')});
					}
					_unCheckName[item.attr("comboname")] = true;
					return;
				}
				if(item.hasClass("easyui-datetimebox")){
					var value = item.datebox('getValue');
					if(value==null||value==''||item.attr('valueFormat')==null){
						var tmpDate = $.dateParserForCollect(value,'yyyy-MM-dd HH:mm:ss');
						if (tmpDate != null) {
							parameters[item.attr("comboname")] = tmpDate.getTime();
						} else {
							parameters[item.attr("comboname")] = null;
						}
					}else{
						parameters[item.attr("comboname")] = $.dateParserForCollect(value,item.attr('valueFormat'));
					}
					_unCheckName[item.attr("comboname")] = true;
					return;
				}
				if (item.hasClass("easyui-calendar")) {
					var value = item.calendar('options').current;
					var bindingName = item.attr("name");
					if (value == null || value == undefined || value == "" 
							|| item.attr('valueFormat') == null) {
						if (value != null) {
							parameters[bindingName] = value.getTime();
						} else {
							parameters[bindingName] = null;
						}
					} else {
						parameters[bindingName] = $.dateParserForCollect(value,item.attr('valueFormat'));
					}
					_unCheckName[bindingName] = true;
					return;
				}
				if(this.name&&!_unCheckName[this.name]){
					if(item.attr("type")=='radio'){
						if(!item.is(":checked")){
							return;
						}
						if(parameters[this.name]==null||parameters[this.name]==''){
							parameters[this.name] = item.val();
						}
						return;	
					}
					if(item.attr("type")=='checkbox'){
						if(!item.is(":checked")){
							return;
						}
						if(parameters[this.name]==null||parameters[this.name]==''){
							parameters[this.name] = this.checked?item.val():'';
						}else{
							parameters[this.name] += "," + $(this).val();
						}
						return;
					}
					parameters[this.name] = item.val();
				}
			});
			return parameters;
		},
		collectDataStore: function(){
			var parameters = {};
			var _unCheckName = {};
			$(":input",this).each(function(i,element){
				var item = $(this);
				if(item.hasClass("easyui-datebox")){
					var value = item.datebox('getValue');
					if(value==null||value==''||item.attr('valueFormat')==null){
						var tmpDate = $.dateParserForCollect(value,'yyyy-MM-dd');
						if (tmpDate != null) {
							parameters[item.attr("comboname")] = tmpDate.getTime();
						} else {
							parameters[item.attr("comboname")] = null;
						}
					}else{
						parameters[item.attr("comboname")] = $.dateParserForCollect(value,item.attr('valueFormat'),{dataType:"string",valueFormat:item.attr('displayFormat')});
					}
					_unCheckName[item.attr("comboname")] = true;
					return;
				}
				if(item.hasClass("easyui-datetimebox")){
					var value = item.datebox('getValue');
					if(value==null||value==''||item.attr('valueFormat')==null){
						var tmpDate = $.dateParserForCollect(value,'yyyy-MM-dd HH:mm:ss');
						if (tmpDate != null) {
							parameters[item.attr("comboname")] = tmpDate.getTime();
						} else {
							parameters[item.attr("comboname")] = null;
						}
					}else{
						parameters[item.attr("comboname")] = $.dateParserForCollect(value,item.attr('valueFormat'));
					}
					_unCheckName[item.attr("comboname")] = true;
					return;
				}

				if (item.hasClass("easyui-calendar")) {
					var value = item.calendar('options').current;
					var bindingName = item.attr("name");
					if (value == null || value == undefined || value == "" 
							|| item.attr('valueFormat') == null) {
						if (value != null) {
							parameters[bindingName] = value.getTime();
						} else {
							parameters[bindingName] = null;
						}
					} else {
						parameters[bindingName] = $.dateParserForCollect(value,item.attr('valueFormat'));
					}
					_unCheckName[bindingName] = true;
					return;
				}
				
				if(this.name&&!_unCheckName[this.name]){
					if(item.attr("type")=='radio'){
						if(!item.is(":checked")){
							return;
						}
						if(parameters[this.name]==null||parameters[this.name]==''){
							parameters[this.name] = item.val();
						}
						return;	
					}
					if(item.attr("type")=='checkbox'){
						if(!item.is(":checked")){
							return;
						}
						if(parameters[this.name]==null||parameters[this.name]==''){
							parameters[this.name] = this.checked?item.val():'';
						}else{
							parameters[this.name] += "," + $(this).val();
						}
						return;
					}
					parameters[this.name] = item.val();
				}
			});
			

			$("[class^='easyui-calendar']",this).each(function(i,element){
				var item = $(this);
				if (item.hasClass("easyui-calendar")) {
					var value = item.calendar('options').current;
					var bindingName = item.attr("name");
					if (value == null || value == undefined || value == "" 
							|| item.attr('valueFormat') == null) {
						if (value != null) {
							parameters[bindingName] = value.getTime();
						} else {
							parameters[bindingName] = null;
						}
					} else {
						parameters[bindingName] = $.dateParserForCollect(value,item.attr('valueFormat'));
					}
					_unCheckName[bindingName] = true;
					return;
				}
			});
			
			
			var ds = null;
			
			if ($.isNull(parameters)) {
				ds = new $.DataStore("",[]);
			} else {
				ds = new $.DataStore("",[parameters]);
			}
			
			return ds;
		},
		bindDataStore: function(parameterStore){
			if (parameterStore != null && parameterStore.getRowSet().getRowCount("primary") == 0) {
				return;
			}
			var rowData = parameterStore.getRowSet().getRow(0).getData();
			$(":input",this).each(function(i,element){
				var item = $(this);
				if (item.hasClass("easyui-datetimebox")) {
					var value = rowData[item.attr("comboname")];
					var tmpDate = null;
					if (value != null) {
						tmpDate = new Date();
						tmpDate.setTime(value);
					}
					if (tmpDate != null) {
						var displayFormatValue = item.attr('displayFormat');
						if (displayFormatValue == null || displayFormatValue == '') {
							displayFormatValue = 'yyyy-MM-dd HH:mm:ss';
						}
						item.datetimebox('setValue',$.dateFormatToString(tmpDate,displayFormatValue));
					}
					return ;
				}
				if (item.hasClass("easyui-datebox")) {
					var value = rowData[item.attr("comboname")];
					var tmpDate = null;
					if (value != null) {
						tmpDate = new Date();
						tmpDate.setTime(value);
					}
					if (tmpDate != null) {
						var displayFormatValue = item.attr('displayFormat');
						if (displayFormatValue == null || displayFormatValue == '') {
							displayFormatValue = 'yyyy-MM-dd';
						}
						item.datebox('setValue',$.dateFormatToString(tmpDate,displayFormatValue));
					}
					return ;
				}
				
				if (item.hasClass("easyui-textbox")) {
					var value = rowData[item.attr("textboxname")];
					item.textbox('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-numberbox")) {
					var value = rowData[item.attr("textboxname")];
					item.numberbox('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-combobox")) {
					var value = rowData[item.attr("comboname")];
					item.combobox('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-combotree")) {
					var value = rowData[item.attr("comboname")];
					item.combotree('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-combogrid")) {
					var value = rowData[item.attr("comboname")];
					item.combogrid('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-numberspinner")) {
					var value = rowData[item.attr("textboxname")];
					item.numberspinner('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-timespinner")) {
					var value = rowData[item.attr("textboxname")];
					item.timespinner('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-datetimespinner")) {
					var value = rowData[item.attr("textboxname")];
					item.datetimespinner('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-slider")) {
					var value = rowData[item.attr("slidername")];
					item.slider('setValue',value);
					return ;
				}

				if (item.hasClass("easyui-calendar")) {
					var value = rowData[item.attr("name")];
					var tmpDate = null;
					if (value != null) {
						tmpDate = new Date();
						tmpDate.setTime(value);
					}
					item.calendar('moveTo',tmpDate);
					return ;
				}
				
				if (this.name) {
					if (item.attr("type")=='radio') {
						if(this.value == rowData[this.name]) {
							this.checked = true;
						}
						return;	
					}
					if (item.attr("type")=='checkbox') {
						if (rowData[this.name] != null) {
							this.checked = ($.inArray(this.value,rowData[this.name].split(",")) != -1);
						}
						return;
					}
					item.val(rowData[this.name]);
				}
			});
			
			$("[class^='easyui-calendar']",this).each(function(i,element){
				var item = $(this);
				if (item.hasClass("easyui-calendar")) {
					var value = rowData[item.attr("name")];
					var tmpDate = null;
					if (value != null) {
						tmpDate = new Date();
						tmpDate.setTime(value);
					}
					item.calendar('moveTo',tmpDate);
					return ;
				}
			});
			
			
		},
		bindViewData: function(parameters){
				debugger;
			$(":input",this).each(function(i){
				var item = $(this);
				if(item.hasClass("easyui-datebox")){
					var value = parameters[item.attr("comboname")];
					if(value!=null&&value!=''&&item.attr('valueFormat')!=null){
						item.datebox('setValue',$.dateFormat(value,item.attr('displayFormat'),{dataType:"string",valueFormat:item.attr('valueFormat')}));
					}
					return ;
				}

				if(this.name){
					if(item.attr("type")=='radio'){
							if(this.value == parameters[this.name]){
							this.checked = true;
						}
						return;	
					}
					if(item.attr("type")=='checkbox'){
						if(parameters[this.name] != null){
							this.checked = ($.inArray(this.value,parameters[this.name].split(",")) != -1);
						}
						return;
					}
					item.val(parameters[this.name]);
				}
			});
			$("tr > td",this).each(function(i){
				var item = $(this);	
				if(this.name){
					if(parameters[this.name] != null){
						if(item.attr("type")=='radio'){
						parameters[this.name] = $.getCodeName({value:parameters[this.name],
                 													codekind:item.attr("codekind"),
                 													splitCode:item.attr("splitCode")?item.attr("splitCode"):','
             								});
						};
						if(item.attr("type")=='checkbox'){
						 parameters[this.name] = $.getCodeName({value:parameters[this.name],
                 													codekind:item.attr("codekind"),
                 													splitCode:item.attr("splitCode")?item.attr("splitCode"):','
                 													
                 													
             								});
						};
						if(item.attr("type")=='combobox'){
						 parameters[this.name] = $.getCodeName({value:parameters[this.name],
                 													codekind:item.attr("codekind"),
                 													splitCode:item.attr("splitCode")?item.attr("splitCode"):','
                 													
                 													
             								});
						};						
						item.html(parameters[this.name]);
					}
				}
			});
		}
	});

	$.dateFormat = function(inValue,datePattern,data){
		if(!inValue||inValue=="") return "";
		var date,  retV = datePattern || "yyyy-MM-dd";
		!data && ( data = {dataType:"date"});

		if(data["dataType"]=="string"||data["dataType"]=="text"){
			var valueFormat= data["valueFormat"] || retV;
			var date=$.dateParser(inValue,valueFormat);
		}
		else{
			var date = new Date(Number(inValue));
		}
		return 	$.dateFormatToString(date,retV);
	}

	$.dateParserForCollect = function (str,format){
		str = String(str);
		var now=new Date();
		if(str.indexOf('am')>-1){
			format=format+' am';
		}

		if(str.indexOf('pm')>-1){
			format=format+' pm';
		}

	    if(str.length!==format.length){
		 	return null;
		}
	    var sub = function(s,f1){
	          var rtv = -1;
	          var index = format.indexOf(f1);
	          if(index!=-1){
	              rtv = parseInt(s.substr(index,f1.length),10);
	          }
	          return rtv;
	     }
	     var year = sub(str,"yyyy");
		 (year==-1)&&(year=now.getYear());
	     var month = sub(str,"MM") ;
		 (month==-1)&&(month=now.getMonth()+1);
	     var date = sub(str,"dd");
	     (date==-1)&&(date=1);//如果没有dd，则日期选中的每月1号

		  //处理12小时和24小时制度
	     var hour=-1;
		 if(sub(str,'hh')!=-1) { //如果是12进制
			hour = sub(str, 'hh');
			if (str.indexOf('pm')!=-1) {
				//12进制12:12 pm转换为24进制应该还是12:12
				//1:12pm 应该是13:12
				hour = (hour==12)?12:hour+12;

			}else if(str.indexOf('am')){
				//12进制12:12am转换为24进制应该是00:12
				hour=(hour==12)?0:hour;
			}
		 }else if(sub(str,'HH')!=-1){
			hour=sub(str,'HH');
		 }
		 (hour==-1)&&(hour=0);
	     var minute = sub(str,"mm");
		 (minute==-1)&&(minute=0);
	     var second = sub(str,"ss");
		 (second==-1)&&(second=0);
	     var d = new Date(year,month-1,date,hour,minute,second);
	     if(d=="NaN"){
		 	return null;
		 }
	      return d;
	   }
	
	$.dateParser=function (str,format){
		str = String(str);
		var now=new Date();
		if(str.indexOf('am')>-1){
			format=format+' am';
		}

		if(str.indexOf('pm')>-1){
			format=format+' pm';
		}

	 if(str.length!==format.length){
		 	return now;
		}
	    var sub = function(s,f1){
	          var rtv = -1;
	          var index = format.indexOf(f1);
	          if(index!=-1){
	              rtv = parseInt(s.substr(index,f1.length),10);
	          }
	          return rtv;
	     }
	     var year = sub(str,"yyyy");
		 (year==-1)&&(year=now.getYear());
	     var month = sub(str,"MM") ;
		 (month==-1)&&(month=now.getMonth()+1);
	     var date = sub(str,"dd");
	     (date==-1)&&(date=1);//如果没有dd，则日期选中的每月1号

		  //处理12小时和24小时制度
	     var hour=-1;
		 if(sub(str,'hh')!=-1) { //如果是12进制
			hour = sub(str, 'hh');
			if (str.indexOf('pm')!=-1) {
				//12进制12:12 pm转换为24进制应该还是12:12
				//1:12pm 应该是13:12
				hour = (hour==12)?12:hour+12;

			}else if(str.indexOf('am')){
				//12进制12:12am转换为24进制应该是00:12
				hour=(hour==12)?0:hour;
			}
		 }else if(sub(str,'HH')!=-1){
			hour=sub(str,'HH');
		 }
		 (hour==-1)&&(hour=0);
	     var minute = sub(str,"mm");
		 (minute==-1)&&(minute=0);
	     var second = sub(str,"ss");
		 (second==-1)&&(second=0);
	     var d = new Date(year,month-1,date,hour,minute,second);
	     if(d=="NaN"){
		 	return now;
		 }
	      return d;
	   }
	$.dateFormatToString=function(date,retV){
		//parse year
		if(retV.indexOf("yyyy")!=-1){
		    retV = retV.replace(/yyyy/gi,date.getFullYear());
		}

		//parse month
		if(retV.indexOf("MM")!=-1){
			var m = date.getMonth()+1;
			m = m<10?"0"+m:m;
		    retV = retV.replace(/MM/g,m);
		}

		//parse day
		if(retV.indexOf("dd")!=-1){
			var d = date.getDate();
			d = d<10?"0"+d:d;
		    retV = retV.replace(/dd/g,d);
		}

		//parse hour
		if(retV.indexOf('hh')!=-1){
			var h = date.getHours();
			if(h>=12){
				retV=retV+" pm"
				h=(h==12)?12:h-12; //如果当前时间是12:12,转换成12进制为12:12 pm
			}else{
				retV=retV+" am"
				h=(h==0)?12:h; //如果当前时间是00:12,转换成12进制为12:12 am
			}
			h=h<10?"0"+h:h;
			retV=retV.replace(/hh/g,h);
		}else if(retV.indexOf('HH')!=-1){
			var h = date.getHours();
			h = h<10?"0"+h:h;
		    retV = retV.replace(/HH/g,h);
		}

		//parse minute
		if(retV.indexOf("mm")!=-1){
			var mm = date.getMinutes();
			mm = mm<10?"0"+mm:mm;
		    retV = retV.replace(/mm/g,mm);
		}
		//parse second
		if(retV.indexOf("ss")!=-1){
			var s = date.getSeconds();
			s = s<10?"0"+s:s;
		    retV = retV.replace(/ss/g,s);
		}
		//week
		if(retV.indexOf("w")!=-1){
		    retV = retV.replace(/w/g,"0");
		}
		return retV;
	};
	
	$.transcode = function(inValue,data){  
		var _transcodeMap = $(window).data('_transcodeMap');
		if(_transcodeMap==null){
			_transcodeMap = {};
			$(window).data('_transcodeMap',_transcodeMap);
		}
		var _getCodeCache = function(inValue,data){
			data = $.isString(data) && {codelist:data} || data;
			data = $.extend({valueAttr :"CODE" ,displayAttr :"NAME"},data);
			if(!_transcodeMap[data.codelist]){ 
				add(data,data.codelist);
			}			
			//处理inValue类似1,2,3 的值转义
			if(!_transcodeMap[data.codelist]) {
				return inValue;
			} else {
				var values = String(inValue).split(',');
				for(var i=0; i<values.length; i++) {
					values[i] = _transcodeMap[data.codelist][values[i]];
				}
				return values.join(',');
			}
		};
		var add = function(data,key){
			var store = $(window).data(key);			
			if(store){
				var _map =_transcodeMap[key] ||(_transcodeMap[key]={});
				$.each(store,function(i,row){
					_map [row[data.valueAttr]] = row[data.displayAttr];					
				});
			}
		}
		return _getCodeCache(inValue,data);
	}
	
	$.isItem = function(item,items){
		for(var i in items){
			if(i==item){
				return true;
			}
		}
		return false;
	}

	$.initCodeList = function(codelists,callback){
		var len = codelists.length;
		
		var range_codes=[];
		$.each(codelists,function(i,codelist){
			if($(window).data(codelist) || $.isItem(codelist,range_codes)){
				return;
			}
			
			range_codes.push(codelist);
		});
		
		if(range_codes.length==0){
			callback&&callback();
			return;
		}
		
		var httpService = new HttpService();
		httpService.setInteractionName("commSingleTabOpInteraction");  
		httpService.setMethodName("queryCodeList");
		
		httpService.putParameter("RANGE_CODE",range_codes.join(','));
	    httpService.addEventListener("unieap.ResultEvent",function(data, textStatus){
	    	if(data&&data.header.code!='1'){//调用action正确，但处理业务时发生错误
	    		alert(data.header.message);
	    		return;
	    	}
	    	for(var range_code in range_codes){
				$(window).data(range_code,data.body[range_code]);
	    	}
			callback&&callback();
	    });   
	    httpService.addEventListener("unieap.FaultEvent",function(XMLHttpRequest, textStatus, errorThrown){
			$.debug([XMLHttpRequest, textStatus, errorThrown]);
	    }); 
	   	httpService.post();
	}

	$.afterLoadCodeList = function(callback){
		var selectList = $("select[codelist]");
	
		var len = selectList.length;
		
		var range_codes=[];
		selectList.each(function(i,select){
			var rangeCode = $(select).attr('codelist');
			if($(window).data(rangeCode) || $.isItem(rangeCode,range_codes)){
				return;
			}
			
			range_codes.push(rangeCode);
		});
		
		if(range_codes.length==0){
			callback&&callback();
			return;
		}
		
		var createOption = function(select,store){
			var options = select.options;
			$.each(store,function(i,rangeItem){
				options[i] = new Option(rangeItem['NAME'], rangeItem['CODE']);
			}); 
			$('#nation').attr('value','01');
			$('#citizenship').attr('value','156');
		 }
		
		var httpService = new HttpService();
		httpService.setInteractionName("commSingleTabOpInteraction");  
		httpService.setMethodName("queryCodeList");
		
		httpService.putParameter("RANGE_CODE",range_codes.join(','));
	    httpService.addEventListener("unieap.ResultEvent",function(data, textStatus){
	    	if(data&&data.header.code!='1'){//调用action正确，但处理业务时发生错误
	    		alert(data.header.message);
	    		return;
	    	}
	    	selectList.each(function(i,select){
	    		var rangeCode = $(select).attr('codelist');
	    		
	    		$(window).data(rangeCode,data.body[rangeCode]);
	    		
	    		createOption(select,data.body[rangeCode]);
	    	});
			callback&&callback();
	    });   
	    httpService.addEventListener("unieap.FaultEvent",function(XMLHttpRequest, textStatus, errorThrown){
			$.debug([XMLHttpRequest, textStatus, errorThrown]);
	    }); 
	   	httpService.post();
	}
	$.getDailogData = function(){
		return window.parent.$($(window.frameElement.parentNode||window).parents(".window-body")).dialog("options")['dialogData'];
	}
	$.isEmpty = function(str){
		return (str == null)||(str == "");
	}
	$.isNotEmpty = function(str){
		return (str != null)&&(str !="");
	}
	$.repalceNull = function(str){
		return str == null?"":str;
	}
	$.alertbox = function(title, contain,type,callback){
		$(".yweaner_mk_chenggong").remove();
		var message_container = $("<div class='yweaner_mk_chenggong' style='display:none;'> <div class='yweaner_cg_nr'> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tr> <td width='170'> <img class='yweaner_alertbox_type' src='' width='152' height='183' /> </td> <td> <table width='100%' border='0' cellspacing='0' cellpadding='0'> <tr> <td> <span style='font-size: 20px; color: #00AB1C;' class='yweaner_messagebox_title'></span> <br /> <span class='tt_5 yweaner_messagebox_contain'></span> </td> </tr> <tr> <td height='70' align='center' class='yweaner_messagebox_ok'> <a href='#' class='btn_3'>确 认</a> </td> </tr> </table> </td> </tr> </table> </div> </div>");
		message_container.appendTo($("body"));
		$("body").find(".yweaner_mk_chenggong").css({"position":"absolute","z-index":"9999","width":"100%","top":"15%","left":"0px"});
		$("body").find(".yweaner_cg_nr").css({"padding":"3px","width":"550px","margin-left":"auto","margin-right":"auto","background-color":"#FFFFFF","border":"5px solid #00AB1C"});
		$("body").find(".tt_5").css({"font-size":"16px","color":"#555E6B"});
		$("body").find(".btn_3").css({"font-size":"20px","color":"#FFFFFF","background-color":"#00AAA8","padding-top":"5px","padding-right":"20px","padding-bottom":"5px","padding-left":"20px","display":"block","float":"right"});
		$("body").find(".yweaner_messagebox_title").text(title);
		$("body").find(".yweaner_messagebox_contain").text(contain);
		
		
		$(".yweaner_messagebox_ok").click(function(){
			$(".yweaner_mk_chenggong").remove();
			if(callback){
				callback();
			}
		})
		$(".yweaner_mk_chenggong").show();
	},
  	
  $.getCodeList=function(config){
		if(typeof config =="undefined"){
			var config = {
			};
	    }
		
		//name不传，默认同id相同。	
		if(typeof config["name"] == "undefined"){
		  config["name"]=config["id"];
		}
		
		//如果传入数据直接处理
		if(typeof config["data"] != "undefined"){
			//如果id，type不传，不在页面生成对应标签
	        if((typeof config["type"] != "undefined")&&(typeof config["id"] != "undefined")){
	           creatTag(config["type"],config["data"],config["id"],config["value"],config["name"])
	        }
	       return; 
		}
	
		//判断是否传入codekind，不传入提示错误信息
		if(typeof config["codekind"] == "undefined"){
		   $.messager.alert('getCodeList codeKind','codeKind为空!','error');
			return ;
		}
		
		//判断客户端缓存是否存在，存在直接读取
		 var codelistobj=config["rpc"].getCodeList(config["codekind"]);
		 if(codelistobj!=null){
		 	    //如果id，type不传，不在页面生成对应标签
		        if((typeof config["type"] != "undefined")&&(typeof config["id"] != "undefined")){
		           creatTag(config["type"],codelistobj,config["id"],config["value"],config["name"])
		        }
		       return; 	
		 }
	
		//以下函数为getCodeList内部函数，定义在getCodeList方法内，不对外开放
		function creatTag(type,obj,id,value,inputName){
		    if(type.toLowerCase()=="combobox"){
			    creatCombobox(obj,id,value);
		      }else if(type.toLowerCase()=="checkbox"){
			    creatCheckbox(obj,id,value,inputName);
		    }else if(type.toLowerCase()=="radio"){
		    	creatRadio(obj,id,value,inputName)
		    }
		}
		//创建下拉框
		function creatCombobox(obj,id,value){
			$('#'+id).combobox({ 
	                   data:obj,
	                   valueField:"codevalue", 
	                   textField:"codename" 
	         })
	         if (typeof value != "undefined"){
	         	$('#'+id).combobox('setValue',value);
	         }
		}
		//创建复选框
		function creatCheckbox(obj,id,value,inputName){
			var divId=$("#"+id);
			var strs= new Array();
		  if (typeof value != "undefined"){
			  strs=value.split(",");
			  var checkedTmp=Array();
	          checkedTmp=$.arrayByKey(strs);
		   }	
		   $.each(obj, function(index, content){  
	           //value有默认值
			  if (typeof value != "undefined"){
			       var clt=$('<input type=\'checkbox\' name=\''+inputName+'\' value=\''+content['codevalue']+'\'>'+content['codename']+'</input>').appendTo(divId);
			  	   if (typeof checkedTmp[content['codevalue']] != "undefined"){
			  	   	clt.attr({checked:"checked"})
			  	   }       
			  }else{
			  	$('<input type=\'checkbox\' name=\''+inputName+'\' value=\''+content['codevalue']+'\'>'+content['codename']+'</input>').appendTo(divId);
			  }
	      });  
		}
		 //创建单旋钮	
		 function creatRadio(obj,id,value,inputName){
			var divId=$("#"+id);	
			var strs= new Array();
			$.each(obj, function(index, content){
				   //value有默认值  
				  if (typeof value != "undefined"){
		             	var clt=$('<input type=\'radio\' name=\''+inputName+'\' value=\''+content['codevalue']+'\'>'+content['codename']+'</input>').appendTo(divId);
				  	    value==content['codevalue']?clt.attr({checked:"checked"}):"";    	
				  }else{
				  	   $('<input type=\'radio\' name=\''+inputName+'\' value=\''+content['codevalue']+'\'>'+content['codename']+'</input>').appendTo(divId);
				  }
		      });  
		}
	},
	$.isNull = function(str){
	    if (str == null || str == undefined || str == "") {
	        return true;
	    }
	    return false;
	},
	$.isIdCardNo = function(num){
    	num = num.toUpperCase(); 
        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) { 
            alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。'); 
            return false; 
        } 
		//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
		//下面分别分析出生日期和校验位 
		var len, re; 
		len = num.length; 
		if (len == 15) { 
			re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/); 
			var arrSplit = num.match(re); 
			//检查生日日期是否正确 
			var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]); 
			var bGoodDay; 
			bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
			if (!bGoodDay) { 
			    alert('输入的身份证号里出生日期不对！');   
			    return false; 
			} else { 
			//将15位身份证转成18位 
			//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
				var nTemp = 0, i;   
				num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6); 
				for(i = 0; i < 17; i ++) { 
						nTemp += num.substr(i, 1) * arrInt[i]; 
				} 
			    num += arrCh[nTemp % 11];   
			    return num;   
			}   
		} 

		if (len == 18) { 
			re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
			var arrSplit = num.match(re); 
			//检查生日日期是否正确 
			var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
			var bGoodDay; 
			bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
			if (!bGoodDay) { 
				alert(dtmBirth.getYear()); 
				alert(arrSplit[2]); 
				alert('输入的身份证号里出生日期不对！'); 
				return false; 
			} else { 
				//检验18位身份证的校验码是否正确。 
				//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
				var valnum; 
				var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
				var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
				var nTemp = 0, i; 
				for(i = 0; i < 17; i ++) {
					nTemp += num.substr(i, 1) * arrInt[i]; 
				} 
				valnum = arrCh[nTemp % 11]; 
				if (valnum != num.substr(17, 1)) { 
//					alert('18位身份证的校验码不正确！应该为：' + valnum); 
					alert('18位身份证不正确！'); 
					return false; 
				} 
				return num; 
			} 
		} 
		alert('请输入正确身份证号码');
		return false;

    },
    
	$.extend($.fn.validatebox.defaults.rules, {
		phoneRex: {
		    validator: function(value){
			    var rex=/(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
			    if (rex.test(value)) {
			    	return true;
			    } else {
			    	return false;
			    }
		    },
		    message: '请输入正确电话或手机格式'
		},
		userAccountRex: {
		    validator: function(value){
//			    var rex=/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/; // 匹配中文，字母，数字，下划线
			    var rex=/^\w+$/; // 匹配字母，数字，下划线
			    if (rex.test(value)) {
			    	return true;
			    } else {
			    	return false;
			    }
		    },
		    message: '只能输入字母，数字，下划线！'
		},
		idCardNo: {
		    validator: function(num){
		    	num = num.toUpperCase(); 
		        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。   
		        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) { 
		            return false; 
		        } 
				//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
				//下面分别分析出生日期和校验位 
				var len, re; 
				len = num.length; 
				if (len == 15) { 
					re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/); 
					var arrSplit = num.match(re); 
					//检查生日日期是否正确 
					var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]); 
					var bGoodDay; 
					bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
					if (!bGoodDay) { 
					    return false; 
					} else { 
					//将15位身份证转成18位 
					//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
						var nTemp = 0, i;   
						num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6); 
						for(i = 0; i < 17; i ++) { 
								nTemp += num.substr(i, 1) * arrInt[i]; 
						} 
					    num += arrCh[nTemp % 11];   
					    return num;   
					}   
				} 
		
				if (len == 18) { 
					re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/); 
					var arrSplit = num.match(re); 
					//检查生日日期是否正确 
					var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]); 
					var bGoodDay; 
					bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4])); 
					if (!bGoodDay) { 
						return false; 
					} else { 
						//检验18位身份证的校验码是否正确。 
						//校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
						var valnum; 
						var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); 
						var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'); 
						var nTemp = 0, i; 
						for(i = 0; i < 17; i ++) {
							nTemp += num.substr(i, 1) * arrInt[i]; 
						} 
						valnum = arrCh[nTemp % 11]; 
						if (valnum != num.substr(17, 1)) { 
							return false; 
						} 
						return num; 
					} 
				} 
		
				return false;

		    },
		    message: '请输入正确身份证号码'
		},
		checkInput: {
		    validator: function(value){
			    var rex=/^[a-zA-Z0-9_\s\u4e00-\u9fa5]*$/;
			    if (rex.test(value)) {
			    	return true;
			    } else {
			    	return false;
			    }
		    },
		    message: '只能输入汉字、英文、数字、空格和下划线'
		},
	});

})(jQuery);
