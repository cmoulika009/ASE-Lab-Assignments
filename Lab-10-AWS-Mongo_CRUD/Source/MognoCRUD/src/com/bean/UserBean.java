package com.bean;

public class UserBean {
	private String fname;
	private String lname;
	private String email;
	private String password;
	private String salary;
	private String address;
	
	public String getFname() {
		return fname;
	}
	public String getLname() {
		return lname;
	}
	public String getEmail() {
		return email;
	}
	public String getSalary(){
		return salary;
	}
	public String getAddress(){
		return address;
	}
	public String getPassword() {
		return password;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setSalary(String salary) {
		this.salary = salary;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
}
