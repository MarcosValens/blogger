package com.esliceu.blogger.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.Properties;

@Configuration
@EnableWebMvc
@Order(Ordered.HIGHEST_PRECEDENCE)
public class CorsConfig implements WebMvcConfigurer {

    @Value("${url.development}")
    private String origin;

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry){
        System.out.println(origin);
        corsRegistry.addMapping("/**")
                .allowedOrigins(origin)
                .maxAge(System.currentTimeMillis() + (3600 * 1000))
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS");


    }
}
