package com.esliceu.blogger.controller;

import com.esliceu.blogger.manager.PostManager;
import com.esliceu.blogger.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;

@Controller
@Transactional
public class LoginController {

    @Autowired
    private UserManager userManager;

    @Autowired
    private PostManager postManager;
    // This should return a token
    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        return null;
    }
}
