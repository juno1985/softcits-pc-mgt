<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/mgt/css/bootstrap.min.css">
<!-- 引入jQuery文件 -->
<script type="text/javascript" src="/mgt/js/jquery.min.js"></script>
<script type="text/javascript" src="/mgt/js/bootstrap.min.js"></script>
<script type="text/javascript" src="/mgt/js/jquery.form.js"></script>
<script type="text/javascript" src="/mgt/js/admin_pc.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<nav class="navbar navbar-default" role="navigation">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">PC后台管理</a>
				</div>
				<div>
					<ul class="nav navbar-nav  navbar-right">
						<li class="active"><a href="#">退出登录</a></li>
					</ul>
				</div>
			</div>
			</nav>
		</div>
		<div class="row">
			<div class="col-md-2">
				<div class="panel-group table-responsive" role="tablist">
					<div class="panel panel-primary leftMenu">
						<!-- 利用data-target指定要折叠的分组列表 -->
						<div class="panel-heading" id="collapseListGroupHeading1"
							data-toggle="collapse" data-target="#collapseListGroup1"
							role="tab">
							<h4 class="panel-title">
								PC管理 <span class="glyphicon glyphicon-chevron-up right"></span>
							</h4>
						</div>
						<!-- .panel-collapse和.collapse标明折叠元素 .in表示要显示出来 -->
						<div id="collapseListGroup1" class="panel-collapse collapse in"
							role="tabpanel" aria-labelledby="collapseListGroupHeading1">
							<ul class="list-group">
								<li class="list-group-item"><a href="javascript:void(0);">PC列表</a>
								</li>
								<li class="list-group-item"><a href="javascript:void(0);">添加PC</a>
								</li>

							</ul>
						</div>
					</div>
					<!--panel end-->
					<div class="panel panel-primary leftMenu">
						<div class="panel-heading" id="collapseListGroupHeading2"
							data-toggle="collapse" data-target="#collapseListGroup2"
							role="tab">
							<h4 class="panel-title">
								人员管理 <span class="glyphicon glyphicon-chevron-down right"></span>
							</h4>
						</div>
						<div id="collapseListGroup2" class="panel-collapse collapse"
							role="tabpanel" aria-labelledby="collapseListGroupHeading2">
							<ul class="list-group">
								<li class="list-group-item">
									<button class="menu-item-left">
										<span class="glyphicon glyphicon-triangle-right"></span>分组项2-1
									</button>
								</li>
								<li class="list-group-item">
									<button class="menu-item-left">
										<span class="glyphicon glyphicon-triangle-right"></span>分组项2-2
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-1"></div>
			<div class="col-md-9"><div id="mgt-content"></div></div>
		</div>
	</div>
</body>
</html>