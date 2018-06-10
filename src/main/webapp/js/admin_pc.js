$(document).ready(function(){
	// 第一次加载页面展示商品列表
	// 第1页,每页7条数据
//	pc_list(1,7);
	// 左侧导航栏箭头图标互动
	$(".panel-heading").click(function(e) {
		/* 切换折叠指示图标 */
		$(this).find("span").toggleClass("glyphicon-chevron-down");
		$(this).find("span").toggleClass("glyphicon-chevron-up");
	});
	// 绑定动态加载的添加商品按钮事件
	$('#mgt-content').on('click','.pcFormSubmit',pc_add_submit);
	// 绑定动态加载的更新商品按钮事件
	$('#mgt-content').on('click','.pcUpdateSubmit',pc_update_submit);
	
	$("#mgt-content").on('click','.userUpdateSubmit', user_update_submit);
	
	confirmLogin();
	
	function user_update_submit(){
		$('#userUpdateForm').ajaxSubmit({
			url:"/mgt/user/update",
			type:"post",
			complete:function(data){
//					console.log(data);
//					var callback_json = JSON.parse(data.responseText);
//					alert(callback_json.msg);
			}
		});
	}
	
	function confirmLogin(){
		var _cookie = $.cookie("SOFTCITS_USER_COOKIE");
		if(!_cookie)
			return;
		$.ajax({
			url: "http://localhost:8883/auth/"+_cookie+"/token",
			type: "GET",
			dataType: "jsonp",
			success:function(data){
				$("#welcome_user").html("欢迎" + data.username +"登录,");
				console.log(data.roleId);
				//如果是manager登录
				if(data.roleId == 2){
					$("#pc_menu").css("display","none");
					console.log("manager");
				}
				//如果是staff登录
				else if(data.roleId == 3){
					
					$("#user_menu").css("display","none");
					console.log("staff");
				}
			}
		});
	}
});

