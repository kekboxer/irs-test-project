import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Button} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "8%",
        boxSizing: "border-box",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    appbar: {
        boxShadow: "none"
    },
    button: {
        marginRight: "8px"
    },
    saveButton: {
        backgroundColor: "#32CD32",
        color: "white",
        '&:hover': {
            backgroundColor: "#228B22"
        }
    }
}));

const TableToolbar = ({openModal, disableSaveButton}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="transparent" className={classes.appbar}>
                <Toolbar>
                    <Button variant="contained" color="primary" size="small" className={classes.button}
                            onClick={() => openModal()} startIcon={<AddIcon/>}>Добавить</Button>
                    <Button variant="contained" color="secondary" size="small"
                            className={classes.button} startIcon={<DeleteIcon/>}>Удалить</Button>
                    <Button variant="contained" disabled={disableSaveButton} size="small"
                            className={classes.saveButton} startIcon={<SaveIcon/>}>Сохранить</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default TableToolbar;
