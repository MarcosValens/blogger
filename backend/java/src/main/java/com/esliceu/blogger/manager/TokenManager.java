package com.esliceu.blogger.manager;

import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Service;

@Service
public class TokenManager {
    private Claims getClaims(String token) {
        return null;
    }

    public Claims validateToken(String token) {
        return getClaims(token);
    }
}
