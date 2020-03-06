package com.esliceu.blogger.interceptors;

import com.esliceu.blogger.manager.TokenManager;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Autowired
    private TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            String auth = request.getHeader("Authorization");

            if (auth == null || auth.isEmpty()) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                return false;
            }

            String token = auth.replace("Bearer ", "");
            Boolean valid =  tokenManager.validateToken(token);
            if (!valid){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }
            response.setStatus(HttpServletResponse.SC_OK);
            return true;
        } catch (JwtException e){
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.sendError(HttpServletResponse.SC_FORBIDDEN,e.getMessage());
        }
        return false;
    }
}
