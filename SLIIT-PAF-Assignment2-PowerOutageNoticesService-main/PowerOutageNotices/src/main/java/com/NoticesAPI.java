package com;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/NoticesAPI")
public class NoticesAPI extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	OutageNotice noticeObj = new OutageNotice();
	
    public NoticesAPI() {
        super();

    }


	protected void doPost(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException 
	{

		String output = noticeObj.insertNotice(request.getParameter("regionID"),
		request.getParameter("group"),
		request.getParameter("Description"),
		request.getParameter("outageStartTime"),
		request.getParameter("outageEndTime"),
		request.getParameter("informerID"));
		response.getWriter().write(output);
	}
	
	// Convert request parameters to a Map
		private static Map getParasMap(HttpServletRequest request)
		{
			Map<String, String> map = new HashMap<String, String>();
			try
			{
				Scanner scanner = new Scanner(request.getInputStream(), "UTF-8");
				String queryString = scanner.hasNext() ?
						scanner.useDelimiter("\\A").next() : "";
				scanner.close();
				String[] params = queryString.split("&");
				for (String param : params)
				{
					String[] p = param.split("=");
					map.put(p[0], p[1]);
				}
			 }
				catch (Exception e)
			 	{
			 	}
			return map; 

		 }

	protected void doPut(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException 
	{
		Map paras = getParasMap(request);
		String output = noticeObj.updateNotice(paras.get("hidItemIDSave").toString(),
			 paras.get("regionID").toString(),
		     paras.get("group").toString(),
			 paras.get("Description").toString(),
			 paras.get("outageStartTime").toString(),
			 paras.get("outageEndTime").toString(),
			 paras.get("informerID").toString());
			 response.getWriter().write(output);
	}


	protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
			throws ServletException, IOException 
	{
		Map paras = getParasMap(request);
		String output = noticeObj.deleteNotice(paras.get("noticeID").toString());
		response.getWriter().write(output);
	}

}
