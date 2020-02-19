package com.esliceu.blogger.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;

@Controller
@Transactional
public class LoginController {

    // TODO: Add managers

    // This should return a token
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        return null;
    }
}
