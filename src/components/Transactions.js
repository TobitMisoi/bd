import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//MUI Styles
const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: '23.1em',
        borderTop: 'black 1px solid',
    },
});

//SC Styles
const Container = styled.div`
height:29em;
margin: 0 2em 2em 4em;
background-color:white;
flex:8;
display:flex;
flex-flow:column nowrap;
justify-content:flex-start;
align-items:center;
box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.75);
`

const Header = styled.h3`
color:black;
font-weight:100;
font-size:1.5rem;
margin: 1em 0;
`

const StyledChange = styled.p`
font-size:0.9rem;
color: ${props => props.isPositive ? 'green' : 'red'};
`

const Change = ({ number }) =>
  <StyledChange isPositive={number >= 0}>{number >= 0
    ? `$${number.toFixed(2)}`
    : `-$${(number*-1).toFixed(2)}`}</StyledChange>

//MUI Table settings
const columns = [
    { id: 'date', label: 'Date', width: 1 },
    { id: 'description', label: 'Description', width: 4 },
    {
        id: 'reference',
        label: 'Ref',
        width: 1,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'amount',
        label: 'Amount',
        width: 1,
        align:'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(date, description, reference, amount) {
    return { date, description, reference, amount };
}

const rows = [
    createData('2020-06-09', "Hell's Kitchen Pizza Takeaway", 85746, -23.76),
    createData('2020-06-04', "Interact Purchase - ELECTRONICS ", 54678, -480.00),
    createData('2020-06-01', "ATM Withdrawl - INTERAC", 12094, -60.00),
    createData('2020-06-01', "Fees - Monthly", 45678, -5.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
    createData('2020-06-01', "Overseas Remittance CANADA", 12094, 2500.00),
];

function Transactions() {
    const classes = useStyles();
    const [account, setAccount] = React.useState('');

    return (
        <Container className={classes.root}>
            <Header>Transaction History</Header>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'amount' ? <Change number={value}/> : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </ Container>
    );
}
export default Transactions