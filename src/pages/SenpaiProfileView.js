import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import { selectedSenpaiState } from '../atoms';
import { useRecoilValue } from 'recoil';
import { blueGrey } from '@material-ui/core/colors';
import BookNowPopover from '../components/BookNowPopover';
import { Container } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    test1: {
        backgroundColor: blueGrey[50]
    },
    test2: {
        backgroundColor: blueGrey[100]
    },
}));

export default function SenpaiProfileView({match, location}) {
    const classes = useStyles();
    const selectedSenpai = useRecoilValue(selectedSenpaiState)
    console.log(selectedSenpai)
    console.log(match)
    console.log(location)



    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={8} className={classes.test1}>
                    <Container fixed style={{ backgroundColor: '#cfe8fc', height: '45vh' }}>
                        <div>Video Here</div>
                    </Container>
                    <Container fixed style={{height: '45vh' }}>
                        <div>Bio Here</div>
                    </Container>
                </Grid>
                <Grid item xs={4} className={classes.test2}>
                    <Container fixed style={{height: '25vh' }}>
                        <div>Schedule Here</div>
                    </Container>
                    <BookNowPopover senpaiId={match.params.id} />
                </Grid>

            </Grid>

        </div>
    )
}
