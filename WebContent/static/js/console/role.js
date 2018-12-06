$(document).ready(function(){
		var obj = {
		        acapProp : {
		             "rootMenuDivId" : "",
		             "tabMainFrameId" : "",
		             "menuTabId" : "",
		             "menuShowId" : "",
		             "menuFavoriteId" : "",
		             "tabsMenuId" : "",
		             "rootMenu" : []
		         },
		         
		         init : function() {
		        	 this.acapProp.rootMenuDivId = "rootMenuDiv";
		        	 this.acapProp.tabMainFrameId = "tabMainframe";
		        	 this.acapProp.menuTabId = "menuTabDiv";
		        	 this.acapProp.menuShowId = "menuShow";
		        	 this.acapProp.menuFavoriteId = "menuFavorite";
		        	 this.acapProp.tabsMenuId = "tabsMenu";
		        	 this.acapProp.rootMenu = new Array();
		         }, 
		         
		         showRootMenus : function() {
		             this.getRootMenuData();
		         },
		         getRootMenuData : function() {
		           $.ajax({
		 				url:'../menu/login',
		 				type:'post',
		 				dateType:"json",
		 				success:function(data){
		 					var treeJson = JSON.parse(data); 
		 					$("#menuTree").tree({
				        		data: treeJson,
			 	 				animate:true
			 	 			});
		 				},
		 				error:function(e){
		 					alert("fail");
		 					console.log(e);
		 				}
		 			}); 
		         }
		    }
	    
		obj.init();
		obj.showRootMenus()
	});