package lk.afsd.note_manager.service.serviceImpl;

import lk.afsd.note_manager.config.NoteNotFoundException;
import lk.afsd.note_manager.dto.NoteDTO;
import lk.afsd.note_manager.entity.Note;
import lk.afsd.note_manager.repo.NoteRepo;
import lk.afsd.note_manager.service.NoteService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NoteServiceImpl implements NoteService {

    @Autowired
    private NoteRepo noteRepository;


    private ModelMapper modelMapper=new ModelMapper();

    public NoteServiceImpl() {
    }

    @Override
    public NoteDTO createNote(NoteDTO noteDto) {
        Note note = modelMapper.map(noteDto, Note.class);
        note = noteRepository.save(note);
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public List<NoteDTO> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return notes.stream()
                .map(note -> modelMapper.map(note, NoteDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public NoteDTO getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));
        return modelMapper.map(note, NoteDTO.class);
    }

    @Override
    public NoteDTO updateNoteById(Long id, NoteDTO noteDto) {
        Note noteToUpdate = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));

        modelMapper.map(noteDto, noteToUpdate);

        noteToUpdate.setDate(String.valueOf(LocalDate.now()));

        Note updatedNote = noteRepository.save(noteToUpdate);
        return modelMapper.map(updatedNote, NoteDTO.class);
    }

    @Override
    public void deleteNoteById(Long id) {
        Note noteToDelete = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id " + id));
        noteRepository.delete(noteToDelete);
    }
}
