package org.softcits.pc.mgt.auth;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
/**
 * 
 * @author thinkpad
 *
 *	roleId 设定权限
 *	1 - admin可以访问
 *	2 - manager可以访问
 *	3 - staff 可以访问
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthMethod {
	public String roleId() default "";
}

