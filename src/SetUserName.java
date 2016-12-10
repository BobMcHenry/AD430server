/**
 * Created by austin on 12/10/16.
 */

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import org.junit.Test;

public class SetUserName {
    @Test
    public void test() throws IOException {

        URL myURL = new URL("http://localhost:8081/setUserName?userId=4&fullName=Test%20User");
        BufferedReader in = new BufferedReader(new InputStreamReader(myURL.openStream()));

        String inputLine = in.readLine();
        in.close();
        assertEquals("Record ID 4 not present", inputLine, "{\"success\":true,\"full_name\":\"Test User\"}");

    }
}
