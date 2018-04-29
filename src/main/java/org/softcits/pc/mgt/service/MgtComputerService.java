package org.softcits.pc.mgt.service;

import java.util.HashMap;
import java.util.Map;
import org.softcits.pc.mgt.common.SoftcitsHttpClientUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MgtComputerService {
	
	@Value("${pc.core.base.url}")
	private String PC_CORE_BASE_URL;
	@Value("${pc.core.context-path}")
	private String PC_CORE_CONTEXT_PATH;

	public String getAllComputers(String pageSize, String pageNum) {
		//使用Apache HttpClient 传输参数
		Map<String, String> params = new HashMap<String, String>();
		params.put("pageSize", pageSize);
		params.put("pageNum", pageNum);
		return SoftcitsHttpClientUtils.doGet(PC_CORE_BASE_URL + PC_CORE_CONTEXT_PATH + "/computer/all", params);
	}
	//根据PC主键删除
	public String deleteById(String cid) {
		return SoftcitsHttpClientUtils.doGet(
				PC_CORE_BASE_URL + PC_CORE_CONTEXT_PATH + "/computer/" + cid + "/delete");
	}
}
