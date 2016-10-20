import static org.junit.Assert.assertEquals;

import org.junit.Test;

public class CalculateTest {
    String address="University of Missouri Kansas City";
	Calculate calculation = new Calculate();
	String lat=calculation.convertLat(address);
	String lng=calculation.convertLng(address);
	String latitude="38.7133754";
	String longitude="-90.2191904";

	@Test
	public void testlatlng() {
		System.out.println("Converting Address to Latitude & Longitude");
		System.out.println("------------------------------------------");
		System.out.println("Address:"+address);
		System.out.println("------------------------------------------");
		System.out.println("Latitude: " + lat + " = " + latitude);
		assertEquals(lat, latitude);
		System.out.println("Longitude: " + lng + " = " + longitude);
		assertEquals(lng, longitude);	
	}

}