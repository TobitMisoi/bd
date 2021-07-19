import React, { useEffect, useState, useContext } from "react";
import { countryFlags, countryNames, currencyNames } from "./CountryFlags";
import axios from "axios";
import styled from "styled-components";
import { format, sub } from "date-fns";
import ReactCountryFlag from "react-country-flag";
import { UserContext } from "../contexts/UserContext";
import ClipLoader from "react-spinners/ClipLoader";

//MUI imports
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

//MUI styles
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
    minHeight: 440,
  },
});

//SC styles
const StyledChange = styled.p`
  font-size: 0.7rem;
  color: ${(props) => (props.isPositive ? "green" : "red")};
`;
const Loader = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;

const Change = ({ number }) => (
  <StyledChange isPositive={number >= 0}>
    {number >= 0 ? `▲ ${number.toFixed(2)} %` : `▼ ${number.toFixed(2) * -1} %`}
  </StyledChange>
);

function CurrencyTable() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const currDate = new Date();
  const { user } = useContext(UserContext);
  const [activeCurrency, setActiveCurrency] = useState(
    user ? user.currAbr : "USD"
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const ITEM_HEIGHT = 48;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewCurr = (currency) => {
    setActiveCurrency(currency);
    handleClose();
    setLoading(true);
  };

  //Column settings
  const columns = [
    { id: "Country", label: "Country", minWidth: 120 },
    {
      id: "Rate",
      label: `Rate (${activeCurrency})`,
      minWidth: 200,
      align: "center",
    },
    {
      id: "oneDay",
      label: "1D",
      minWidth: 130,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "oneWeek",
      label: "1W",
      minWidth: 130,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "oneMonth",
      label: "1M",
      minWidth: 130,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "threeMonth",
      label: "3M",
      minWidth: 130,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "sixMonth",
      label: "6M",
      minWidth: 130,
      align: "center",
      format: (value) => value.toFixed(2),
    },
    {
      id: "oneYear",
      label: "1Y",
      minWidth: 130,
      align: "center",
      format: (value) => value.toFixed(2),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.exchangeratesapi.io/latest?base=${activeCurrency}`
      );
      const resultOneDay = await axios(
        `https://api.exchangeratesapi.io/${format(
          sub(currDate, { days: 2 }),
          "yyyy-MM-dd"
        )}?base=${activeCurrency}`
      );
      const resultOneWeek = await axios(
        `https://api.exchangeratesapi.io/${format(
          sub(currDate, { days: 7 }),
          "yyyy-MM-dd"
        )}?base=${activeCurrency}`
      );
      const resultOneMonth = await axios(
        `https://api.exchangeratesapi.io/${format(
          sub(currDate, { months: 1 }),
          "yyyy-MM-dd"
        )}?base=${activeCurrency}`
      );
      const resultThreeMonth = await axios(
        `https://api.exchangeratesapi.io/${format(
          sub(currDate, { months: 3 }),
          "yyyy-MM-dd"
        )}?base=${activeCurrency}`
      );
      const resultSixMonth = await axios(
        `https://api.exchangeratesapi.io/${format(
          sub(currDate, { months: 6 }),
          "yyyy-MM-dd"
        )}?base=${activeCurrency}`
      );
      // const resultOneYear = await axios(
      //   `https://api.exchangeratesapi.io/${format(sub(currDate, { years: 1 }), 'yyyy-MM-dd')}?base=${activeCurrency}`,
      // );
      setData([
        Object.keys(result.data.rates),
        Object.values(result.data.rates),
        Object.values(resultOneDay.data.rates),
        Object.values(resultOneWeek.data.rates),
        Object.values(resultOneMonth.data.rates),
        Object.values(resultThreeMonth.data.rates),
        Object.values(resultSixMonth.data.rates),
        // Object.values(resultOneYear.data.rates),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [activeCurrency]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                    {column.id === "Rate" && (
                      <ArrowDropDownIcon onClick={handleClick} />
                    )}
                  </TableCell>
                ))}
              </TableRow>
              <Menu
                id='long-menu'
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch",
                  },
                }}
              >
                {data &&
                  currencyNames.map((currency) => (
                    <MenuItem
                      key={currency}
                      onClick={() => handleNewCurr(currency)}
                    >
                      {currency}
                    </MenuItem>
                  ))}
              </Menu>
            </>
          </TableHead>
          <TableBody>
            {!loading ? (
              data[0]
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((val, idx) => (
                  <TableRow key={val}>
                    <TableCell component='th' scope='row' align='left'>
                      <ReactCountryFlag
                        countryCode={countryFlags[idx]}
                        svg
                        style={{
                          width: "50px",
                          height: "25px",
                        }}
                        cdnUrl='https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/1x1/'
                        cdnSuffix='svg'
                        title={countryNames[idx]}
                      />
                      {val}
                    </TableCell>
                    <TableCell align='center'>
                      {data[1][idx].toFixed(5)}
                    </TableCell>
                    <TableCell align='center'>
                      {data[2][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[2][idx]) / data[2][idx]) * 100
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {data[3][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[3][idx]) / data[3][idx]) * 100
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {data[4][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[4][idx]) / data[4][idx]) * 100
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {data[5][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[5][idx]) / data[5][idx]) * 100
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {data[6][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[6][idx]) / data[6][idx]) * 100
                        }
                      />
                    </TableCell>
                    <TableCell align='center'>
                      {data[7][idx].toFixed(5)}
                      <Change
                        number={
                          ((data[1][idx] - data[7][idx]) / data[7][idx]) * 100
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <Loader>
                <ClipLoader size={50} color={"#65C7F7"} />
              </Loader>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component='div'
          count={data[0].length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
export default CurrencyTable;
