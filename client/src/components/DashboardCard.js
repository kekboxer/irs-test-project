import React from 'react'
import {Card, CardActions, CardContent, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        height: '100%',
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    title: {
        fontSize: 14,
    },
    button: {
        width: "100%"
    }
});

const DashboardCard = (props) => {
    const classes = useStyles();
    const { subTitle, title, text } = props;

    return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {subTitle}
                    </Typography>
                    <Typography variant="h5" color="textPrimary">
                        {title}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" target="_blank" color="primary" variant="outlined" className={classes.button} href="https://yandex.ru/referats/">
                        Узнать больше
                    </Button>
                </CardActions>
            </Card>
            )
}

export default DashboardCard;
