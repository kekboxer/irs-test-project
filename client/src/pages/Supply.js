import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import Table from '../components/Table'
import AuthoritySubjects from "../components/AuthoritySubjects";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    subjectsList: {
        height: "100vh",
    },
    chooseWrapper: {
        height: "100%",
        position: "relative"
    },
    choose: {
        width: "100%",
        textAlign: "center",
        position: "absolute",
        top: "30%",
        transform: "translate(0, -50%)"
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
                    : <div className={classes.chooseWrapper}><h2 className={classes.choose}>Выберите субъект РФ из списка слева</h2></div>}
            </Grid>
        </Grid>
    )
}

export default Supply;
