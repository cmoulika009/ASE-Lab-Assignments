import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import org.codehaus.jackson.map.ObjectMapper;


public class Calculate {

	public int sum(int var1, int var2) {
		System.out.println("Adding values: " + var1 + " + " + var2);
		return var1 + var2;
	}
	
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

	public String convertLat(String address){
		 //String result = null;
		 String latitude=null;
	  GoogleResponse res;
	try {
		res = new Calculate().convertToLatLong(address);
		for(Result res1 : res.getResults())
		   {
			latitude=res1.getGeometry().getLocation().getLat(); 
		   }

	} catch (IOException e) {
		e.printStackTrace();
	}
	  return latitude;
}
	public String convertLng(String address){
		 
		 String longitude=null;
	  GoogleResponse res;
	try {
		res = new Calculate().convertToLatLong(address);
		for(Result res1 : res.getResults())
		   {
			longitude=res1.getGeometry().getLocation().getLng();
		   }

	} catch (IOException e) {
		e.printStackTrace();
	}
	  return longitude;
}	
}