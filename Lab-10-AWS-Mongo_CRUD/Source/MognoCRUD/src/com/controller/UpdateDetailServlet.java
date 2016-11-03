package com.controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bean.UserBean;
import com.google.gson.Gson;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 * Servlet implementation class UpdateDetailServlet
 */
@WebServlet("/updateDetail.do")
public class UpdateDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateDetailServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		service(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		service(request, response);
	}
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String fname = request.getParameter("fname");
		String lname = request.getParameter("lname");
		String mail = request.getParameter("email");
		String salary=request.getParameter("salary");
		String address=request.getParameter("address");
		String pass  = request.getParameter("password");
		UserBean user = new UserBean();
		user.setEmail(mail);
		user.setFname(fname);
		user.setLname(lname);
		user.setSalary(salary);
		user.setAddress(address);
		user.setPassword(pass);
		Gson gson = new Gson();

		// convert java object to JSON format,
		// and returned as JSON formatted string
		String json = gson.toJson(user);
		System.out.println(json);
		Client client = Client.create();
		WebResource web = client.resource("http://asesampleproject.cpmgzupmmd.us-west-2.elasticbeanstalk.com/sampleWeb/getUser/update");
		System.out.println("hello");
		ClientResponse response1 = web.type("application/json")
				   .put(ClientResponse.class,json);
		String res = response1.getEntity(String.class);
		if( res != null && !res.equals(""))
		{
		RequestDispatcher rd = request.getRequestDispatcher("getallrecord.do");
		rd.forward(request, response);
		}
	}
}
