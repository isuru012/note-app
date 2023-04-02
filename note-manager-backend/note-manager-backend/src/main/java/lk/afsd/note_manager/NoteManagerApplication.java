package lk.afsd.note_manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("lk.afsd.note_manager")
public class NoteManagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(NoteManagerApplication.class, args);
	}

}
