import React from "react";
import {Grid} from "@material-ui/core";
import DashboardCard from '../components/DashboardCard';
import {cardsText} from '../assets/DashboardInformation'

const Dashboard = () => {

    const informationToCards = cardsText;

    return (
        <div>
            <Grid container spacing={2}>
                {informationToCards.map((item) => {
                    return (
                        <Grid item sm={6} md={4} lg={3} key={item.id}>
                            <DashboardCard subTitle={item.subTitle} title={item.title} text={item.text}/>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )

}

export default Dashboard;