package com.backend.DoctorAppointmentBookingSystem;

import io.jsonwebtoken.Jwts;
import jakarta.xml.bind.DatatypeConverter;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;

import javax.crypto.SecretKey;

public class JwtSecretMakerTest {
    @Test
    public  void  generateSecretKey(){
    SecretKey key= Jwts.SIG.HS256.key().build();
    String encodedKey  = DatatypeConverter.printHexBinary(key.getEncoded());
    System.out.println(encodedKey);

    }
}
