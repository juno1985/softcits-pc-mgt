package org.softcits.pc.mgt;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.softcits.pc.mgt.auth.AuthUtil;
import org.springframework.stereotype.Component;
@Component//被spring容器管理
public class ApplicationStartup implements ApplicationRunner{

	@Override
	public void run(ApplicationArguments args) throws Exception {
		
		System.out.println("-----------初始化系统权限-----------");
		System.out.println(AuthUtil.allAuths);
	}

}
