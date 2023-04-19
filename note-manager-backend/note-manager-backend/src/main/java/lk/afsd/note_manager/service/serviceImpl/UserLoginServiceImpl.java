package lk.afsd.note_manager.service.serviceImpl;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.entity.User;
import lk.afsd.note_manager.repo.UserRepo;
import lk.afsd.note_manager.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.context.annotation.ComponentScan;

import org.springframework.stereotype.Service;


@Service
@ComponentScan
public class UserLoginServiceImpl implements UserLoginService {
    @Autowired
    public UserRepo userRepo;


    @Override
    public int addUser(UserDTO userDTO) {

        User user = new User(userDTO.getUserId(), userDTO.getUserName(), userDTO.getEmail(),
                userDTO.getPassword());

        try {
            userRepo.save(user);
        } catch (Exception e) {
            e.printStackTrace();
        }


        return user.getUserId();
    }


    @Override
    public User getUserByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    @Override
    public boolean checkPassword(User user, String password) {
        return user.getPassword().equals(password);
    }

}
