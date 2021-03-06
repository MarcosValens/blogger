package com.esliceu.blogger.repository;

import com.esliceu.blogger.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmailOrUsername(String userName, String user);
}
