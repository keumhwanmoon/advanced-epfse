/*
--------------------------------------------------------------------------------
	PROJECT NAME : EPF-SE
--------------------------------------------------------------------------------
	- 단위업무명 : 채널
	- 최초작성일 : 2014-04-16
	- 작  성  자 : 문금환
	- 비      고 : 
--------------------------------------------------------------------------------
*/
package com.ecosian.epfse.system.common;

import java.util.List;

public class Channel
{
	private List   rsltList; // 결과목록
	private Object rsltInfo; // 결과정보
	private int    rsltNo  ; // 결과번호

	// getter
	public List   getRsltList() { return this.rsltList; };
	public Object getRsltInfo() { return this.rsltInfo; };
	public int    getRsltNo  () { return this.rsltNo  ; };

	// setter
	public void setRsltList(List   lstSet) { this.rsltList = lstSet; };
	public void setRsltInfo(Object objSet) { this.rsltInfo = objSet; };
	public void setRsltNo  (int    intSet) { this.rsltNo   = intSet; };
}