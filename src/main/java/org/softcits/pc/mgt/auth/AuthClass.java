package org.softcits.pc.mgt.auth;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * 只要在Controller上增加了这个方法的类，都需要进行权限的控制
 *
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthClass {
}
