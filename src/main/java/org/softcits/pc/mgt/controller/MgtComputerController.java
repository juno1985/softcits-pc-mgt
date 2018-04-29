package org.softcits.pc.mgt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.softcits.pc.mgt.service.MgtComputerService;
@Controller
public class MgtComputerController {
	
	@Autowired
	private MgtComputerService mgtComputerService;
	
	/**
	 * 跳转到WEB-INF/jsp/admin.jsp页面
	 * @return
	 */
	@RequestMapping(path= {"","/"}, method = RequestMethod.GET)
	public String goAdminView() {
		return "admin";
	}

	@RequestMapping(path="/computer/all", method = RequestMethod.GET)
	@ResponseBody
	public String getAllComputers() {
		return mgtComputerService.getAllComputers();
	}

}
