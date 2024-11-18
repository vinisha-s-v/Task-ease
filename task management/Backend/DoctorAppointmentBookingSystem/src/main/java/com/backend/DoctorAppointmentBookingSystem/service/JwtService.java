package com.backend.DoctorAppointmentBookingSystem.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.jar.JarException;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private  static  String SCERET_KEY="C22134503B503CE38256C0B1919ACEABACADCE3F6169C11D228894BCF0B2BF72";
    public String generateToken(Authentication authentication) {

        Map<String,Object> claims = new HashMap<>();

        Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
        System.out.println(authorities);

        claims.put("roles",authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));


        System.out.println(claims);


        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(authentication.getName())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24 * 60 * 60 * 1000)) // 24 hours

                .and()
                .signWith(getKey())
                .compact();

    }
    private SecretKey getKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SCERET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);

    }


    public String extractUserName(String token) {
        try {
            return  extractClaims(token,Claims::getSubject);
        } catch (JwtException e){
            throw  new RuntimeException(e.getMessage());
        }
    }

    private <T> T extractClaims(String token, Function<Claims,T> claimsResolver) {
        final  Claims claims=extractAllClaims(token);
        return  claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return  Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
    public  boolean validateToken(String token,UserDetails userDetails){
        final  String userName = extractUserName(token);
        return (userName.equals(userDetails.getUsername())&& !isTokenExpired(token));
    }


    private boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());

    }

    private Date extractExpiration(String token) {
        return extractClaims(token,Claims::getExpiration);
    }


}
