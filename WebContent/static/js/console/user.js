$(function() {
	//初始化dategrid
	$('#user_list').datagrid(
		{
			url : "../console/queryUserList",
			pagination : true,
			pageSize : 20,
			pageNumber : 1,
			rownumbers : true,
			striped : true,
			singleSelect : true,
			fitColumns : true,
			remoteSort : false,
			loadMsg : '正在加载数据，请稍等...',
			columns : [ [
					{ 
						  field: 'ck', 
						  checkbox: true, 
						  width: '5%'
					 },
					{
						field : 'id',
						title : 'id',
						align : 'left',
						width : 30,
						hidden : true
					},
					{
						field : 'username',
						title : '账号',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'name',
						title : '姓名',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'phone',
						title : '手机号码',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'email',
						title : '邮箱',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'sex',
						title : '性别',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'address',
						title : '地址',
						width : 30,
						align : 'left',
						sortable : true
					},
					{
						field : 'ID_card',
						title : '身份证号',
						width : 30,
						align : "center",
						sortable : false,
					},
					{
						field: 'createTime',
						title: '添加时间',
						width: '12%',
						align: "center",
						sortable: false,
						formatter: function(value, row, index) {
							var s = "";
							if (value == null) {
								return s;
							} else {
								var date = new Date(value);
								s += $.dateFormatToString(date,
									"yyyy-MM-dd HH:mm");
								return s;
							}
						}
					},{
						field: 'updateTime',
						title: '更改时间',
						width: '12%',
						align: "center",
						sortable: false,
						formatter: function(value, row, index) {
							var s = "";
							if (value == null) {
								return s;
							} else {
								var date = new Date(value);
								s += $.dateFormatToString(date,
									"yyyy-MM-dd HH:mm");
								return s;
							}
						}
					},
			  ] ],
		});
	//
	
})