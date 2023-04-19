package lk.afsd.note_manager.controller;

import lk.afsd.note_manager.dto.NoteDTO;
import lk.afsd.note_manager.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/notes")
public class NoteController {
    private final String FOLDER_PATH="E:/Note App/note-manager-backend/note-manager-backend/src/main/resources/static/images/";
    @Autowired
    private NoteService noteService;

    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestParam("description") String description,
                                              @RequestParam("title") String title,
                                              @RequestParam("image") MultipartFile image,
                                              @RequestParam("date")String dateString) {

        try {
            String filePath = FOLDER_PATH+image.getOriginalFilename();
            /*byte[] imageBytes = Note.*/

            NoteDTO noteDTO= new NoteDTO(title,description,"/images/"+image.getOriginalFilename(),dateString);

            NoteDTO savedNoteDTO = noteService.createNote(noteDTO);
            image.transferTo(new File(filePath));
            return ResponseEntity.ok(savedNoteDTO);
        } catch (IOException e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        NoteDTO note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNoteById(@PathVariable Long id, @RequestBody NoteDTO noteDto) {
        NoteDTO updatedNote = noteService.updateNoteById(id, noteDto);
        return ResponseEntity.ok(updatedNote);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }
}