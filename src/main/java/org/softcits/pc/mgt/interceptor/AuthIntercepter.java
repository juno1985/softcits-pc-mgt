package org.softcits.pc.mgt.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.softcits.pc.mgt.common.CookieUtils;
import org.softcits.pc.mgt.service.MgtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.alibaba.druid.util.StringUtils;
@Component
public class AuthIntercepter extends HandlerInterceptorAdapter {
	
	@Value("${COOKIE_AUTH_KEY}")
	private String COOKIE_AUTH_KEY;
	@Autowired
	private MgtUserService mgtUserService;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		//取token
		String token = CookieUtils.getCookieValue(request, COOKIE_AUTH_KEY);
		//判断是否为空
		if(StringUtils.isEmpty(token)) {
			//如果token没取到即未登录
			response.sendRedirect("/mgt/login");
			return false;
		}
		else {
			String userJson = mgtUserService.getUserByToken(token);
			if(StringUtils.isEmpty(userJson)) {
				response.sendRedirect("/login");
				return false;
			}
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		super.postHandle(request, response, handler, modelAndView);
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		super.afterCompletion(request, response, handler, ex);
	}

	@Override
	public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		super.afterConcurrentHandlingStarted(request, response, handler);
	}

}
