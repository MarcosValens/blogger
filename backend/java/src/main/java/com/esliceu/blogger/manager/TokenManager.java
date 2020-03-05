package com.esliceu.blogger.manager;

import com.esliceu.blogger.configuration.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class TokenManager {

    @Autowired
    private JwtProperties jwtProperties;

    public Claims getClaims(String token) {
        try{
            return Jwts.parser().setSigningKey(jwtProperties.getJwtKey()).parseClaimsJws(token).getBody();
        } catch (Exception e){
            return null;
        }
    }

    public Boolean validateToken(String token) {
        Claims claims = getClaims(token);
        if (claims == null) {
            return false;
        }
        Date expirationToken = claims.getExpiration();
        Date date = new Date();
        return date.before(expirationToken);
    }
}


