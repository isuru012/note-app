package lk.afsd.note_manager.config;

import lk.afsd.note_manager.dto.UserDTO;
import lk.afsd.note_manager.service.UserLoginService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
@ComponentScan(basePackages = "lk.afsd.note_manager.service.serviceImpl")
public class Myconfig {

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

}
