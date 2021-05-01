import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {List, ListItem, ListSubheader, makeStyles, Typography, Divider} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: "98%",
        paddingTop: 0,
        border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    header: {
        backgroundColor: "#e0e0e0",
        color: "black",
    }
}));

const AuthoritySubjects = ({getIdFromList}) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState();

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
            <ListSubheader className={classes.header}><b>{"Субъект РФ"}</b></ListSubheader>
            {subjects.map((subject) => {
                return (
                    <div key={subject.p00}>
                        <ListItem button
                                  onClick={() => {
                                      getIdFromList(subject.p00);
                                      setSelectedSubject(subject.p00);
                                  }
                                  }
                                  selected={selectedSubject === subject.p00}
                        >
                            <Typography variant="body2" fontSize={89}>{subject.p01}</Typography>
                        </ListItem>
                        <Divider/>
                    </div>
                )
            })}
        </List>
    )
}

export default AuthoritySubjects
