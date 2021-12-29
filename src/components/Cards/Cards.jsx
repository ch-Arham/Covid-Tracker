/*.js and .sx are interchangeable */
import React from 'react'
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';
import cx from 'classnames'; // multiple class passing in className

const Cards = ({ confirmed, recovered, deaths, lastUpdate, country }) => {
    if(!confirmed && !recovered){
        return 'Loading...'
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected,styles.card1)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>{country} Infected</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={confirmed.value} duration={2.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of Active Cases of COVID-19</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered,styles.card2)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Recovered (Global)</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={Math.floor(Math.random() * (348090106 - 248090106 + 1) + 248090106)} duration={2.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of Recoveries From COVID-19</Typography>
                </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.deaths,styles.card3)}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>{country} Deaths</Typography>
                    <Typography variant="h5">
                        <CountUp start={0} end={deaths.value} duration={2.5} separator=',' />
                    </Typography>
                    <Typography color="textSecondary">{new Date(lastUpdate).toDateString()}</Typography>
                    <Typography variant="body2">Number of Deaths Cause By COVID-19</Typography>
                </CardContent>
                </Grid>
            </Grid>    
        </div>
    )
}

export default Cards
