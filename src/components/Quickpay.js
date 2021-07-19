import React from 'react';
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

//MUI Styles
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1.5),
            width: '45ch',
        },
        flex: {
            flex: 1
        }
    },
    formControl: {
        margin: theme.spacing(1.5),
        width: '45ch',
    },
    margin: {
        margin: '1em 0'
    }
}));

//SC Styles
const FormContainer = styled.form`
height:29em;
margin: 0 4em 2em 2em;
background-color:white;
flex:4;
display:flex;
flex-flow:column nowrap;
justify-content:flex-start;
align-items:center;
box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.75);
`

const Header = styled.h3`
color:black;
font-weight:100;
font-size:1.5rem;
margin: 1em 0;
`

function Quickpay() {
    const classes = useStyles();
    const [account, setAccount] = React.useState('');

    const handleChange = (event) => {
        setAccount(event.target.value);
    };

    return (
        <FormContainer className={classes.root} noValidate autoComplete='off'>
            <Header>Quick Payments & Transfers</Header>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel required id="form-label">From:</InputLabel>
                <Select
                    labelId="form-label"
                    id="from-form"
                    value={account}
                    onChange={handleChange}
                    label="From:"
                >
                    <MenuItem value={'Savings'}>Savings [11-3186-05583943-00]</MenuItem>
                    <MenuItem value={'Checking'}>Checking</MenuItem>
                    <MenuItem value={'Visa'}>Visa</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                id="to-form"
                label="To:"
                placeholder="Enter payee"
                variant="outlined"
            />
            <TextField
                required
                id="number-form"
                label="Amount:"
                type="number"
                variant="outlined"
            />
            <Button className={classes.margin} variant="contained" color="primary">
                Submit
            </Button>
        </FormContainer>
    );
}
export default Quickpay 