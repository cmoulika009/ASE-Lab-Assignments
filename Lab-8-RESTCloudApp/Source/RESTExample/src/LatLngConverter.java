import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/LatLngConverter")
public class LatLngConverter {

 private static final String URL = "http://maps.googleapis.com/maps/api/geocode/json";

 public GoogleResponse convertAddresstoLatLng(String lat,String lng) throws IOException {

  URL url = new URL(URL + "?latlng="
    + URLEncoder.encode(lat, "UTF-8")+"," +URLEncoder.encode(lng, "UTF-8")+"&sensor=false");
  // Open the Connection
  System.out.println(url);
  URLConnection conn = url.openConnection();

  InputStream in = conn.getInputStream() ;
  ObjectMapper mapper = new ObjectMapper();
  GoogleResponse response = (GoogleResponse)mapper.readValue(in,GoogleResponse.class);
  in.close();
  return response;
 }
 

 @Path("{lat}/{lng}")
 @GET
 @Produces("application/json")
 public Response convertAddresstoLatLng1(@PathParam("lat") String lat,@PathParam("lng") String lng) throws JSONException,IOException {
  //String lat="38.7133754";
  //String lng="-90.2191904";
	 String result = null;
	  JSONObject jsonObject = new JSONObject();
  GoogleResponse res = new LatLngConverter().convertAddresstoLatLng(lat,lng);
  
   for(Result res1 : res.getResults())
   {
	  // System.out.println("Address:"+address);
    System.out.println("Latitude of address is :"  +res1.getFormatted_address());
   // System.out.println("Longitude of address is :" + result.getGeometry().getLocation().getLng());
   // System.out.println("Location is " + result.getGeometry().getLocation_type());
    jsonObject.put("address",res1.getFormatted_address());
	result = "" + jsonObject;
   }
   return Response.status(200).entity(result).build();
  }
  
  }

