package org.softcits.pc.mgt.service;

import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MgtComputerService {
	
	@Value("${pc.core.base.url}")
	private String PC_CORE_BASE_URL;
	@Value("${pc.core.context-path}")
	private String PC_CORE_CONTEXT_PATH;

	public String getAllComputers(String pageSize, String pageNum) {
		// 创建Httpclient对象
		CloseableHttpClient httpclient = HttpClients.createDefault();
		String resultString = "";
		CloseableHttpResponse response = null;
		try {
			// 创建uri
			URIBuilder builder = new URIBuilder( PC_CORE_BASE_URL + PC_CORE_CONTEXT_PATH + "/computer/all");
			//使用Apache HttpClient 传输参数
			Map<String, String> params = new HashMap<String, String>();
			params.put("pageSize", pageSize);
			params.put("pageNum", pageNum);
			for(String key : params.keySet()) {
				builder.addParameter(key, params.get(key));
			}
			
			URI uri = builder.build();
			// 创建http GET请求
			HttpGet httpGet = new HttpGet(uri);
			// 执行请求
			response = httpclient.execute(httpGet);
			// 判断返回状态是否为200
			if (response.getStatusLine().getStatusCode() == 200) {
				resultString = EntityUtils.toString(response.getEntity(), "UTF-8");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (response != null) {
					response.close();
				}
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return resultString;
	}
}
