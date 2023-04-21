import React, {useEffect, useState,} from 'react';
import './ViewAll.css'
import Navbar from "../../components/NavBar/Navbar";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {CardActionArea} from "@mui/material";
import {CardImg} from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Textarea from "@mui/joy/Textarea";
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';



function ViewAll() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleCharsLeft, setTitleCharsLeft] = useState(60);
    const [descriptionCharsLeft, setDescriptionCharsLeft] = useState(200);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
    useEffect(() => {
         fetchNotes();
    }, []);

    function fetchNotes() {
        fetch("http://localhost:8080/api/notes")
            .then((response) => response.json())
            .then((data) => setNotes(data))
            .catch((error) => console.error(error));
    }

    const [open, setOpen] = React.useState(false);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Do you want to Delete Note?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/notes/${id}`, {
                    method: "DELETE",
                })
                    .then(() => {
                        // Call fetchNotes to update the state with the updated data
                        fetchNotes();
                    })
                    .catch((error) => console.error(error));
                Swal.fire('Deleted!', '', 'success')
            } else if (result.isDenied) {
                Swal.fire('Note is not Deleted', '', 'info')
            }
        })


    };
    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        setTitleCharsLeft(60 - value.length);
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        if (value.length <= 200) {
            setDescription(value);
            setDescriptionCharsLeft(200 - value.length);
        }
    };

    const handleImageChange = (event) => {
        const selectedFile = event.target.files[0];
        setImageName(selectedFile.name);
        setImage(selectedFile);
    };
    const theme = createTheme({
        typography: {
            poster: {
                fontSize: '2.5rem',
                color: 'green',
            },
            title: {
                fontSize: '2rem',
                color: 'green',
            },
            contained: {
                color: 'green',
            },
            // Disable h3 variant
            h3: undefined,
        },
    });
    return (
        <div>

            <Navbar/>
           {/* <div className="note-list">
                {notes.map((note) => (
                    <div className="note-card" key={note.id}>
                        <div className="note-title">{note.title}</div>
                        <div className="note-description">{note.description}</div>
                        <div>
                            <img className="note-image" src={note.image} alt="" onError={(e) => console.log(e)}/>
                        </div>

                        <div className="note-date">{note.date}</div>
                    </div>
                ))}
            </div>*/}
            {notes.map((note)=>(
                <Card sx={{width:'30%',display:"inline-block",margin:2}}>
                    <CardMedia
                        component="img"
                        height="140"
                        width='30%'
                        image={"http://localhost:8080"+note.image}

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                            {note.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            {note.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            {note.date}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" color="success" onClick={handleClickOpen}>Update</Button>
                        <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={handleDelete(note.id)}>Delete</Button>
                    </CardActions>

                </Card>

            ))}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                   {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />*/}<Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center">
                    <ThemeProvider theme={theme}>
                        <Typography variant="poster">Update Note</Typography>
                    </ThemeProvider>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '40ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic"  label={`Title (${titleCharsLeft} characters left)`} variant="outlined"
                                   value={title}
                                   onChange={handleTitleChange}
                                   inputProps={{ maxLength: 60 }}
                        />


                    </Box>
                    <Box sx={{p: 2, width: '44ch'}}>
                        <Textarea
                            placeholder="Description"
                            value={description}
                            onChange={handleDescriptionChange}
                            minRows={2}
                            maxRows={4}
                            inputProps={{ maxLength: 200 }}


                        />
                        <Typography variant="caption" align="right">
                            {descriptionCharsLeft}/200
                        </Typography>
                    </Box>

                    <label htmlFor="upload-photo">
                        <input
                            style={{display: "none"}}
                            id="upload-photo"
                            name="upload-photo"
                            type="file" onChange={handleImageChange}/>

                        <Button style={{backgroundColor:"#41b022" ,maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px'}} variant="contained" component="span">
                            Upload Image
                        </Button>



                    </label>
                    {imageName && <p>File Name: {imageName}</p>}


                </Grid>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleClose}>Cancel</Button>
                    <Button size="small" onClick={handleClose} variant="contained" color="success">Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ViewAll;