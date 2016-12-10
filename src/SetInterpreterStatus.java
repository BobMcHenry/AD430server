/**
 * Created by austin on 12/10/16.
 */

import static org.junit.Assert.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;

import org.junit.Test;

public class SetInterpreterStatus {
    @Test
    public void test() throws IOException {

        URL myURL = new URL("http://localhost:8081/setInterpreterStatus?userId=2&status=1");
        BufferedReader in = new BufferedReader(new InputStreamReader(myURL.openStream()));

        String inputLine = in.readLine();
        in.close();
        assertEquals("Record ID 2 not present", inputLine, "{\"success\":true,\"is_interpreter\":\"1\"}");

    }
}
