<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!-- 防止浏览器缓存JS -->
<meta http-equiv="expires" content="0">  
<meta http-equiv="pragma" content="no-cache">  
<meta http-equiv="cache-control" content="no-cache">  
<title>Insert title here</title>
<link rel="stylesheet" href="/mgt/css/bootstrap.min.css">
<!-- 引入jQuery文件 -->
<script type="text/javascript" src="/mgt/js/jquery.min.js"></script>
<script type="text/javascript" src="/mgt/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/mgt/js/jquery.form.js"></script>
<script type="text/javascript" src="/mgt/js/register.js"></script>
</head>
<body>
<div class="container" style="margin-top:100px">
	<form class="col-md-offset-4 col-md-4 form form-horizontal" action="/mgt/register" method="post" id="login_form">
		<h3 class="text-center">用户注册</h3>
		<div class="form-group">
			<label for="username" class="col-md-2 control-label">账&nbsp;户:</label>
			<div class="col-md-10">
				<input  type="text" class="form-control" id="username" name="username" placeholder="请输入用户名">
				<span class="err"></span>
			</div>
		</div>	
		
		<div class="form-group">
			<label for="passwd" class="col-md-2 control-label">密&nbsp;码:</label>
			<div class="col-md-10">
				<input  type="password" class="form-control" id="passwd" name="passwd" placeholder="请输入密码">
				<span class="err"></span>
			</div>
		</div>	
		
		<div class="form-group">
			<label for="repasswd" class="col-md-2 control-label">确&nbsp;认:</label>
			<div class="col-md-10">
				<input  type="password" class="form-control" id="repasswd" name="repasswd" placeholder="请重复输入密码">
				<span class="err"></span>
			</div>
		</div>	
		<button type="submit" class="btn btn-success center-block">注册</button>
	</form>
</div>
</body>
</html>