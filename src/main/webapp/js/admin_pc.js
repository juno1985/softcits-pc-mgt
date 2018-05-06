$(document).ready(function(){
	//第一次加载页面展示商品列表
	//第1页,每页7条数据
	pc_list(1,7);
	//左侧导航栏箭头图标互动
	$(".panel-heading").click(function(e) {
		console.log(e);
		/* 切换折叠指示图标 */
		$(this).find("span").toggleClass("glyphicon-chevron-down");
		$(this).find("span").toggleClass("glyphicon-chevron-up");
	});
	//绑定动态加载的添加商品按钮事件
	$('#mgt-content').on('click','.pcFormSubmit',pc_add_submit);
});

//展现PC列表
function pc_list(pageNum, pageSize){
	$('#mgt-content').children().remove();
	$.ajax({
		url: "/mgt/computer/all",
		type: "GET",
		data: {"pageNum":pageNum, "pageSize":pageSize},
		dataType: "json",
		success:function(obj){
			//一共有多少页
			var totalPage;
			var totalRows = obj.totalRows;
			//总共分几页
		    if(totalRows/pageSize > parseInt(totalRows/pageSize)){
		        totalPage=parseInt(totalRows/pageSize)+1;
		    }else{
		        totalPage=parseInt(totalRows/pageSize);
		    }
		
			var data = obj.data;
			var content = "<table id="+'"pcTable"'+" class="+'"table table-condensed"'+" style=\"display:none\"><tbody>";
			content += "<thead><tr><th>商品id</th><th>商品名称</th><th>商品价格</th><th>更新</th><th>删除</th></tr></thead>";
			// v-value, i-index
			data.forEach(function(v,i){
				/*
				 * console.log(v.cid + ' ' + v.tradeMark + ' ' + v.price + ' ' +
				 * v.pic);
				 */
				content += "<tr><td>"+v.id+'</td><td><a id="pc" href="javascript:void(0);" onClick="pcClick(this)" value="'+ v.id +'">'+v.trademark+"</a></td><td>"+v.price+"元</td>"+
							'<td><a href="javascript:void(0);" onClick="pcUpldate(this)" value="'+v.id+'">更新</a></td>'+
							'<td><a href="javascript:void(0);" onClick ="pcDelete(this)" value="'+v.id+'">删除</a></td>'+
							"</tr>";
			}); 
			content += "</table></tbody>";
			content += goPage(pageNum, pageSize, totalPage);
			$('#mgt-content').append(content).find('#pcTable').show('slow');
		}
	});	
}
function goPage(pageNum, rows, totalPage){
	var tempStr = "<span>共"+totalPage+"页</span>";
	  if(pageNum>1){
	        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"pc_list("+(1)+","+rows+")\">首页</span>";
	        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"pc_list("+(pageNum-1)+","+rows+")\">上一页</span>"
	    }else{
	        tempStr += "<span class='btn btn-default'>首页</span>";
	        tempStr += "<span class='btn btn-default'>上一页</span>";
	    }
	  for(var pageIndex= 1;pageIndex<totalPage+1;pageIndex++){
	        tempStr += "<a onclick=\"pc_list("+pageIndex+","+rows+")\"><span class=\"btn btn-default\">"+ pageIndex +"</span></a>";
	    }
	  if(pageNum<totalPage){
	        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"pc_list("+(pageNum+1)+","+rows+")\">下一页</span>";
	        tempStr += "<span class='btn btn-default' href=\"#\" onClick=\"pc_list("+(totalPage)+","+rows+")\">尾页</span>";
	    }else{
	        tempStr += "<span class='btn btn-default'>下一页</span>";
	        tempStr += "<span class='btn btn-default'>尾页</span>";
	    }
	 return tempStr;
}
function pcDelete(obj){
	/*console.log(obj.getAttribute("value"));*/
	var cid = obj.getAttribute("value");
	$.ajax({
		url: "/mgt/computer/" + cid + "/delete",
		type: "GET",
		success:function(data){
			pc_list(1,7);
			}
	});
}
function pc_add(){
	//先删除内容然后再加载添加商品html
	$('#mgt-content').children().remove();
	$.get("/mgt/page/pc_add.html", function(data){
		$('#mgt-content').html(data);
	});
}
function pc_add_submit(){
	//将pcForm转化为数组,从而提交到后台
	var pc_form_fields = $('#pcForm').serializeArray();
	//发生post请求
	$('#pcForm').ajaxSubmit({
		url:"/mgt/computer/add",
		type:"post",
		complete:function(data){
				var callback_json = JSON.parse(data.responseText);
				alert(callback_json.msg);
		}
	});
}