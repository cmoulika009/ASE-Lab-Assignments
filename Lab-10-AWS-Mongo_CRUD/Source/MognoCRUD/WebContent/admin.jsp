<%@page import="com.bean.UserBean"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML>
<html ng-app="SocialLoginDemo" ng-controller="SocialLoginController">
<head>
<title>User Details Management</title>
<link href="css/style.css" rel="stylesheet" type="text/css" media="all" />
<link href='http://fonts.googleapis.com/css?family=Rokkitt'
	rel='stylesheet' type='text/css'>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1">
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

table { 
color: #333;
font-family: Cambria;
font-size:20px;
width: 100%; 
border-collapse: collapse; 
border-spacing: 0; 
border-radius: 100px;
}

td, th { 
border: 1px solid #000000; /* No more visible border */
height: 30px; 
transition: all 0.3s;  /* Simple transition for hover effect */
}

th {
padding:5px;
background: #F0E68C;
font-weight: bold;
}

td {
padding:5px;
background: #FAFAFA;
text-align: center;
}
</style>
</head>
<body>
	<%
		List<UserBean> userList = (List<UserBean>) request.getAttribute("userList");
	%>
	<br/><br/>
  <h1 style="margin-bottom: 10px; text-align: center; font-family:calibri;font-size:50px;color:white;font-style:italic;">Welcome Admin - Below are List of All Employees</h1>
	<div class="wrap" style="width: 90%;">
		<br/>
		<h2 style="font-family:Cambria;font-size:24px;font-stype:italic" align="right"><a href="signup.jsp" style="color:white"><u>Click here to add new employee!!!!</u></a></h2>
					<br/><br/>
					<TABLE BORDER=5 CELLPADDING=4> <TR>
						<th><i>First Name</i></th>
						<th><i>Last Name</i></th>
						<th><i>Email</i></th>
						<th><i>Salary</i></th>
						<th><i>Address</i></th>
						<th><i>Password</i></th>
						<th><i>User Manipulation</i></th>
						</TR>
						<c:forEach items="${userList}" var="user">

							<tr>
								<td><c:out value="${user.fname}" /></td>
								<td><c:out value="${user.lname}" /></td>
								<td><c:out value="${user.email}" /></td>
								<td><c:out value="${user.salary}" /></td>
								<td><c:out value="${user.address}" /></td>
								<td><c:out value="${user.password}" /></td>
							<c:url var="del" value="delete.do">
								<c:param name="email" value="${user.email}"></c:param>
							</c:url>
							<c:url var="update" value="update.do">
								<c:param name="email" value="${user.email}"></c:param>
							</c:url>
							
								<td><a href="${update}">Update/</a><a href="${del}">Delete</a></td>
							</tr>
						</c:forEach>
					</table>
					<br/><br/>
					<div class="clear"></div>
			
			<div class="clear"></div>
		</div>
	</div>
	<!-- end-contact-form -->
	<div class="footer"></div>
	</div>

	<script type="text/javascript"
		src="http://code.angularjs.org/1.1.1/angular.js"></script>
	<script type="text/javascript"
		src="http://code.angularjs.org/1.1.1/angular-resource.js"></script>
	<script type="text/javascript"
		src="http://code.angularjs.org/1.1.1/angular-sanitize.js"></script>
	<script type="text/javascript" src="js/services.js"></script>
	<script src="js/index.js"></script>
	<script src="js/googleOauth.js"></script>
	<script src="js/angularOauth.js"></script>

</body>

</html>