import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    }
}));


export default function BookNowPopover() {
    const selectedSenpai = "61541327574b88e678a5ccef" //temp

    const classes = useStyles();

        //Popover logic
        const [anchorEl, setAnchorEl] = useState(null);

        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
        };
    
        const handleClose = () => {
            setAnchorEl(null);
        };
    
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;
    
        // end of popover logic


    return (
        <div>
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
                Book Now
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
            >
                <Typography className={classes.typography}>The content of the Popover.</Typography>
                <button></button>
                
                <Link to={`/senpais/${selectedSenpai}/schedule`}>See full schedule</Link>
            </Popover>
        </div>
    )
}
