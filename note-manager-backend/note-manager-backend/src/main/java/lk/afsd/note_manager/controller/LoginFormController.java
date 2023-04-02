package lk.afsd.note_manager.controller;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.service.UserLoginService;
import lk.afsd.note_manager.service.serviceImpl.UserLoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/login")
public class LoginFormController {
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/save")
    public int saveUser(@RequestBody UserDTO userDTO) {

        int id = userLoginService.addUser(userDTO);
        return id;
    }

}
