$(function() {
	var goodsQuantity;
	$('#goods_table_id').datagrid({
		url : "/huodong/pub/queryIncActGoods",
		pagination : true, // pagination 设置是否有分页功能 默认false
		pageSize : 10,
		pageNumber : 1,
		rownumbers : true,
		singleSelect : true,
		striped : true,
		fitColumns : false,
		onLoadSuccess : function() {
			$('.datagrid-header-check').html("");
		},
		loadMsg : '正在加载数据，请稍等...', // 加载等待效果
		columns : [ [ {
			field : 'id',
			title : '主键KEY',
			align : 'left',
			hidden : true,
		}, {
			field : 'operation',
			title : '选中',
			align : 'left',
			sortable : false,
			checkbox : true
		}, {
			field : 'goodsName',
			title : '商品名称',
			width : '19%',
			align : 'right',
			sortable : false,
			remoteSort : false,
		// 是否可排序
		}, {
			field : 'goodsType',
			title : '商品类别',
			width : '19%',
			align : 'right',
			sortable : false,
			remoteSort : false,
		}, {
			field : 'goodsSize',
			title : '商品尺寸',
			width : '19%',
			align : 'right',
			sortable : false,
			remoteSort : false,
		}, {
			field : 'goodsQuantity',
			title : '商品库存',
			width : '19%',
			align : 'right',
			sortable : false,
			remoteSort : false,
		}, {
			field : 'unit',
			title : '商品单位',
			width : '19%',
			align : 'right',
			sortable : false,
		} ] ],

	});
});
/*
 * 时间模块禁止手动输入
 */
$(function() {
	$('.datebox').datetimebox({
		editable : false
	});

	/*
	 * 模态窗口 提交
	 * 
	 * 获取 商品名称
	 */
	$("#show_window_submit").click(function() {
		var item = $("#goods_table_id").datagrid('getSelected');
		$('#selGoodsName').val(item.goodsName);
		goodsId = item.id;
		maxGoodsQuantity = item.goodsQuantity;
		$('#goodsQuantity').attr("placeholder", "商品可选数量" + maxGoodsQuantity);
		$('#show_window').window('close');
		$('#goodsQuantity').focus();
	});
	/*
	 * 校验 输入商品数量 和最大数量
	 */
	$('#goodsQuantity').blur(function() {
		var srGoodsQuantity = $('#goodsQuantity').val();
		if (srGoodsQuantity > maxGoodsQuantity) {
			alert("输入数量有误,请重新输入");
			$('#goodsQuantity').val("");
			$('#goodsQuantity').focus();
		}
	});
	/*
	 * 提交表单, 添加活动
	 */
	$('#bind_submit').click(
			function() {
				var name = $('#name').val();
				var content = $('#content').val();
				var startTime = $('#startTime').datebox('getValue');
				var endTime = $('#endTime').datebox('getValue');
				var selGoodsName = $("#selGoodsName").val();
				var goodsQuantity = $('#goodsQuantity').val();
				if (endTime > startTime) {
					if (name.length == 0 || content.length == 0
							|| endTime.length == 0 || selGoodsName == 0
							|| goodsQuantity == 0) {
						alert('请输入完整的活动信息');
						return;
					}
					var param = {
						'goodsId' : goodsId,
						'name' : name,
						'content' : content,
						'startTime' : startTime,
						'endTime' : endTime,
						'goodsName' : selGoodsName,
						'goodsQuantity' : goodsQuantity,
					};
				} else {
					alert("活动时间异常");
					return;
				}
				$.post('/huodong/pub/incActivity', param, function(data) {
					if (data.result == "success") {
						alert("添加活动成功");
						location.reload();
					}
					if (data.result == "error") {
						alert("添加活动异常");
					}
					if (data.result == "parameterNull") {
						alert("添加活动失败.请正确输入信息");
					}
				}, 'json');
			});
	$('#addActivity').draggable({
		handle :'selector'
	});
});