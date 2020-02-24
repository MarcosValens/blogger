package com.esliceu.blogger.repository;

import com.esliceu.blogger.entity.Post;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PostRepository extends CrudRepository <Post,Long>{

    List<Post> findAll();

    Post findByTitleContains(String title);

    Post findByIdPost(long idPost);


}
