package org.softcits.pc.mgt.controller;

import org.softcits.pc.mgt.model.MbgUser;
import org.softcits.pc.mgt.service.MgtUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class UserController {
	
	@Autowired
	private MgtUserService mgtUserService;
	
	@RequestMapping(path="/login", method=RequestMethod.GET)
	public String goLoginView() {
		return "login";
	}
	
	@RequestMapping(path="/login", method=RequestMethod.POST)
	public String login(@RequestParam String username, @RequestParam String passwd) {
		
		mgtUserService.login(username, passwd);
		
		return "redict:/";
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
	
	
}
