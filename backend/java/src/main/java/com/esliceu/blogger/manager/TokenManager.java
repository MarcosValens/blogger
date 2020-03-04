package com.esliceu.blogger.manager;

import com.esliceu.blogger.configuration.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TokenManager {

    @Autowired
    JwtProperties jwtProperties;

    public Claims getClaims(String token) {
        return Jwts.parser().setSigningKey(jwtProperties.getJwtKey()).parseClaimsJws(token).getBody();
    }

    public Boolean validateToken(String token) {
        try {
            Claims claims = Jwts
                    .parser()
                    .setSigningKey(jwtProperties.getJwtKey())
                    .parseClaimsJws(token)
                    .getBody();
            return claims != null;
        } catch (Exception e) {
            return false;
        }
    }
}
