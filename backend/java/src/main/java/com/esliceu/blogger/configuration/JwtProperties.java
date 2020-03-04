package com.esliceu.blogger.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtProperties {
    @Value("${jwt.secret}")
    private String jwtKey;

    public String getJwtKey() {
        return jwtKey;
    }
}
