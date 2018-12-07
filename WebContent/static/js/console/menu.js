$(document).ready(function(){
	var obj = {
			getRootMenuData : function() {
				$.ajax({
					url:'../menu/login',
		 			type:'post',
		 			dateType:"json",
		 			success:function(data){
		 				var treeJson = JSON.parse(data);
		 				$("#menuTree").tree({
		 					data: treeJson,
			 	 			animate:true,
			 	 			onClick:function(node){
			 	 				var id = node.id;
			 	 				var url = node.url;
			 	 				var text = node.text;
			 	 				if (node.state == "closed" || $.isNull(url) ) {
			 	 					return;
			 	                }else{
			 	                	//添加主菜单的tab框
			 	                	var tabsText = '<div id = "tab_div_'+id+'" class="tab_div" style="display:inline-block;"><div id="'+'tabs_text_'+ id + 
			 	                    	'" class = "tabs_text">'+text+'</div><div id = "tabs_text_clear_'+ id +' "class="tabs_text_clear"></div></div>';
			 	                	//收集tab栏下的所有div id
			 	                	var tabs = document.getElementById("tabMainframe").childNodes;
				 	 				var tabIds = new Array();
			 	                	if(tabs.length>0){
			 	                		for(var i = 0;i<tabs.length;i++){
			 	                    		var tabId = tabs[i].id.split('_')[2];
			 	                    		tabIds.push(tabId);
			 	                    	}
			 	                    	if(tabIds.indexOf(id)==-1){
			 	                    		$("#tabMainframe").append(tabsText);
		 	                    		}
			 	                    }else{
			 	                    	$("#tabMainframe").append(tabsText);
			 	                    }
			 	                    //添加主菜单的内容
			 	                    var content = '<div class="div_iframe" id="div_iframe_'+id+'" style="width:100%;height:99%;display:bolok; "><iframe scrolling="auto" frameborder="0" class="tabs_frame"  id="' + 'tabs_frame_' + id + '" src="'
					 	                    + '../'+ url + '" style="width:100%;height:99%;"></iframe></div>';
					 	            var tabMain = document.getElementById("mainframe").childNodes;
					 	            if(tabMain.length>0){
					 	            	//如果存在其他的浮动框
					 	            	 var divFrameIds = new Array();
							 	         for(var j = 0;j<tabMain.length;j++){
							 	        	var divFrameId = tabMain[j].id.split('_')[2];
							 	        	divFrameIds.push(divFrameId);
							 	         }
							 	        if(divFrameIds.indexOf(id)==-1){
							 	        	$(".div_iframe").attr("style", 'display:none');
							 	        	$("#mainframe").append(content);
							 	        	$(".tabs_text").css('color','#6e6e6e');
						 	                $("#tabs_text_"+id).css('color','#0361b0');
						 	        	}else{
						 	        		$(".div_iframe").attr("style", 'display:none');
						 	        		$("#div_iframe_"+id).attr("style", 'display:bolok');
							 	        	$(".tabs_text").css('color','#6e6e6e');
						 	                $("#tabs_text_"+id).css('color','#0361b0');
						 	        	}   
					 	            }else{
					 	            	$("#mainframe").append(content);
					 	                $("#tabs_text_"+id).css('color','#0361b0');
					 	            }
			 	                }
			 	 			}
			 	 		});
		 			},
		 			error:function(e){
		 				alert("fail");
		 				console.log(e);
		 			}
		 	}); 
		}
	};
	obj.getRootMenuData();
	var that = this;
	$(document).on('click', '.tabs_text_clear', function(e) {
		var tabClear = $(e.target).attr("id");
	    var tabClearId = (tabClear.split('_')[3]).replace(/(^\s+)|(\s+$)/g,"");
	    //将下一个状态栏显示
	    var tabMain1 = document.getElementById("mainframe").childNodes;
	    var divFrameIds1 = new Array();
	    for(var n = 0;n<tabMain1.length;n++){
	        	var divFrameId1 = tabMain1[n].id.split('_')[2];
	        	divFrameIds1.push(divFrameId1);
	    }
	    var indexFrame = divFrameIds1.indexOf(tabClearId);
	    if((divFrameIds1.length-1)<=indexFrame&&indexFrame>0){
	    	$(".div_iframe").attr("style", 'display:none');
     		$("#div_iframe_"+divFrameIds1[indexFrame-1]).attr("style", 'display:bolok');
	        $(".tabs_text").css('color','#6e6e6e');
            $("#tabs_text_"+divFrameIds1[indexFrame-1]).css('color','#0361b0');
	    }else if((divFrameIds1.length-1)<=indexFrame&&indexFrame==0){
	    	
	    }else{
	    	$(".div_iframe").attr("style", 'display:none');
     		$("#div_iframe_"+divFrameIds1[indexFrame+1]).attr("style", 'display:bolok');
	        $(".tabs_text").css('color','#6e6e6e');
            $("#tabs_text_"+divFrameIds1[indexFrame+1]).css('color','#0361b0');
	    }
	    //移除tab框中title
	    $("div").remove("#tab_div_"+tabClearId);
	    //移除相应的frame
	    $("div").remove("#div_iframe_"+tabClearId);
	});
	$(document).on('click', '.tabs_text', function(e) {
		//点击tab页切换字体颜色
		$(".tabs_text").css('color','#6e6e6e');
		$("#"+$(e.target).attr("id")).css('color','#0361b0');
		//切换展示内容
		$(".div_iframe").attr("style", 'display:none');
 		$("#div_iframe_"+$(e.target).attr("id").split('_')[2].replace(/(^\s+)|(\s+$)/g,"")).attr("style", 'display:bolok');
	});	
});