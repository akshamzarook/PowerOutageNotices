<%@page import="com.OutageNotice"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="ISO-8859-1">
	<title>Notices Management</title>
	<link rel="stylesheet" href="Views/bootstrap.min.css">
	<script src="Components/jquery-3.6.0.min.js"></script>
	<script src="Components/notices.js"></script>
	
	
</head>
<body>
	
	<div class="container">
			<br>
				<h1>Power Outage Notices</h1><hr>
			
				
				<form id="formItem" name="formItem">
 					Region ID:
 					<input id="regionID" name="regionID" type="text" class="form-control form-control-sm">
 					<br> 
 					Group:
 					<input id="group" name="group" type="text" class="form-control form-control-sm">
 					<br>
 					Description/Date:
 					<input id="Description" name="Description" type="text" class="form-control form-control-sm"></input>
 					<br> 
 					Outage Starts at:
 					<input id="outageStartTime" name="outageStartTime" type="text" class="form-control form-control-sm">
 					<br>
 					Outage Ends at:
 					<input id="outageEndTime" name="outageEndTime" type="text" class="form-control form-control-sm">
 					<br> 
 					Informer ID:
 					<input id="informerID" name="informerID" type="text" class="form-control form-control-sm">
 					<br>
 	
 					<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">
 					<input type="hidden" id="hidItemIDSave"name="hidItemIDSave" value="">
				</form>
					<div id="alertSuccess" class="alert alert-success"></div>
					<div id="alertError" class="alert alert-danger"></div>				
					<div id="divItemsGrid">
 						<%
 							OutageNotice noticeObj = new OutageNotice();
 							out.print(noticeObj.readNotices());
 						%>
					</div>				
	</div>
</body>
</html>