import React, {useState, useEffect} from 'react';
import Axios from "axios";
import {List, ListItem, ListSubheader, makeStyles, Typography, Divider, InputBase, fade} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        height: "91%",
        paddingTop: 0,
        border: "1px solid rgba(0, 0, 0, 0.12)",
    },
    header: {
        backgroundColor: "#e0e0e0",
        color: "black",
    },
    searchWrapper: {
        height: "5%",
        padding: '10px 0 10px 0',
        backgroundColor: "#1976d2"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const AuthoritySubjects = ({getIdFromList}) => {
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([])
    const [selectedSubject, setSelectedSubject] = useState();
    const [searchField, setSearchField] = useState('')

    const handleChange = (event) => {
        const query = event.target.value;
        setFilteredSubjects((() => {
            const filteredData = subjects.filter(element => {
                return element.p01.toLowerCase().includes(query.toLowerCase());
            });
            return filteredData
        }))
        setSearchField(event.target.value)
    }

    const classes = useStyles();

    useEffect(() => {
        async function getSubjects() {
            let subjects = await Axios({
                method: "GET",
                withCredentials: true,
                url: `http://${process.env.REACT_APP_SERVER}/api/supply/subjects`,
            })
            return subjects
        }

        getSubjects().then((res) => {
            setSubjects(res.data)
            setFilteredSubjects(res.data)
        })
    }, [])

    return (
        <>
            <div className={classes.searchWrapper}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase
                    placeholder="Поиск…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                    value={searchField}
                    onChange={handleChange}
                />
            </div>
            </div>
            <List className={classes.root}>
                <ListSubheader className={classes.header}><b>{"Субъект РФ"}</b></ListSubheader>
                {filteredSubjects.map((subject) => {
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
        </>
    )
}

export default AuthoritySubjects
