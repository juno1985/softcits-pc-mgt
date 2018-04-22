package org.softcits.pc.mgt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
/**
 * 
 * @author thinkpad
 * 解决'spring.datasource.url' is not specified and no embedded datasource could be auto-configured.
 * 解释: SpringBoot默认会去加载datasource,而由于pc-mgt模块只是前端模块,不涉及数据库操作
 * 		所以不需要加载datasource
 */
@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class PCMgtApplication {

	public static void main(String[] args) {
		SpringApplication.run(PCMgtApplication.class, args);
	}

}
