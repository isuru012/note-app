package lk.afsd.note_manager.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class NoteDTO {


    private String title;
    private String description;
    private String image;
    private String date;


    public NoteDTO() {
    }

    public NoteDTO(String title, String description, String image, String date) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.date = date;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
