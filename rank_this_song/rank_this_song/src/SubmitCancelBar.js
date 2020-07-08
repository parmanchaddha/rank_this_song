import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import "./SubmitCancelBar.css"; 

/**
 * Component: SubmitCancelBar: bar at the bottom of the page with the submit and clear buttons. 
 * @param {int} props.active_step: The active step of the file. (if 0 cancel button is disabled.)
 * @param {int} total_steps: The total number of steps (required to disable submit/next button!)
 * @param {string} props.cancel_text: Text to use for the cancel button.
 * @param {string} props.submit_text: Text to use for the submit button.
 * @param {func} props.onCancelClick: Function to handle click of cancel button.
 * @param {func} props.onSubmitClick: Function to handle click of the submit button.
 * 
 */
export default function SubmitCancelBar(props) {
  return (
    <div className = "submit-cancel">
      <div className = "cancel">
        <Button 
          variant = "contained"
          color = "secondary"
          disabled={props.active_step === 0}
          onClick={() => props.onCancelClick()}>
            {props.cancel_text}
        </Button>
      </div>

      <div className = "submit">
        <Button
          variant="contained"
          color="primary"
          disabled = {props.active_step === props.total_steps}
          onClick ={() => props.onSubmitClick()}>
            {props.submit_text}
        </Button>
      </div>
    </div>
  );
};

SubmitCancelBar.propTypes = {
  /**
   * props.active_step: The active step of the file. (if 0 cancel button is disabled.)
   */
  active_step: PropTypes.number,
  /**
   * props.active_step: The active step of the file. (if 0 cancel button is disabled.)
   */
  total_steps: PropTypes.number,
    /**
   * props.cancel_text: Text to use for the cancel button
   */
  cancel_text: PropTypes.string,
  /**
   * submit_text: Text to use for the submit button.
   */
  submit_text: PropTypes.string,
    /**
   * onCancelClick: Function to handle click of cancel button.
   */
  onCancelClick: PropTypes.func.isRequired,
    /**
   * onSubmitClick: Function to handle click of the submit button.
   */
  onSubmitClick: PropTypes.func.isRequired,
};

SubmitCancelBar.defaultProps = {
  active_step: 1,
  total_steps: 1000,
  cancel_text: "Cancel",
  submit_text: "Submit",
}