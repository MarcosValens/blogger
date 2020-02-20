package com.esliceu.blogger.controller;


import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.manager.PostManager;
import com.esliceu.blogger.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostManager postManager;

    @Autowired
    private UserManager userManager;

    @GetMapping("/all")
    public List<Post> getAll() {
        return postManager.getAll();
    }

}
