import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import org.codehaus.jackson.map.ObjectMapper;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;

@Path("/AddressConverter")
public class AddressConverter {

 private static final String URL = "http://maps.googleapis.com/maps/api/geocode/json";

 public GoogleResponse convertToLatLong(String fullAddress) throws IOException {

  URL url = new URL(URL + "?address="
    + URLEncoder.encode(fullAddress, "UTF-8") + "&sensor=false");
  // Open the Connection
  URLConnection conn = url.openConnection();

  InputStream in = conn.getInputStream() ;
  ObjectMapper mapper = new ObjectMapper();
  GoogleResponse response = (GoogleResponse)mapper.readValue(in,GoogleResponse.class);
  in.close();
  return response;
 }
 
 
 @Path("{address}")
 @GET
 @Produces("application/json")
 public Response convertAddresstoLatLng(@PathParam("address") String address) throws JSONException,IOException {
	 String result = null;
  JSONObject jsonObject = new JSONObject();
  //String address="Trunk Road,Nellore,524001,Andhra Pradesh";
  GoogleResponse res = new AddressConverter().convertToLatLong(address);
   for(Result res1 : res.getResults())
   {
	jsonObject.put("address",address); 
    jsonObject.put("latitude",res1.getGeometry().getLocation().getLat()); 
	jsonObject.put("longitude", res1.getGeometry().getLocation().getLng());
	jsonObject.put("location", res1.getGeometry().getLocation_type());
	result = "" + jsonObject;
   }
  return Response.status(200).entity(result).build();
  }
  }
