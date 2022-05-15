$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
		// Clear alerts---------------------
 		$("#alertSuccess").text("");
 		$("#alertSuccess").hide();
 		$("#alertError").text("");
 		$("#alertError").hide();
		// Form validation-------------------
		var status = validateNoticeForm();
		if (status != true)
 		{
 				$("#alertError").text(status);
 				$("#alertError").show();
 				return;
 		}
		// If valid------------------------
		var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
 	$.ajax(
 	{
 		url : "NoticesAPI",
 		type : type,
 		data : $("#formItem").serialize(),
 		dataType : "text",
 		complete : function(response, status)
 	{
 		onNoticeSaveComplete(response.responseText, status);
 	}
 });
});

// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
		$("#hidItemIDSave").val($(this).data("noticeid"));
 		$("#regionID").val($(this).closest("tr").find('td:eq(0)').text());
 		$("#group").val($(this).closest("tr").find('td:eq(1)').text());
 		$("#Description").val($(this).closest("tr").find('td:eq(2)').text());
 		$("#outageStartTime").val($(this).closest("tr").find('td:eq(3)').text());
 		$("#outageEndTime").val($(this).closest("tr").find('td:eq(4)').text());
 		$("#informerID").val($(this).closest("tr").find('td:eq(5)').text());
});

function onNoticeDeleteComplete(response, status)
{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 		{
 			$("#alertSuccess").text("Successfully deleted.");
 			$("#alertSuccess").show();
 			$("#divItemsGrid").html(resultSet.data);
 		} else if (resultSet.status.trim() == "error")
 		{
 			$("#alertError").text(resultSet.data);
 			$("#alertError").show();
 		}
 		} else if (status == "error")
 		{
 			$("#alertError").text("Error while deleting.");
 			$("#alertError").show();
 		} else
 		{
 			$("#alertError").text("Unknown error while deleting..");
 			$("#alertError").show();
 		}
}

$(document).on("click", ".btnRemove", function(event)
{
 		$.ajax(
 		{
 			url : "NoticesAPI",
 			type : "DELETE",
 			data : "noticeID=" + $(this).data("noticeid"),
 			dataType : "text",
 			complete : function(response, status)
 		{
 			onNoticeDeleteComplete(response.responseText, status);
 	}
 });
});

// CLIENT-MODEL================================================================
function validateNoticeForm() {
	// regionID
	if ($("#regionID").val().trim() == "") {
		return "Insert Region ID.";
	}
	// group
	if ($("#group").val().trim() == "") {
		return "Insert Group ID.";
	}
	// description-------------------------------
	if ($("#Description").val().trim() == "") {
		return "Insert Description.";
	}
	
	// start time------------------------
	if ($("#outageStartTime").val().trim() == "") {
		return "Insert Outage Start Time.";
	}
	
	// end time------------------------
	if ($("#outageEndTime").val().trim() == "") {
		return "Insert Outage End Time.";
	}
	
	// informerID------------------------
	if ($("#informerID").val().trim() == "") {
		return "Insert Informer ID.";
	}
	return true;
}

function onNoticeSaveComplete(response, status)
{
		if (status == "success")
 		{
 			var resultSet = JSON.parse(response);
 			if (resultSet.status.trim() == "success")
 			{
 				$("#alertSuccess").text("Successfully saved.");
 				$("#alertSuccess").show();
 				$("#divItemsGrid").html(resultSet.data);
 			} else if (resultSet.status.trim() == "error")
 			{
 				$("#alertError").text(resultSet.data);
 				$("#alertError").show();
	 		}
 			} else if (status == "error")
 			{
 				$("#alertError").text("Error while saving.");
 				$("#alertError").show();
 			} else
 			{
 				$("#alertError").text("Unknown error while saving..");
 				$("#alertError").show();
 			} 
 				$("#hidItemIDSave").val("");
				 $("#formItem")[0].reset();
}