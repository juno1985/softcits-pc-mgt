$(document).ready(function() {
	$('#username').blur(function() {
		if ($(this).val() == "" || $(this).val() == "请输入用户名") {
			$(this).next().text("账户不能为空").css("color", "red");
		} else if ($(this).val().length < 4) {
			$(this).next().text("账户不能少于四位").css("color", "red");
		} else {
			$(this).next().empty();
		}
	});

	$('#passwd').blur(function() {
		//正则表达式,密码必须为4~8位的字母或数字
		var reg = /^[0-9a-zA-Z]{4,8}$/;
		if ($(this).val() == "" || $(this).val() == "请输入密码") {
			$(this).next().text("密码不能为空").css("color", "red");
		} 
		else if(!reg.test($(this).val())){
			$(this).next().text("密码必须为4~8位的字母或数字").css("color", "red");
		}
		else{
			$(this).next().empty();
		}
	});

	$('#repasswd').blur(function(){
		if ($(this).val() != $('#passwd').val()){
			$(this).next().text("两次输入的密码不相同").css("color", "red");
		}
		else{
			$(this).next().empty();
		}
	});
});