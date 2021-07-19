import React from 'react';
import CurrencyTable from './CurrencyTable'

//Material UI imports
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

//Material UI styles
const useStyles = makeStyles({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        border: '2px solid #000',
    },
});

const Currency = ({ language, currState, currClose }) => {
    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={currState}
            onClose={currClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={currState}>
                <CurrencyTable />
            </Fade>
        </Modal>
    );
}
export default Currency;
