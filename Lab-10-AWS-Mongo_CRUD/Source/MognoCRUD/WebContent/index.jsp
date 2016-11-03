<!--
Author: W3layouts
Author URL: http://w3layouts.com
License: Creative Commons Attribution 3.0 Unported
License URL: http://creativecommons.org/licenses/by/3.0/
-->
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
<br/><br/>
<h1 style="margin-bottom: 10px; text-align: center; font-family:calibri;font-size:50px;color:white;font-style:italic;">Welcome to Employee Storage System</h1>
<div class="wrap" style="width:30%;">	
<div class="contact-form" style="width:100%;">
	<form class="contact_form" action="login.do"  style="background: #FFF; width:100%;" method="post" name="contact_form">
		<h1 align="center" style="font-family:calibri;font-style:italic;font-size:40px;">Admin Login</h1>
		<h4 align="right">---To view user details</h4>
	    <ul>
	        <li style="width:100%;">
	            <input type="email" class="textbox1" name="email" placeholder="Email id" style="color:black" required />
	        </li>
	        <li style="width:100%;">
	            <input type="password" name="password" class="textbox2" placeholder="Password" style="color:black">
	        </li>
         </ul>
            <input type="submit" name="Sign In" value="Sign In" style="background: blue;width:440px;"/>
			<div class="clear"></div>	
			<div class="clear"></div>	
	</form>
<!-- end-form -->
<!-- start-account -->
<div class="clear"></div>	
</div>
<!-- end-form -->
<!-- start-account -->
<div class="account">
	<div id="fb-root"></div>
	<div ng-show="accessToken" style="display: none">
		<h1>You're authenticated!</h1>

		<h2>Access token</h2>
		<pre>{{accessToken}}</pre>

		<div ng-show="expiresIn">
			<h2>Expiry</h2>
			<p>Expires in {{expiresIn}} seconds.</p>
		</div>
	</div>
<!-- end-account -->
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