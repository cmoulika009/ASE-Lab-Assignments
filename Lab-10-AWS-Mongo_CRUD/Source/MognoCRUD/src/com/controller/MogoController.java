package com.controller;

import java.util.ArrayList;
import java.util.List;

import javax.swing.plaf.synth.SynthSpinnerUI;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.bean.UserBean;
import com.dao.MongoConnection;
import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

@Path("/getUser")
public class MogoController {
	@GET
	@Path("/getRecord/{email}")
	@Produces(MediaType.APPLICATION_JSON)
	public List<UserBean> getAllRecordFromEmail(@PathParam("email") String mail) {
		MongoConnection mc = new MongoConnection();
		DB db = mc.createConnnect();
		DBCollection users = db.getCollection("userdatabase");
		BasicDBObject query = new BasicDBObject();
		query.put("email",mail);// request.getParameter("name"));
		DBCursor cursor = users.find(query);
		List<UserBean> list = new ArrayList<UserBean>();
		System.out.println("count" +cursor.count());
		while (cursor.hasNext() ) {
			DBObject o = cursor.next();
			UserBean userRecord = new UserBean();
			userRecord.setFname((String) o.get("fname"));
			userRecord.setLname((String) o.get("lname"));
			userRecord.setEmail((String) o.get("email"));
			userRecord.setSalary((String) o.get("salary"));
			userRecord.setAddress((String) o.get("address"));
			userRecord.setPassword((String) o.get("password"));
			System.out.println(userRecord.getEmail());
			list.add(userRecord);
		}
		return list;
	}
	@GET
	@Path("/getRecord")
	@Produces(MediaType.APPLICATION_JSON)
	public List<UserBean> getAllRecord() {
		MongoConnection mc = new MongoConnection();
		DB db = mc.createConnnect();
		DBCollection users = db.getCollection("userdatabase");
		BasicDBObject query = new BasicDBObject();
		DBCursor cursor = users.find(query);
		List<UserBean> list = new ArrayList<UserBean>();
		System.out.println("count" +cursor.count());
		while (cursor.hasNext() ) {
			DBObject o = cursor.next();
			UserBean userRecord = new UserBean();
			userRecord.setFname((String) o.get("fname"));
			userRecord.setLname((String) o.get("lname"));
			userRecord.setEmail((String) o.get("email"));
			userRecord.setSalary((String) o.get("salary"));
			userRecord.setAddress((String) o.get("address"));
			userRecord.setPassword((String) o.get("password"));
			System.out.println(userRecord.getEmail());
			list.add(userRecord);
		}
		return list;
	}
	
	@POST
    @Path("/insert")  
	@Consumes(MediaType.APPLICATION_JSON) 
	@Produces("text/plain")  
    public Response insert(String user){
		MongoConnection mc = new MongoConnection();
		DB db = mc.createConnnect();
		DBCollection users = db.getCollection("userdatabase");
		System.out.println(user);
		Gson gson = new Gson();
		UserBean user1 = gson.fromJson(user,UserBean.class);
		System.out.println(user1.getFname() + " " + user1.getEmail() +" "+ user1.getPassword() );
		BasicDBObject doc = new BasicDBObject("fname", user1.getFname()).
       append("lname", user1.getLname()).
       append("email", user1.getEmail()).
       append("salary", user1.getSalary()).
       append("address", user1.getAddress()).
       append("password", user1.getPassword());
     users.insert(doc);
     return Response.status(201).entity(db.getName()).build();
	}
	
	@PUT
    @Path("/update")  
	@Consumes(MediaType.APPLICATION_JSON) 
	@Produces("text/plain")  
    public Response update(String user){
		MongoConnection mc = new MongoConnection();
		DB db = mc.createConnnect();
		DBCollection users = db.getCollection("userdatabase");
		System.out.println(user);
		Gson gson = new Gson();
		UserBean user1 = gson.fromJson(user,UserBean.class);
		System.out.println(user1.getFname() + " " + user1.getEmail() +" "+ user1.getPassword() );
		BasicDBObject newDocument = new BasicDBObject();  
		newDocument.put("fname", user1.getFname());  
		newDocument.put("lname", user1.getLname());
		newDocument.put("email", user1.getEmail());
		newDocument.put("salary", user1.getSalary());
		newDocument.put("address", user1.getAddress());
		newDocument.put("password", user1.getPassword());  
		   
		users.update(new BasicDBObject().append("email", user1.getEmail()), newDocument); 
		return Response.status(201).entity(db.getName()).build();
	}
	
	 @DELETE
	   @Path("/delete/{email}")
	   @Produces("text/plain")
	   public String deleteUser(@PathParam("email") String email){
		 	MongoConnection mc = new MongoConnection();
		 	System.out.println(email);
			DB db = mc.createConnnect();
			DBCollection users = db.getCollection("userdatabase");
			BasicDBObject newDocument = new BasicDBObject();  
			newDocument.put("email", email);  
			users.remove(newDocument);
			System.out.println("deleted");
			return "Deleted";
	   }
}