// 展现PC列表
function pc_list(pageNum, pageSize){
	$('#mgt-content').children().remove();
	$.ajax({
		url: "/mgt/computer/all",
		type: "GET",
		data: {"pageNum":pageNum, "pageSize":pageSize},
		dataType: "json",
		success:function(obj){
			// 一共有多少页
			var totalPage;
			var totalRows = obj.totalRows;
			// 总共分几页
		    if(totalRows/pageSize > parseInt(totalRows/pageSize)){
		        totalPage=parseInt(totalRows/pageSize)+1;
		    }else{
		        totalPage=parseInt(totalRows/pageSize);
		    }
		
			var data = obj.data;
			var content = "<table id="+'"pcTable"'+" class="+'"table table-condensed"'+" style=\"display:none\">";
			content += "<thead><tr><th>商品id</th><th>商品名称</th><th>商品价格</th><th>更新</th><th>删除</th></tr></thead><tbody>";
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
			content += "</tbody></table>";
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
	/* console.log(obj.getAttribute("value")); */
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
	// 先删除内容然后再加载添加商品html
	$('#mgt-content').children().remove();
	$.get("/mgt/page/pc_add.html", function(data){
		$('#mgt-content').html(data);
	});
}
function pc_add_submit(){
	// 如果表单验证失败
	if(!pc_form_validate('#pcForm')){
		// 则停止执行,返回false
		// 注:JS中 return false;可以停止以后所有事件执行
		return false;
	}
	
	// 将pcForm转化为数组,从而提交到后台
	var pc_form_fields = $('#pcForm').serializeArray();
	// 发生post请求
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
// 表单验证
function pc_form_validate(obj){
	var result = true;
	// 获取表单中所有的input为text的DOM
	var arrayInput = $(obj).find(":text");
	// 遍历DOM
	arrayInput.each(function(index, element){
		// 获取用户输入的值
		var input_value = $(element).val();
		// 获取验证的属性
		var type = $(element).attr("validType");
		
		switch(type){
		case "StringNotNull":
			// 如果用户输入为空,则不合法,返回false,
			if(input_value.trim()==""||input_value.length==0||input_value==null){
				$(element).css("border", "1px solid red");
				result = false;
			}
			break;
		case "NumNotNull":
			var maxValue = parseFloat($(element).attr("validMax"));
			var minValue = parseFloat($(element).attr("validMin"));
			// 判断是否为数值
			if(isNaN(input_value)){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("必须为数值").css("color","red");
				result = false;
			}
			
			// 判断是否大于最大值
			else if(typeof(maxValue)!="undefined" && parseFloat(input_value)>maxValue){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("最大值必须为"+maxValue).css("color","red");
				result = false;
			}
			// 判断是否小于最小值
			else if(typeof(minValue)!="undefined" && parseFloat(input_value)<minValue){
				$(element).css("border", "1px solid red");
				$(element).next(".err").text("最小值必须为"+minValue).css("color","red");
				result = false;
			}
			break;
		}
	});
	
	return result;
}
function pcClick(obj){
	$('#myModal').modal();
	// 得到商品id
	var cid = obj.getAttribute("value");
	$.ajax({
	
		url: "/mgt/computer/" + cid + "/query",
		type: "GET",
		dataType: "json",
		success:function(data){
				/*
				 * console.log(data.cid + ' ' + data.tradeMark + ' ' +
				 * data.price + ' ' + data.pic);
				 */
				$('#trade_mark').text("商品名称:  " + data.trademark);
				$('#pcprice').text("商品价格: " + data.price + "元");
				$('#pcpic').attr("src", "/mgt/upload/pc_pic/" + data.pic);
			}
	});	
}
function pcUpldate(obj){
	$("#mgt-content").children().remove();
	$.get("/mgt/page/pc_update.html", function(data){
		$("#mgt-content").html(data);
	});
	
	var cid = obj.getAttribute("value");
	
	// 查询然后存进页面
	$.ajax({
		url: "/mgt/computer/" + cid + "/query",
		type: "GET",
		dataType: "json",
		success:function(data){
				$('#mgt-content .cid').val(data.id);
				$('#mgt-content .tradeMark').val(data.trademark);
				$('#mgt-content .price').val(data.price);
			}
	});
}
function pc_update_submit(){
	// 如果表单验证失败
	if(!pc_form_validate('#pcUpdateForm')){
		// 则停止执行,返回false
		// 注:JS中 return false;可以停止以后所有事件执行
		return false;
	}
	
	// 提交表单
	$("#pcUpdateForm").ajaxSubmit({
		url: "/mgt/computer/update",
		type: "post",
		complete: function(data){
			var callback_json = JSON.parse(data.responseText);
			alert(callback_json.msg);
		}
	});
}
function get_users(obj){
	var uJson = obj;
	$("#mgt-content").children().remove();
	var content = "<table id="+'"userTable"'+" class="+'"table table-condensed"'+" style=\"display:none\">";
	content += "<thead><tr><th>员工id</th><th>员工名称</th><th>注册时间</th><th>状态</th><th>角色</th></tr></thead><tbody>";
	$(uJson).each(function(index, element){
// console.log(element.username + " " + element.roleId);
		var u_date = new Date(element.createTime);
		content += "<tr><td>"+element.id+'</td><td><a id="user" href="javascript:void(0);" onClick="userClick(this)" value="'+ element.id +'">'+element.username+"</a></td><td>"+u_date.toLocaleDateString()+"</td>"+
		"<td>"+element.state+"</td>"+"<td>"+element.rolename+"</td>"
		+"</tr>";
	});
	content += "</tbody></table>";
	$('#mgt-content').append(content).find('#userTable').show('slow');
}
function users_list(){
	$("head").append("<script type=\"text/javascript\" src=\"http://localhost:8883/auth/user/getAll\"></script>")
}
function userClick(obj){
	var uid = obj.getAttribute("value");
	var pageLink = "/mgt/page/user_update.html";
	$.get(pageLink, function(data){
		$("#mgt-content").children().remove();
		$('#mgt-content').html(data);
	});
	$.ajax({
		url: "http://localhost:8883/auth/user/"+uid+"/update",
		type: "GET",
		dataType: "jsonp",
		success:function(data){
// console.log("uid--> " + data.mbgUser.id);
// console.log("uname--> " + data.mbgUser.username);
			var user = data.mbgUser;
			var roleArray = data.mbgRole;
			var stateArray = data.states;
			$("#userUpdateForm .uid").val(uid);
			$("#userUpdateForm .username").val(user.username);
			
			$(stateArray).each(function(index, element){
				if(user.state==element){
					$("#state_div").append("<label class=\"radio-inline\"> <input type=\"radio\""
						+ "name=\"state\"" 
						+ "value=\"" + element +"\""
						+	"checked>" + element
						+ "</label>");
				}
				else{
					$("#state_div").append("<label class=\"radio-inline\"> <input type=\"radio\""
							+ "name=\"state\"" 
							+ "value=\"" + element +"\""
							+	">" + element
							+ "</label>");
				}
				
			});
			
			$(roleArray).each(function(index, element){
				if(user.roleId==element.id){
					$("#role_div").append("<label class=\"radio-inline\"> <input type=\"radio\""
							+ "name=\"roleId\"" 
							+ "value=\"" + element.id +"\""
							+	"checked>" + element.rolename
							+ "</label>");
				}
				else
				{
					$("#role_div").append("<label class=\"radio-inline\"> <input type=\"radio\""
							+ "name=\"roleId\"" 
							+ "value=\"" + element.id +"\""
							+	">" + element.rolename
							+ "</label>");
				}
			});
			
			}
	});
}