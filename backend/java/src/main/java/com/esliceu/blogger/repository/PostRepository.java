package com.esliceu.blogger.repository;

import com.esliceu.blogger.entity.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository <Post,Long>{

    Post findByTitleContains(String title);
}
