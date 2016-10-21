<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE HTML>
<html ng-app="SocialLoginDemo" ng-controller="SocialLoginController">
<head >
<title>Registration Page</title>
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


<div class="wrap" style="width:30%;">
<!-- strat-contact-form -->	
<div class="contact-form" style="width:100%;">
<!-- start-form -->
	<form class="contact_form" action="register.do"  style="background: #FFF; width:100%;" method="post" name="contact_form">
		<h1>Fill Details to add New Users</h1>
	    <ul>
	    	<li style="width:100%;">
	            <input type="text" class="textbox1" name="fname" placeholder="First Name" required />
	            <span class="form_hint">Enter a First Name</span>
	             <p><img src="images/contact.png" alt=""></p>
	        </li>
	        <li style="width:100%;">
	            <input type="text" class="textbox1" name="lname" placeholder="Last Name" required />
	            <span class="form_hint">Enter a Last Name</span>
	             <p><img src="images/contact.png" alt=""></p>
	        </li>
	        <li style="width:100%;">
	            <input type="email" class="textbox1" name="email" placeholder="example@mail.com" required />
	            <span class="form_hint">Enter a valid email</span>
	             <p><img src="images/contact.png" alt=""></p>
	        </li>
	        <li style="width:100%;">
	            <input type="password" name="password" class="textbox2" placeholder="password">
	            <p><img src="images/lock.png" alt=""></p>
	        </li>
	        <li style="width:100%;">
	            <input type="password" name="website" class="textbox2" placeholder="confirm password">
	            <p><img src="images/lock.png" alt=""></p>
	        </li>
         </ul>
       	 	<input type="submit" name="Sign In" style="width:100%;background:red" value="Add New User"/>
			<div class="clear"></div>	
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