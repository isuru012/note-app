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


function ViewAll() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
         fetch("http://localhost:8080/api/notes")
            .then((response) => response.json())
            .then((data) => setNotes(data))
    .catch(error => console.error(error));
    }, []);


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
                <Card sx={{width:'30%'}}>
                    <CardMedia
                        component="img"
                        height="140"
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
                        <Button size="small">Update</Button>
                        <Button size="small">Delete</Button>
                    </CardActions>

                </Card>
/*

                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {note.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                    </CardActions>
                </Card>
*/

            ))}

        </div>
    );
}

export default ViewAll;