import React, {useState} from 'react';
import axios from 'axios';
import Navbar from "../../components/NavBar/Navbar";
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Textarea from '@mui/joy/Textarea';


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
/*
const useStyles = createTheme((theme) => ({
    root: {
        padding: theme.spacing(4),
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3)
        },
        '& .MuiTypography-root': {
            marginBottom: theme.spacing(2)
        },
        '& .MuiButton-root': {
            marginTop: theme.spacing(2)
        }
    },
    submitButton: {
        position: 'relative',
        marginTop: theme.spacing(3),
        marginRight: theme.spacing(1)
    },
    loadingSpinner: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px'
    }
}));
*/

const Newnote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleCharsLeft, setTitleCharsLeft] = useState(60);
    const [descriptionCharsLeft, setDescriptionCharsLeft] = useState(200);
    const [image, setImage] = useState(null);
    const [imageName, setImageName] = useState("");
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

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        const timestamp = new Date();
        const datee = timestamp.toLocaleDateString();
        formData.append('date', datee);

        try {
            await axios.post('http://localhost:8080/api/notes', formData);
            setTitle('');
            setDescription('');
            setImage(null);

        } catch (error) {
            console.error(error);

        }
    };


    return (
        <div>
            <Navbar/>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <ThemeProvider theme={theme}>
                    <Typography variant="poster">Create New Note</Typography>
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
                <Button style={{backgroundColor:"green" ,maxWidth: '150px', maxHeight: '30px', minWidth: '150px', minHeight: '30px'}} variant="contained" component="span"
                        onClick={(event) => {
                           handleSubmit(event);
                        }}
                >
                    Create
                </Button>

            </Grid>

        </div>
    );
};

export default Newnote;