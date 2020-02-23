package com.esliceu.blogger.manager;

import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostManager {

    @Autowired
    PostRepository postRepository;

    public List<Post> getAll(){
        return postRepository.findAll();
    }

    public Post getPostById(long id){
        return postRepository.findByIdPost(id);
    }

    public void saveOrUpdatePost(Post post){
        postRepository.save(post);
    }

    public void deletePost(Post post){
        postRepository.delete(post);
    }
}
