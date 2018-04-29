$(document).ready(function(){
	pc_list();
});

//展现PC列表
function pc_list(){
	$('#mgt_content').children().remove();
	$.ajax({
		url: "/mgt/computer/all",
		type: "GET",
		dataType: "json",
		success:function(data){
		
			var content = "<table id="+'"pcTable"'+" class="+'"table table-condensed"'+"><tbody>";
			content += "<thead><tr><th>商品id</th><th>商品名称</th><th>商品价格</th><th>更新</th><th>删除</th></tr></thead>";
			// v-value, i-index
			data.forEach(function(v,i){
				/*
				 * console.log(v.cid + ' ' + v.tradeMark + ' ' + v.price + ' ' +
				 * v.pic);
				 */
				content += "<tr><td>"+v.id+'</td><td><a id="pc" href="javascript:void(0);" onClick="pcClick(this)" value="'+ v.id +'">'+v.trademark+"</a></td><td>"+v.price+"元</td>"+
							'<td><a href="javascript:void(0);" onClick="pcUpldate(this)" value="'+v.id+'">更新</a></td>'+
							'<td><a href="/mgt/admin/pc/delete/'+v.id+'">删除</a></td>'+
							"</tr>";
			}); 
			content += "</table></tbody>";
			$('#mgt-content').append(content);
		}
	});	
}