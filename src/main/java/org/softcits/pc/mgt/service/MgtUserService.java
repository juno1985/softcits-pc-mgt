package org.softcits.pc.mgt.service;

import java.util.HashMap;
import java.util.Map;

import org.softcits.pc.mgt.common.SoftcitsHttpClientUtils;
import org.softcits.pc.mgt.common.SoftcitsJsonUtil;
import org.softcits.pc.mgt.model.MbgUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class MgtUserService {

	@Value("${auth.core.base.url}")
	private String AUTH_CORE_BASE_URL;
	@Value("${auth.core.context-path}")
	private String AUTH_CORE_CONTEXT_PATH;
	
	
	public String updateUser(MbgUser user) {
		//将对象转化为json
		String userJson = SoftcitsJsonUtil.objectToJson(user);
		return SoftcitsHttpClientUtils.doPostJson(AUTH_CORE_BASE_URL + AUTH_CORE_CONTEXT_PATH + "/user/update", userJson);
	}


	public String login(String username, String passwd) {
		Map<String, String> param = new HashMap<String, String>();
		param.put("username", username);
		param.put("passwd", passwd);
		return SoftcitsHttpClientUtils.doPost(AUTH_CORE_BASE_URL + AUTH_CORE_CONTEXT_PATH + "/user/login", param);
	}


	public String logout(String token) {
		return SoftcitsHttpClientUtils.doGet(AUTH_CORE_BASE_URL + AUTH_CORE_CONTEXT_PATH + "/" + token+ "/logout");
	}
}
