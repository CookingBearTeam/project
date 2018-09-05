package com.jdbc.util;

import java.io.UnsupportedEncodingException;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class StringUtil {

    public static boolean isNotNull(String str){
        boolean isSuc = false;
        if(null != str && !"".equals(str)){
            isSuc = true;
        }

        return isSuc;
    }

    public static String join(Object[] o , String flag){
        StringBuffer str_buff = new StringBuffer();

        for(int i=0 , len=o.length ; i<len ; i++){
            str_buff.append( String.valueOf( o[i] ) );
            if(i<len-1)str_buff.append( flag );
        }

        return str_buff.toString();
    }

    /**
     * 根据规则生成纯数字的验证码
     * @return
     */
    public static String verify(){
        Random random=new Random();//实例化一个random的对象
        return String.valueOf(random.nextInt(9999-1000+1)+1000);
    }

    /**
     * Base64加密  
     * @param str
     * @return
     */
    public static String getBase64(String str) {  
        byte[] b = null;  
        String s = null;  
        try {  
            b = str.getBytes("utf-8");  
        } catch (UnsupportedEncodingException e) {  
            e.printStackTrace();  
        }  
        if (b != null) {  
            s = new BASE64Encoder().encode(b);  
        }  
        return s;  
    }  
    
    /**
     *Base64解密
     * @param s
     * @return
     */ 
    public static String getFromBase64(String s) {  
        byte[] b = null;  
        String result = null;  
        if (s != null) {  
            BASE64Decoder decoder = new BASE64Decoder();  
            try {  
                b = decoder.decodeBuffer(s);  
                result = new String(b, "utf-8");  
            } catch (Exception e) {  
                e.printStackTrace();  
            }  
        }  
        return result;  
    }
    
    /**
     * 将textarea文本变成html格式
     */
    public static String textarea2Html(String str) {
        if (isNotNull(str)) {
            str = str.replaceAll("<", "&lt;");
            str = str.replaceAll(">", "&gt;");
        }
        
        return str;
    }
    /**
     * 将textarea文本变成html格式
     */
    public static String textarea2Htmls(String str) {
        if (isNotNull(str)) {
            str = str.replaceAll("_", "\\\\_");
            str = str.replaceAll("%", "\\\\%");
        }
        
        return str;
    }
    
    /**
     * 判断内容是否含有非法字符
     */
    public static boolean validateBody(String str){
        boolean isSuc = true;
        
        Matcher mj = Pattern.compile("<script(.*?)/script>").matcher(str.toLowerCase());
        Matcher mf = Pattern.compile("<iframe(.*?)/iframe>").matcher(str.toLowerCase());
        Matcher ms = Pattern.compile("<style(.*?)/style>").matcher(str.toLowerCase());
        Matcher mj1 = Pattern.compile("<script(.*?)/>").matcher(str.toLowerCase());
        Matcher mf1 = Pattern.compile("<iframe(.*?)/>").matcher(str.toLowerCase());
        Matcher ms1 = Pattern.compile("<style(.*?)/>").matcher(str.toLowerCase());
        
        if (mj.find()||mf.find()||ms.find()||mj1.find()||mf1.find()||ms1.find()) {
            isSuc = false;
        }
        
        return isSuc;
    }
    
    /**
     * 过滤危险单词
     */
    public static String filterWord(String str ,String word){
        
        int le = 0;
        if (word.split(",").length > 0) {
            for (int i = 0; i < word.split(",").length; i++) {
                if (str.contains(word.split(",")[i])) {
                    le++;
                    str = str.replaceAll(word.split(",")[i], "*****");
                }
            }
        }
        
        str = str.replaceAll("onabort", "ｏnabort");
        str = str.replaceAll("onblur", "ｏnblur");
        str = str.replaceAll("onchange", "ｏnchange");
        str = str.replaceAll("onclick", "ｏnclick");
        str = str.replaceAll("ondblclick", "ｏndblclick");
        str = str.replaceAll("onerror", "ｏnerror");
        str = str.replaceAll("onfocus", "ｏnfocus");
        str = str.replaceAll("onkeydown", "ｏnkeydown");
        str = str.replaceAll("onkeypress", "ｏnkeypress");
        str = str.replaceAll("onkeyup", "ｏnkeyup");
        str = str.replaceAll("onload", "ｏnload");
        str = str.replaceAll("onmousedown", "ｏnmousedown");
        str = str.replaceAll("onmousemove", "ｏnmousemove");
        str = str.replaceAll("onmouseout", "ｏnmouseout");
        str = str.replaceAll("onmouseover", "ｏnmouseover");
        str = str.replaceAll("onmouseup", "ｏnmouseup");
        str = str.replaceAll("onreset", "ｏnreset");
        str = str.replaceAll("onresize", "ｏnresize");
        str = str.replaceAll("onselect", "ｏnselect");
        str = str.replaceAll("onsubmit", "ｏnsubmit");
        str = str.replaceAll("onunload", "ｏnunload");
        str = str.replaceAll("altKey", "ａltKey");
        str = str.replaceAll("button", "ｂutton");
        str = str.replaceAll("clientX", "ｃlientX");
        str = str.replaceAll("clientY", "ｃlientY");
        str = str.replaceAll("ctrlKey", "ｃtrlKey");
        str = str.replaceAll("metaKey", "ｍetaKey");
        str = str.replaceAll("relatedTarget", "ｒelatedTarget");
        str = str.replaceAll("screenX", "ｓcreenX");
        str = str.replaceAll("screenY", "ｓcreenY");
        str = str.replaceAll("shiftKey", "ｓhiftKey");
        str = str.replaceAll("href", "ｈref");
        
        
        if (le > 10) {
            str = "";
        }
        
        return str;
    }

    /**
     * 将textarea文本变成html格式
     */
    public static String textarea2AllHtml(String str) {
        if (isNotNull(str)) {
            str = str.replaceAll("&", "&amp;");
            str = str.replaceAll("\"", "&quot;");
            str = str.replaceAll("￠", "&cent;");
            str = str.replaceAll("£", "&pound;");
            str = str.replaceAll("¥", "&yen;");
            str = str.replaceAll("€", "&euro;");
            str = str.replaceAll("§", "&sect;");
            str = str.replaceAll("©", "&copy;");
            str = str.replaceAll("®", "&reg;");
            str = str.replaceAll("™", "&trade;");
            str = str.replaceAll("×", "&times;");
            str = str.replaceAll("÷", "&divide;");
            str = str.replaceAll("<", "&lt;");
            str = str.replaceAll(">", "&gt;");
        }else {

        }

        return str;
    }
    
    /**
     * 
     */
    public static String textarea2AllHtmls(String str) {
        if (isNotNull(str)) {
            str = str.replaceAll("&", "");
            str = str.replaceAll("\"", "");
            str = str.replaceAll("￠", "");
            str = str.replaceAll("£", "");
            str = str.replaceAll("¥", "");
            str = str.replaceAll("€", "");
            str = str.replaceAll("§", "");
            str = str.replaceAll("©", "");
            str = str.replaceAll("®", "");
            str = str.replaceAll("™", "");
            str = str.replaceAll("×", "");
            str = str.replaceAll("÷", "");
            str = str.replaceAll("<", "");
            str = str.replaceAll(">", "");
        }
        return str;
    }

}
