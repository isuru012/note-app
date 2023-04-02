package lk.afsd.note_manager.service.serviceImpl;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.entity.User;
import lk.afsd.note_manager.repo.UserRepo;
import lk.afsd.note_manager.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;


@Service
@ComponentScan
public class UserLoginServiceImpl implements UserLoginService {
    @Autowired
    public UserRepo userRepo;


    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();;

    @Override
    public int addUser(UserDTO userDTO) {

        User user = new User(userDTO.getUserId(), userDTO.getUserName(), userDTO.getEmail(),
                this.passwordEncoder.encode(userDTO.getPassword()));

try {
    userRepo.save(user);
}catch (Exception e){
    e.printStackTrace();
}


        return user.getUserId();
    }
}
