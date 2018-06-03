package org.softcits.pc.mgt.service;

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
}
