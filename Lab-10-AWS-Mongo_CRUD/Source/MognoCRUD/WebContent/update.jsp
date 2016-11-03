<%@page import="com.bean.UserBean"%>
<%@page import="javax.jws.soap.SOAPBinding.Use"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html ng-app="SocialLoginDemo" ng-controller="SocialLoginController">
<head >
<title>User Details Management</title>
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href='http://fonts.googleapis.com/css?family=Rokkitt' rel='stylesheet' type='text/css'>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<style type="text/css">
		.site-bg {
			position: fixed;
			height: 100%;
			width: 100%;
			z-index: 0;
			background-image: url(/images/bg.jpg);
			background-size: cover;
			background-repeat: no-repeat;
			background-attachment: fixed;
		}

		.site-bg-overlay {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			z-index: 1;
			background: rgba(92, 180, 142, 0.4);
		}

	</style>
</head>
<body>
<%
		UserBean user = (UserBean) request.getAttribute("user");
	%>

<div class="wrap" style="width:35%;">
<!-- strat-contact-form -->	
<div class="contact-form" style="width:100%;">
<!-- start-form -->
	<form class="contact_form" action="updateDetail.do"  style="background: #FFF; width:100%;" method="post" name="contact_form">
		<h1 align="center" style="font-family:calibri;font-style:italic;font-size:40px;">Update Employee Details</h1>
	    <ul>
	    	<li style="width:100%;">
	            <input type="text" class="textbox1" name="fname" placeholder="First Name" value="${user.fname}" style="color:black" required />
	        </li>
	        <li style="width:100%;">
	            <input type="text" class="textbox1" name="lname" placeholder="Last Name"  value="${user.lname}" style="color:black" required />
	             </li>
	        <li style="width:100%;"> 
	            <input type="email" class="textbox1" name="email" placeholder="Email Id" value="${user.email}" style="color:black" readonly="readonly" />
	         </li>
	        <li style="width:100%;">
	            <input type="text" name="salary" class="textbox1" placeholder="Salary" value="${user.salary}" style="color:black">
	        </li>
	        <li style="width:100%;">
	            <input type="text" name="address" class="textbox1" placeholder="Address" value="${user.address}" style="color:black">
	        </li>
	        <li style="width:100%;">
	            <input type="password" name="password" class="textbox2" placeholder="password" value="${user.password}" style="color:black">
	        </li>
	        <li style="width:100%;">
	            
	            <input type="password" name="website" id="website" class="textbox2" placeholder="confirm password" value="${user.password}" style="color:black">
	        </li>
         </ul>
       	 	<input type="submit" name="Sign In" style="width:100%;" value="Update Details"/>
			<div class="clear"></div>	
			
		<div class="forgot">
			
		</div>	
		<div class="clear"></div>	
	</form>
<!-- end-form -->
<!-- start-account -->
<div class="clear"></div>	
</div>
<!-- end-contact-form -->
<div class="footer">
	
</div>
</div>

<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular.js"></script>
<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular-resource.js"></script>
<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular-sanitize.js"></script>
<script type="text/javascript" src="js/services.js"></script>
<script src="js/index.js"></script>
<script src="js/googleOauth.js"></script>
<script src="js/angularOauth.js"></script>
</body>
</html>