import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        paddingTop: '2em',
        paddingBottom: 'none',
        width: 200,
    },
    typing: {
        color: '#fff'
    }
});

function valuetext(value) {
    return `${value}`;
}


export default function DiscreteSlider(props) {
    const classes = useStyles();
    const handleChange = (event) => {
        if (event.target.innerText === "") {
            return;
        }
        const num = parseInt(event.target.innerText, 10);
        props.onCountChange(num);
    }
    return (
        <div className={classes.root + " mx-4"}>

            <Slider
                defaultValue={props.default}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                onChangeCommitted={handleChange}
                step={props.step}
                min={props.min}
                max={props.max}
                disabled={props.disable}
            />
            <Typography className={classes.typing} id="discrete-slider" gutterBottom>
                {props.title}
            </Typography>
        </div>
    );
}
