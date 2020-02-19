package com.esliceu.blogger.manager;

import com.esliceu.blogger.entity.User;
import com.esliceu.blogger.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserManager {

    @Autowired
    UserRepository userRepository;

    public boolean validate(String user, String password){
        return (userRepository.findByEmailAndPassword(user,password)!= null);
    }

    public User findByUserName(String userName){
        return userRepository.findByUsername(userName);
    }
}
