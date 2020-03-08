package com.esliceu.blogger.repository;

import com.esliceu.blogger.entity.Post;
import com.esliceu.blogger.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository<Post, Long> {

    List<Post> findAll();

    List<Post> findByUser(User user);

    Post findByIdPost(long idPost);


}
