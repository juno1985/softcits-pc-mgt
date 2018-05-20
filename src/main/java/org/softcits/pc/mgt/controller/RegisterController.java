package org.softcits.pc.mgt.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class RegisterController {

	@RequestMapping(path="/register", method=RequestMethod.GET)
	public String goRegisterView() {
		return "register";
	}
}
