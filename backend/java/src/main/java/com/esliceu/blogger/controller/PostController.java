package com.esliceu.blogger.controller;


import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.entity.User;
import com.esliceu.blogger.manager.PostManager;
import com.esliceu.blogger.manager.TokenManager;
import com.esliceu.blogger.manager.UserManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    private PostManager postManager;

    @Autowired
    private UserManager userManager;

    @Autowired
    private TokenManager tokenManager;

    @GetMapping("/all")
    public List<Post> getAll() {
        return postManager.getAll();
    }

    @GetMapping("userPosts")
    public List<Post> getUserPosts(@RequestBody() String userJson) {
        JsonObject convertedObject = new Gson().fromJson(userJson, JsonObject.class);
        String userString = convertedObject.get("user").getAsString();
        User user = userManager.findByEmailOrUsername(userString, userString);
        return postManager.getUserPosts(user);
    }

    @PostMapping("/save")
    public ResponseEntity<String> savePost(
            @RequestBody() String postJson,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String email = tokenManager.getClaims(token).get("email", String.class);

        Post post = new Post();
        User user = userManager.findByEmailOrUsername(email, email);
        post.setUser(user);
        JsonObject convertedObject = new Gson().fromJson(postJson, JsonObject.class);

        post.setTitle(convertedObject.get("title").getAsString());
        post.setContent(convertedObject.get("content").getAsString());

        post.setTranslatedContent(convertedObject.get("translatedContent").getAsString());
        post.setTranslatedTitle(convertedObject.get("translatedTitle").getAsString());

        post.setOriginalLanguage(convertedObject.get("originalLanguage").getAsString());
        post.setTranslatedLanguage(convertedObject.get("translatedLanguage").getAsString());
        if (post.getIdPost() == null) {
            post.setPublished(LocalDateTime.now());
        }

        postManager.saveOrUpdatePost(post);

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/update/{idPost}")
    public Post updatePost(@PathVariable(value = "idPost") String idPost) {
        return postManager.getPostById(Long.parseLong(idPost));
    }

    @GetMapping("/deletePost/{idPost}")
    public void deletePost(@PathVariable("idPost") String idPost) {
        Post post = postManager.getPostById(Long.parseLong(idPost));
        postManager.deletePost(post);
    }
}