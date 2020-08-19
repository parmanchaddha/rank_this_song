import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FlagIcon from '@material-ui/icons/Flag';

import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BandNameInput from "./EnterBandName";
import SubmitCancelBar from "./SubmitCancelBar";
import { randomize, Button_Top, Button_Bottom } from "./round1.js"
import "./song_shit.css";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <MusicNoteIcon />,
    2: <FlashOnIcon />,
    3: <FlagIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Choose A Band', 'Song FIGHT', 'And the loudest tune is...'];
}

export function StepContent(props) {
  const [band_name, setBandName] = React.useState("");
  const [song_list, setSongList] = React.useState([]);

  function updateSongsList(songs_list, artist) {
    // console.log(songs_list)
    setBandName(artist)
    setSongList(songs_list);
    props.next(true);
    return (songs_list)
  }

  switch (props.active_step) {
    case 0:
      return (
        <BandNameInput
          band_name={band_name}
          sendSongs={(songs_list, artist) => updateSongsList(songs_list, artist)}
        />
      )
    case 1:
      let randomized_songs = randomize(song_list);
      function Bracket() {    // create initial state for all button second round later that will be manipulated
        const [match1_round2, match1_round2_new] = React.useState("");  
        const [match2_round2, match2_round2_new] = React.useState("");
        const [match3_round2, match3_round2_new] = React.useState("");
        const [match4_round2, match4_round2_new] = React.useState("");
        const [match5_round3, match5_round3_new] = React.useState("");
        const [match6_round3, match6_round3_new] = React.useState("");
        const [match7_round4, match7_round4_new] = React.useState("");
        
        //click functions for each button
        function match1(e) {
          match1_round2_new(e.currentTarget.innerText)
        }
        function match2(e) {
          match2_round2_new(e.currentTarget.innerText)
        }
        function match3(e) {
          match3_round2_new(e.currentTarget.innerText)
        }
        function match4(e) {
          match4_round2_new(e.currentTarget.innerText)
        }
        function match5(e) {
          match5_round3_new(e.currentTarget.innerText)
        }
        function match6(e) {
          match6_round3_new(e.currentTarget.innerText)
        }
        function match7(e) {
          match7_round4_new(e.currentTarget.innerText)
        }
        sessionStorage.setItem("key", match7_round4) //store the winner for the next page
        return ( 
          <div>
            <div className="round round1">
              <div className="match1">
                <Button_Top selection={randomized_songs[0]} onClick={match1} />
                <Button_Bottom selection={randomized_songs[1]} onClick={match1} />
              </div>
              <div className="match2">
                <Button_Top selection={randomized_songs[2]} onClick={match2} />
                <Button_Bottom selection={randomized_songs[3]} onClick={match2} />
              </div>
              <div className="match3">
                <Button_Top  selection={randomized_songs[4]} onClick={match3} />
                <Button_Bottom  selection={randomized_songs[5]} onClick={match3} />
              </div>
              <div className="match4">
                <Button_Top  selection={randomized_songs[6]} onClick={match4} />
                <Button_Bottom  selection={randomized_songs[7]} onClick={match4} />
              </div>
            </div>
            <div className="round round2">
              <div className="match5">
                <Button_Top selection={match1_round2} onClick={match5} />
                <Button_Bottom selection={match2_round2} onClick={match5} />
              </div>
              <div className="match6">
                <Button_Top selection={match3_round2} onClick={match6} />
                <Button_Bottom selection={match4_round2} onClick={match6} />
              </div>
            </div>

            <div className="round round3" >
              <Button_Top selection={match5_round3} onClick={match7} />
              <Button_Bottom selection={match6_round3} onClick={match7} />
            </div>

            <div className="round round4">
              <h2>{match7_round4}</h2>
            </div>


          </div>
        )
      }  
      return (
        <Bracket />
      )
    
    case 2:
      let win = sessionStorage.getItem("key");
      return (
       <div> <p>The tune of all tunes is</p> <h1> {win}</h1></div>
      )
  
    case 3:
      return "You are finished!"
    default:
      return 'Unknown step';
  }
}

export function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep === steps.length) {
      setActiveStep(0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography className={classes.instructions}>
            <StepContent
              active_step={activeStep}
              next={() => handleNext()}
            />
          </Typography>
          <SubmitCancelBar
            active_step={activeStep}
            total_steps={steps.length}
            cancel_text={activeStep === steps.length ? "Reset" : "Back"}
            submit_text={activeStep === steps.length - 1 ? "Finish" : "Next"}
            onCancelClick={() => handleBack()}
            onSubmitClick={() => handleNext()}
          />
        </div>
      </div>
    </div>
  );
}


