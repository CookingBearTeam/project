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
		             //this.renderRootMenuData();
		         },
		         getRootMenuData : function() {
		             var _this = this;
		             $.ajax({
		 				url:'<%=path%>/menu/login',
		 				type:'post',
		 				dateType:"json",
		 				success:function(data){
		 					$("#tree").tree({
		 						data:data
		 					});
		 				},
		 				error:function(e){
		 					alert("fail");
		 					console.log(e);
		 				}
		 			}); 
		            /*  var dc = $.DataCenter();
		             dc.setParameter("pid","console");
		             // 提交
		             rpc.doRequest("sysMenuBO", "getRootMenuByUserId", dc, function(dc1) {
		                 // 获取菜单列表
		                 var ds = dc1.getDataStore("lstMenus");
		                 var rowset = ds.getRowSet();
		                 rowset.forEach(function(row) {
		                     var rootMenuObj = row.getData();
		                     _this.acapProp.rootMenu.push(rootMenuObj);
		                 })
		             },{isAsync:false}); */
		         },
		        /*  renderRootMenuData : function() {
		             // 清空除了menu_tab以外的nav accordions
		             this.emptyRootMenuDiv();
		             // 将rootMenu渲染并追加到该DIV
		             this.addRootMenu();
		             // 对菜单整体做parse.parse刷新
		         },
		         emptyRootMenuDiv : function() {
		             // 获取渲染DIV
		             var rootMenuDiv = $("#" + this.acapProp.rootMenuDivId);
		             var panels = rootMenuDiv.accordion('panels');
		             var arrTitles = new Array();
		             for (var i = 0; i < panels.length; i++) {
		                 var id = panels[i].panel('options')['id'];
		                 if ($.isNull(id) == false && id == this.acapProp.menuTabId) {
		                     continue;
		                 }
		                 var title = panels[i].panel('options')['title'];
		                 if ($.isNull(title) == true) {
		                     continue;
		                 }
		                 arrTitles.push(title);
		             }
		             for (var j = 0; j < arrTitles.length; j++) {
		                 this.removePanel(rootMenuDiv, arrTitles[j]);
		             }
		         },
		         removePanel : function(rootMenuDiv, title) {
		             var pp = rootMenuDiv.accordion('select', title);
		             if (pp) {
		                 rootMenuDiv.accordion('remove', title);
		             }
		         },
		         addRootMenu : function() {
		             var _this = this;
		             // 获取渲染DIV
		             var rootMenuDiv = $("#" + this.acapProp.rootMenuDivId);
		             var rootMenu = this.acapProp.rootMenu;
		             for (var i = 0; i < rootMenu.length; i++) {
		                 var rootMenuObj = rootMenu[i];
		                 rootMenuDiv.accordion('add', {
		                     title : rootMenuObj.title,
		                     selected : false,
		                     content : ""
		                 });
		                 // 给导航栏分配Id
		                 var panel = rootMenuDiv.accordion('getPanel', rootMenuObj.title);
		                 panel.attr("id", "nav_item_" + rootMenuObj.id);
		                 panel.css("border", "1px #dddddd sliod");
		                 panel.data("navItem", rootMenuObj);
		             }
		             rootMenuDiv.accordion({
		                 onSelect : function(title, index) {
		                     // debugger;
		                     var panel = rootMenuDiv.accordion('getPanel', title);
		                     var rootMenuObj = panel.data("navItem");
		                     // 目前是整体展现
		                     _this.getMenuTree(panel.attr("id"), rootMenuObj.id);
		                 }
		             });
		         },
		         
		         
		         
		         getMenuTree : function(domId, pid) {
		         	
		             var _this = this;
		             var targetDom = $("#" + domId);
		             targetDom.empty();
		             var targetId = "tree_" + pid;
		             // 创建一棵树
		             var treeDom = $("<ul id='" + targetId + "' class='easyui-tree'></ul>");
		             targetDom.append(treeDom);
		             var eTreeCfg = {
		                 // 树节点Id
		                 targetId : targetId,
		                 // ajax参数
		                 boname : "sysMenuBO",
		                 bomethod : "getMenuTreesByPidAndUserId",
		                 // 远程调用句柄
		                 rpc : rpc,
		                 // 对于调用DB list记录形式的映射定义
		                 fieldMapper : {
		                     id : "id",
		                     pid : "pid",
		                     text : "title",
		                     iconCls : "iconCls",
		                     url : "url",
		                     state : "isLeaf",
		                     lstItem : "lstMenus" // 返回列表key
		                 },
		                 fieldMapperRule : {
		                     state : {
		                         open : "Y",
		                         closed : "N"
		                     }
		                 }
		             };
		             var etree = new eTree(eTreeCfg); 
		             etree.showTree(pid);
		             // 添加onclick事件
		             etree.treeDom.tree({
		                 onClick : function(node) {
		                     if (node.state == "closed" || ($.isNull(node.children) == false && node.children.length > 0)) {
		                         return;
		                     }
		                     if (node.attributes) {
		                         _this.tabOpen(node.id, node.text, node.attributes.url);
		                     }
		                 }
		             });
		             etree.treeDom.tree("collapseAll");
		             // $.parser.parse(targetDom);
		         },
		         // 在右边center区域打开菜单，新增tab
		         tabOpen : function(id, text, url) {
		             // debugger;
		             var tabMainFrame = $("#" + this.acapProp.tabMainFrameId);
		             var content = '<iframe scrolling="auto" frameborder="0" id="' + 'tabs_frame_' + id + '" src="'
		                     + acapGlobal.WEB_ROOT + url + '" style="width:100%;height:99%;"></iframe>'
		             if (tabMainFrame.tabs('exists', text)) {
		                 tabMainFrame.tabs('select', text);
		                 // TODO 需要刷新在这里添加操作
		             } else {
		                 tabMainFrame.tabs('add', {
		                     id : "tabPanel_" + id,
		                     title : text,
		                     content : content,
		                     closable : true,
		                 });
		             }
	
		         },
		         initMainTabs : function() {
		             var _this = this;
		             var tabMainFrame = $("#" + this.acapProp.tabMainFrameId);
		             var tabsMenu = $("#" + this.acapProp.tabsMenuId);
		             // 绑定tabs的右键菜单
		             tabMainFrame.tabs({
		             	pill:true,
		                 onContextMenu : function(e, title) {
		                     e.preventDefault();
		                     tabsMenu.menu('show', {
		                         left : e.pageX,
		                         top : e.pageY
		                     }).data("mainTabTitle", title);
		                 }
		             });
		             // 实例化menu的onClick事件
		             tabsMenu.menu({
		                 onClick : function(item) {
		                     _this.closeTab(this, item.name);
		                 }
		             });
		         },
		         closeTab : function(menu, type) {
		             var tabMainFrame = $("#" + this.acapProp.tabMainFrameId);
		             var curTabTitle = $(menu).data("mainTabTitle");
		             var tabs = tabMainFrame;
		             if (type === "close") {
		                 tabs.tabs("close", curTabTitle);
		                 return;
		             }
		             var allTabs = tabs.tabs("tabs");
		             var closeTabsTitle = [];
		             $.each(allTabs, function() {
		                 var opt = $(this).panel("options");
		                 if (opt.closable && opt.title != curTabTitle && type === "Other") {
		                     closeTabsTitle.push(opt.title);
		                 } else if (opt.closable && type === "All") {
		                     closeTabsTitle.push(opt.title);
		                 }
		             });
		             for (var i = 0; i < closeTabsTitle.length; i++) {
		                 tabs.tabs("close", closeTabsTitle[i]);
		             }
		         },
		         emptyTreeUl : function(target, pid) {
		             // 去掉target中的ul根Tree
		             // $(target).find("#node_" + pid);
		             target.empty();
		         }*/
		        
		    }
	    
		obj.init();
		obj.showRootMenus()
	});