<!DOCTYPE html>
<html ng-app="homeModule">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Rectangle Mobile Template</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!--
    Rectangle Template
    http://www.templatemo.com/preview/templatemo_439_rectangle
    -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/font-awesome.css">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/templatemo-style.css">
    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <style type='text/css'>
        .partition1 {
            width: 20%;
            float: left;
            margin-right: 10px;
        }

        .partition2 {
            width: 70%;
            float: right;
        }

        .partition-wrap {
            overflow: hidden;
            margin-bottom: 20px;
        }

        td{
            margin: 5px;
        }

    </style>
</head>

<body ng-controller="homeController">
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->

<div class="site-bg"></div>
<!--
<div class="site-bg-overlay"></div>
-->

<!-- TOP HEADER -->
<div class="top-header">
    <div class="container">
        <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
                <p class="phone-info">Call us: <a href="#">010 020 0340</a></p>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="social-icons">
                    <ul>
                        <li><a href="#" class="fa fa-facebook"></a></li>
                        <li><a href="#" class="fa fa-twitter"></a></li>
                        <li><a href="#" ng-click="logout()" class="fa fa-sign-out"></a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div> <!-- .top-header -->


<div class="visible-xs visible-sm responsive-menu">
    <a href="#" class="toggle-menu">
        <i class="fa fa-bars"></i> Show Menu
    </a>
    <div class="show-menu">
        <ul class="main-menu">
            <li>
                <a class="show-1 active homebutton" href="#"><i class="fa fa-home"></i>Home</a>
            </li>
            <li>
                <a class="show-2 aboutbutton" href="#"><i class="fa fa-search"></i>Search Recipe</a>
            </li>
            <li>
                <a class="show-5 contactbutton" href="#"><i class="fa fa-envelope"></i>Contact</a>
            </li>
        </ul>
    </div>
</div>

