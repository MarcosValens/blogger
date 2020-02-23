package com.esliceu.blogger.controller;


import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.entity.User;
import com.esliceu.blogger.manager.PostManager;
import com.esliceu.blogger.manager.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.persistence.Column;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @PostMapping("/save")
    public void savePost(
            @RequestParam(value = "idPost", required = false) String idPost,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("originalLenguage") String originalLanguage,
            @RequestParam("translatedLenguage") String translatedLenguage,
            @RequestParam("userMail") String userMail){
        Post post = new Post();
        if(idPost != null){
            post = postManager.getPostById(Long.parseLong(idPost));
            post.setUpdated(LocalDateTime.now());
        } else {
            User user = userManager.findByUserName(userMail);
            post.setUser(user);
        }
        post.setTitle(title);
        post.setContent(content);
        post.setOriginalLanguage(originalLanguage);
        post.setTranslatedLanguage(translatedLenguage);
        post.setPublished(LocalDateTime.now());
        postManager.saveOrUpdatePost(post);
    }

    @GetMapping("/update/{idPlanet}")
    public Post updatePost(@PathVariable(value = "idPlanet")String idPlanet){
        return postManager.getPostById(Long.parseLong(idPlanet));
    }

    @PostMapping("/deletePost")
    public void deletePost(@RequestParam("idPost") String idPost){
        Post post = postManager.getPostById(Long.parseLong(idPost));
        postManager.deletePost(post);
    }
}