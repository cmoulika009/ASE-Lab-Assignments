package com.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.bean.UserBean;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

/**
 * Servlet implementation class GetAllRecord
 */
@WebServlet("/getallrecord.do")
public class GetAllRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAllRecord() {
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
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		Client client = Client.create();
		WebResource web = client.resource("http://localhost:8091/MognoCRUDProject/sampleWeb/findrecipe/getRecord");
		System.out.println("hello");
		ClientResponse response1 = web.type("application/json")
				   .get(ClientResponse.class);
		String resp = response1.getEntity(String.class);
		JSONArray jsonA = null;
		try {
			jsonA = new JSONArray(resp);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		List<UserBean> userList = new ArrayList<UserBean>();
		
		for(int i=0;i<jsonA.length();i++){                        
		    UserBean user = new UserBean();    
		    JSONObject e = jsonA.getJSONObject(i);
		    user.setEmail(e.getString("email"));
		    user.setFname(e.getString("fname"));
		    user.setLname(e.getString("lname"));
		    user.setPassword(e.getString("password"));
		    System.out.println(user.getEmail() + " " + user.getFname());
		     userList.add(user);            
		}
		request.setAttribute("userList", userList);
		RequestDispatcher rd = request.getRequestDispatcher("admin.jsp");
		rd.forward(request, response);
	}
}
