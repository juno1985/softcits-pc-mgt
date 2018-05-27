package org.softcits.pc.mgt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.softcits.pc.mgt.common.SoftcitsJsonUtil;
import org.softcits.pc.mgt.common.UUIDUtil;
import org.softcits.pc.mgt.service.MgtComputerService;
import org.softcits.pc.mgt.model.MbgComputer;
@Controller
public class MgtComputerController {
	
	@Autowired
	private MgtComputerService mgtComputerService;
	
	/**
	 * 跳转到WEB-INF/jsp/admin.jsp页面
	 * @return
	 */
	@RequestMapping(path= "/", method = RequestMethod.GET)
	public String goAdminView() {
		return "admin";
	}

	@RequestMapping(path="/computer/all", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> getAllComputers(@RequestParam String pageSize, @RequestParam String pageNum) {
		return new ResponseEntity<String>(mgtComputerService.getAllComputers(pageSize, pageNum),HttpStatus.OK);
	}
	
	@RequestMapping(path="/computer/{cid}/delete", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> deleteById(@PathVariable String cid) {
		return new ResponseEntity<String>(mgtComputerService.deleteById(cid),HttpStatus.OK);
	}
	
	@RequestMapping(path="/computer/add", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> addComputer(@RequestParam(required=true) String tradeMark, 
			@RequestParam(required=true) String price, @RequestParam("pic") MultipartFile fileAttach, HttpServletRequest req ) throws IOException{
		//判断上传文件是否为空
		if(!fileAttach.isEmpty()){
			//得到上传文件名
			String fileName = fileAttach.getOriginalFilename();
			
			//得到上传文件的扩展名
			String fileExt = FilenameUtils.getExtension(fileName);
			
			//生成新的文件名,避免上传文名重复从而发生覆盖
			String newFileName = UUIDUtil.UUIDGenerator() + '.' + fileExt;
			
	/*		System.out.println("tradeMark: " + tradeMark);
			System.out.println("price: " + price);
			System.out.println("attachment: " + fileName);*/
			//得到磁盘的物理路径
			String realPath = req.getSession().getServletContext().getRealPath("/upload/pc_pic");
			//创建本地实体文件
			//F:\git-repo\SpringWeb\src\main\webapp\resources\pic + "\" + "Logo.png" 
			File file = new File(realPath + "/" + newFileName);
			
			//实现文件的上传拷贝
			FileUtils.copyInputStreamToFile(fileAttach.getInputStream(), file);
			MbgComputer  mbgComputer = new MbgComputer();
			mbgComputer.setTrademark(tradeMark);
			mbgComputer.setPrice(Float.parseFloat(price));
			mbgComputer.setPic(newFileName);
			String result = mgtComputerService.addComputer(mbgComputer);
			
			return new ResponseEntity<String>(result, HttpStatus.OK);

		}
		
		Map<String, String> callback_json = new HashMap<String, String>();
		callback_json.put("msg", "图片没有上传!");
		String result = SoftcitsJsonUtil.objectToJson(callback_json);
		return new ResponseEntity<String>(result, HttpStatus.BAD_REQUEST);
		
	}
	
	@RequestMapping(path="/computer/{cid}/query", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<String> queryById(@PathVariable String cid) {
		return new ResponseEntity<String>(mgtComputerService.queryById(cid),HttpStatus.OK);
	}
	
	@RequestMapping(path="/computer/update", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<String> computeUpdate(@RequestParam(required=true) String cid, @RequestParam(required=true) String tradeMark, 
			@RequestParam(required=true) String price){
		MbgComputer mbgComputer = new MbgComputer();
		mbgComputer.setId(Integer.parseInt(cid));
		mbgComputer.setTrademark(tradeMark);
		mbgComputer.setPrice(Float.parseFloat(price));
		
		String result = mgtComputerService.computerUpdate(mbgComputer);
		System.out.println(result);
		return new ResponseEntity<String>(result, HttpStatus.OK);
	}

}
