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
	//如果表单验证失败
	if(!pc_form_validate('#pcForm')){
		//则停止执行,返回false
		//注:JS中 return false;可以停止以后所有事件执行
		return false;
	}
	
	//将pcForm转化为数组,从而提交到后台
	var pc_form_fields = $('#pcForm').serializeArray();
	//发生post请求
	$('#pcForm').ajaxSubmit({
		url:"/mgt/computer/add",
		type:"post",
		complete:function(data){
				console.log(data);
				var callback_json = JSON.parse(data.responseText);
				alert(callback_json.msg);
		}
	});
}
//表单验证
function pc_form_validate(obj){
	var result = true;
	//获取表单中所有的input为text的DOM
	var arrayInput = $(obj).find(":text");
	//遍历DOM
	arrayInput.each(function(index, element){
		//获取用户输入的值
		var input_value = $(element).val();
		//获取验证的属性
		var type = $(element).attr("validType");
		
		switch(type){
		case "StringNotNull":
			//如果用户输入为空,则不合法,返回false,
			if(input_value.trim()==""||input_value.length==0||input_value==null){
				$(element).css("border", "1px solid red");
				result = false;
			}
			break;
		case "NumNotNull":
			var maxValue = $(element).attr("validMax");
			var minValue = $(element).attr("validMin");
			//判断是否为数值
			if(isNaN(input_value)){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("必须为数值").css("color","red");
				result = false;
			}
			
			//判断是否大于最大值
			else if(typeof(maxValue)!="undefined" && input_value>maxValue){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("最大值必须为"+maxValue).css("color","red");
				result = false;
			}
			//判断是否小于最小值
			else if(typeof(minValue)!="undefined" && input_value<minValue){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("最小值必须为"+minValue).css("color","red");
				result = false;
			}
			break;
		}
	});
	return result;
}