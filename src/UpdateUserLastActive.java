import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import org.junit.Test;

public class GetLocationStatus {

	@Test
	public void test() throws IOException {

		URL myURL = new URL("http://54.69.18.19/updateUserLastActive?userId=1");
		BufferedReader in = new BufferedReader(new InputStreamReader(myURL.openStream()));

		String inputLine = in.readLine();
		in.close();
		assertEquals("Not yet implemented", inputLine, "{\"success\":true,\"user_id\":\"1\"}");

	}
}
