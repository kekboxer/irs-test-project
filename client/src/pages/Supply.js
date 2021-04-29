import React, {useState} from 'react'
import {ExtGrid, ExtColumn} from '@sencha/ext-react-modern';
import {makeStyles} from '@material-ui/core/styles';
import Table from '../components/Table'
import AuthoritySubjects from "../components/AuthoritySubjects";
import {Grid} from "@material-ui/core";

const Ext = window['Ext'];

const useStyles = makeStyles((theme) => ({
    subjectsList: {
        height: "99vh",
        border: "1px solid rgba(0, 0, 0, 0.12)"
    },
    table: {
        display: "inline-block",
        width: `300px`,
        height: "100vh",
    }
}));

const Supply = () => {
    const [subjectId, setSubjectId] = useState(null);
    const classes = useStyles()

    const getIdFromList = (id) => {
        setSubjectId(id);
    }

    return (
        <Grid container spacing={2}>
            <Grid item sm={3} className={classes.subjectsList}>
                <AuthoritySubjects getIdFromList={getIdFromList}/>
            </Grid>
            <Grid item sm={9}>
                {subjectId
                    ? <Table subjectId={subjectId}/>
                    : <h1>Choose</h1>}
            </Grid>
        </Grid>
    )
}

export default Supply;
