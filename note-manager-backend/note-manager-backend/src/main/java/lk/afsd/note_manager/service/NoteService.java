package lk.afsd.note_manager.service;

import lk.afsd.note_manager.dto.NoteDTO;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface NoteService {

    NoteDTO createNote(NoteDTO noteDto);

    List<NoteDTO> getAllNotes();

    NoteDTO getNoteById(Long id);

    NoteDTO updateNoteById(Long id, NoteDTO noteDto);

    void deleteNoteById(Long id);
}
