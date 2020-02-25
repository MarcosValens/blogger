package com.esliceu.blogger.controller;


import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.entity.User;
import com.esliceu.blogger.manager.PostManager;
import com.esliceu.blogger.manager.UserManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import javax.persistence.Column;
import javax.persistence.ForeignKey;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.parser.Parser;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
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
    public ResponseEntity<String> savePost(
            @RequestBody() String postJson) {
        Post post = new Post();
        JsonObject convertedObject = new Gson().fromJson(postJson, JsonObject.class);
        String userString = convertedObject.get("user").getAsString();
        /*if(post.getIdPost() != 0){
            post = postManager.getPostById(post.getIdPost());
            post.setUpdated(LocalDateTime.now());
        } else {

        }*/
        User user  = userManager.findByEmailOrUsername(userString, userString);
        if (user == null) {
            return new ResponseEntity<>("User doesn't exist", HttpStatus.UNAUTHORIZED);
        }
        post.setUser(user);
        post.setTitle(convertedObject.get("title").getAsString());
        post.setContent(convertedObject.get("content").getAsString());
        post.setOriginalLanguage(convertedObject.get("originalLanguage").getAsString());
        post.setTranslatedLanguage(convertedObject.get("translatedLanguage").getAsString());
        post.setTranslatedContent(convertedObject.get("translatedContent").getAsString());
        post.setTranslatedTitle(convertedObject.get("translatedTitle").getAsString());
        post.setPublished(LocalDateTime.now());
        postManager.saveOrUpdatePost(post);
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/update/{idPost}")
    public Post updatePost(@PathVariable(value = "idPost") String idPost) {
        return postManager.getPostById(Long.parseLong(idPost));
    }

    @PostMapping("/deletePost")
    public void deletePost(@RequestParam("idPost") String idPost) {
        Post post = postManager.getPostById(Long.parseLong(idPost));
        postManager.deletePost(post);
    }

    @GetMapping("/posts/(userEmail}")
    public List<Post> getUserPosts(@PathVariable(value = "userEmail") String userEmail) {
        User user = userManager.findByEmailOrUsername(userEmail, userEmail);
        return user.getPosts();
    }
}