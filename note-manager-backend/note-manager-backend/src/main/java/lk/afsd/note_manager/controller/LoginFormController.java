package lk.afsd.note_manager.controller;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.entity.User;
import lk.afsd.note_manager.service.UserLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("api/login")
public class LoginFormController {
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/save")
    public ResponseEntity<String> saveUser(@RequestBody UserDTO userDTO) {
        User user = userLoginService.getUserByUsername(userDTO.getUserName());
        Map<String, String> response = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");

        if (user != null) {
            response.put("message", "User Already Exists");

            return new ResponseEntity(response,headers,HttpStatus.NOT_FOUND);
        }
        userLoginService.addUser(userDTO);
        response.put("message", "Success");
        return new ResponseEntity(response, headers, HttpStatus.OK);
    }
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
        User user = userLoginService.getUserByUsername(username);
        Map<String, String> response = new HashMap<>();
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json");
        if (user == null) {
            response.put("message", "User not found");

            return new ResponseEntity(response,headers,HttpStatus.NOT_FOUND);
        }

        if (!userLoginService.checkPassword(user, password)) {
            response.put("message", "Incorrect password");

            return new ResponseEntity(response,headers,HttpStatus.UNAUTHORIZED);
        }



        response.put("message", "Success");

        return new ResponseEntity(response, headers, HttpStatus.OK);


    }



}
