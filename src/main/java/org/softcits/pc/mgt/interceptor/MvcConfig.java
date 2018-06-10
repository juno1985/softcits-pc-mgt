package org.softcits.pc.mgt.interceptor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class MvcConfig implements WebMvcConfigurer {

	@Autowired
	private AuthIntercepter authIntercepter;

	//注册拦截器
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(authIntercepter).addPathPatterns("/**").excludePathPatterns("/login","/register","/css/**","/fonts/**","/js/**","/page/**","/png/**","/upload/**");
	}
	
}