<div class="container" id="page-content">
    <div class="row">


        <div class="col-md-9 col-sm-12 content-holder">
            <!-- CONTENT -->
            <div id="menu-container">


                <div id="menu-1" class="homepage home-section text-center">
                    <div class="welcome-text">
                        <h2>Hello, Welcome to <strong>Find Your Recipe</strong></h2>
                        <p>FInd Your Recipe is  <span class="orange">Mashup Web Application</span> which is build using <span class="orange">Foursquare & Edamam's Recipe Search API
                        </span>. This application find Recipe and Place to find that Food.</p>
                        <br/>
                        <p>This web application also help to find <span class="orange">Rating & Review</span> of food places.</p>
                        <form action="#" method="get" class="subscribe-form">
                            <div class="row">
                                <fieldset class="col-md-offset-2 col-md-6">
                                    <input name="subscribe-email" type="email" class="email" id="subscribe-email"
                                           placeholder="Write your email here..">
                                </fieldset>
                                <fieldset class="col-md-4 button-holder">
                                    <input name="submit" type="submit" class="button default" id="submit"
                                           value="Submit">
                                </fieldset>
                            </div>
                            <p class="subscribe-text">Please subscribe your email for latest updates!</p>
                        </form>
                    </div>
                </div>

                <div id="menu-2" class="content about-section">
                    <div class="row">
                        <div class="col-md-8 col-sm-8" style="width: 100%;">
                            <div class="box-content profile">
                                <h3 class="widget-title">Search Recipe</h3>
                                <form class="contact-form">
                                    <fieldset>
                                        <input type="text" style="width: 44%;" class="name" id="place"
                                               ng-model="place" placeholder="Enter Area to Find Food...">
                                        <input type="text" style="width: 44%;" class="name" id="recipe"
                                               ng-model="recipe" placeholder="Enter Food Name...">
                                        <input type="button" class="button" style="padding:9px 18px;" id="button"
                                               ng-click="findRecipe();getVenues()" value="Find">
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-5 col-sm-5">
                            <div class="box-content">
                                <h3 class="widget-title" style="font-weight: 600; ">How To Make</h3>

                                <div class="project-item" >
                                    <li ng-repeat="r in recipelist">
                                        <h4 class="widget-title">{{r.name}}</h4>
                                        <div class="partition-wrap">
                                            <div class="partition1">
                                        <img ng-src="{{r.icon}}" style="width: 50px; height: 50px;" align="center"/>
                                            </div>
                                            <div class="partition2">
                                                <a href="{{r.url}}"> {{r.url}}</a></div>
                                        </div>
                                    </li>


                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 col-sm-7">
                            <div class="box-content">
                                <h3 class="widget-title" style="font-weight: 600">Where To Get</h3>
                                <div style="margin-bottom: 20px;">
                                    <li ng-repeat="venue in venueList" style="margin-bottom: 10px;">
                                        <a  href="" ng-click="getReviews(venue)">{{venue.name}}</a>
                                    </li>
                                </div>
                                <div id="div_ReviewList" style="display:none;"  >


                                    <p ng-model="ReviewWithSentiment">
                                    <h3 class="widget-title" style="font-weight: 600">Review of {{venueName}}</h3>
                                    <TABLE BORDER=2 CELLPADDING=4> <TR>
                                        <TR> <TD style="font-weight: 600">Most recent review</TD> <TD>{{ReviewWithSentiment.reviewText}}</TD> </TR>
                                        <TR> <TD style="font-weight: 600">Public Approval</TD> <TD>{{ReviewWithSentiment.sentiment}}</TD> </TR>
                                        <TR> <TD style="font-weight: 600">Rating</TD> <TD>{{ReviewWithSentiment.score}}</TD> </TR>
                                        <TR> <TH style="color: burlywood" COLSPAN=2><h4 class="widget-title" style=" font-size: 20px; font-weight:500; margin-top: 15px; text-align: center; text-transform: uppercase;"> {{ReviewWithSentiment.reviewText}} </h4></TH> </TR>
                                    </TABLE>
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="menu-4" class="content contact-section">
                    <div class="row">
                        <div class="col-md-8 col-sm-8" style="width: 100%">
                            <div class="box-content">
                                <h3 class="widget-title">Send Us A Message</h3>
                                <form class="contact-form">
                                    <fieldset>
                                        <input type="text" class="name" id="name" placeholder="Name...">
                                    </fieldset>
                                    <fieldset>
                                        <input type="email" class="email" id="email" placeholder="Email...">
                                    </fieldset>
                                    <fieldset>
                                        <input type="text" class="subject" id="subject" placeholder="Subject...">
                                    </fieldset>
                                    <fieldset>
                                        <textarea name="message" id="message" cols="30" rows="4"
                                                  placeholder="Message.."></textarea>
                                    </fieldset>
                                    <fieldset>
                                        <input type="submit" class="button" id="button" value="Send Message">
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


        <div class="col-md-3 hidden-sm">

            <nav id="nav" class="main-navigation hidden-xs hidden-sm">
                <ul class="main-menu">
                    <li>
                        <a class="show-1 active homebutton" href="#"><i class="fa fa-home"></i>Home</a>
                    </li>
                    <li>
                        <a class="show-2 aboutbutton" href="#"><i class="fa fa-search"></i>Search Recipe</a>
                    </li>
                    <li>
                        <a class="show-5 contactbutton" href="#"><i class="fa fa-envelope"></i>Contact</a>
                    </li>
                </ul>
            </nav>

        </div>
    </div>
</div>

<!-- SITE-FOOTER -->
<div class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
            </div>
        </div>
    </div>
</div> <!-- .site-footer -->

<script src="js/vendor/jquery-1.10.2.min.js"></script>
<script src="js/plugins.js"></script>
<script src="js/main.js"></script>
<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular.js"></script>
<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular-resource.js"></script>
<script type="text/javascript" src="http://code.angularjs.org/1.1.1/angular-sanitize.js"></script>
<script src="js/home.js"></script>
<script type="text/javascript" src="js/services.js"></script>
<script src="js/googleOauth.js"></script>
<script src="js/angularOauth.js"></script>

<!-- templatemo 439 rectangle -->
</body>
</html>