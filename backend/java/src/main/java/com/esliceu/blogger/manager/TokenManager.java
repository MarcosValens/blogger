package com.esliceu.blogger.manager;

import com.esliceu.blogger.configuration.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;

@Service
public class TokenManager {

    @Autowired
    private JwtProperties jwtProperties;

    public Claims getClaims(String token) {
        try {
            SignatureAlgorithm algorithm = SignatureAlgorithm.HS256;

            Key signingKey = new SecretKeySpec(jwtProperties.getJwtKey().getBytes(), algorithm.getJcaName());
            return Jwts.parser()
                    .setSigningKey(signingKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
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


