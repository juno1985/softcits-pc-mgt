package org.softcits.pc.mgt.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.softcits.pc.mgt.common.CookieUtils;
import org.softcits.pc.mgt.model.MbgUser;
import org.softcits.pc.mgt.service.MgtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.alibaba.druid.util.StringUtils;

@Controller
public class UserController {
	
	@Autowired
	private MgtUserService mgtUserService;
	
	@Value("${COOKIE_AUTH_KEY}")
	private String COOKIE_AUTH_KEY;
	
	@RequestMapping(path="/login", method=RequestMethod.GET)
	public String goLoginView() {
		return "login";
	}
	
	@RequestMapping(path="/login", method=RequestMethod.POST)
	public String login(@RequestParam String username, @RequestParam String passwd, HttpServletRequest request, HttpServletResponse response) {
		
		String token = mgtUserService.login(username, passwd);
		//登录成功的情况
		if(!StringUtils.isEmpty(token)) {
			//将返回的token写入cookie
			CookieUtils.setCookie(request, response, COOKIE_AUTH_KEY, token);
			return "redirect:/";
		}
		//登录失败则返回登录页面
		return "redirect:/login";
	}

	@RequestMapping(path="/user/update", method=RequestMethod.POST)
	public ResponseEntity<String> updateUser(String uid, String username, String state, String roleId) {
		MbgUser user = new MbgUser();
		user.setId(Integer.parseInt(uid));
		user.setUsername(username);
		user.setRoleId(Integer.parseInt(roleId));
		user.setState(state);
		String result = mgtUserService.updateUser(user);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@RequestMapping(path="/logout", method=RequestMethod.GET)
	public String logout(HttpServletRequest request, HttpServletResponse response) {
		String cookieValue = CookieUtils.getCookieValue(request, COOKIE_AUTH_KEY);
		if(!StringUtils.isEmpty(cookieValue)) {
			//删除本地cookie
			CookieUtils.deleteCookie(request, response, COOKIE_AUTH_KEY);
		}
		mgtUserService.logout(cookieValue);
		
		return "redirect:/login";
	}
	
}
