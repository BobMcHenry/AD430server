/**
 * Created by austin on 12/10/16.
 * Test case for testing the getUser method of the API
 */

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import org.junit.Test;

public class GetUser {
    @Test
    public void test() throws IOException {

        URL myURL = new URL("http://localhost:8081/getUser?userId=5");
        BufferedReader in = new BufferedReader(new InputStreamReader(myURL.openStream()));

        String inputLine = in.readLine();
        in.close();
        assertEquals("Record ID 5 not available or in improper form", inputLine, "[{\"user_id\":5,\"skype_username\":\"skypeUN05\",\"full_name\":\"Maria Alburta\",\"email\":\"fakeemail05@gmail.com\",\"last_active_time\":null,\"is_interpreter\":0,\"ok_to_chat\":1,\"ok_to_show_location\":0,\"last_known_location_lat\":47.2528,\"last_known_location_long\":-122.4442,\"last_location_update\":null,\"hashed_password\":\"LNBrovtzqtePOC1nnj919bc3e7fe7558b830c5c910ca93c0b77a161f940b\"}]");

    }
}
