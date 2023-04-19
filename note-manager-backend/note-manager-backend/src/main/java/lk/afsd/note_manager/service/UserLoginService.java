package lk.afsd.note_manager.service;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.entity.User;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


public interface UserLoginService {
    int addUser(UserDTO userDTO);

    User getUserByUsername(String username);

    boolean checkPassword(User user, String password);


}
