import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {List, ListItem, ListItemText, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: "98%",
    },
}));

const AuthoritySubjects = ({getIdFromList}) => {
    const [subjects, setSubjects] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        async function getSubjects() {
            let subjects = await Axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:5000/api/supply/subjects",
            })
            return subjects
        }

        getSubjects().then((res) => {
            setSubjects(res.data)
        })
    }, [])

    return (
        <List className={classes.root}>
            {subjects.map((subject) => {
                return (
                    <ListItem button key={subject.p00}
                              onClick={() => {
                                  getIdFromList(subject.p00);
                              }
                              }
                    >
                        <ListItemText primary={subject.p01}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default AuthoritySubjects
