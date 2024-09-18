import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { visuallyHidden } from '@mui/utils';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { CCard } from "@coreui/react";
import { CSVLink } from "react-csv";
import CIcon from "@coreui/icons-react";
import { cilDataTransferDown } from "@coreui/icons";

// Funções de ordenação
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Componente de ações da paginação
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'mobile', numeric: false, label: 'Phone' },
    { id: 'siteid', numeric: false, label: 'SiteId' },
    { id: 'username', numeric: false, label: 'Username' },
    { id: 'timestamp', numeric: false, label: 'Timestamp' },
    { id: 'act_transactionid', numeric: false, label: 'Transaction Id' },
    { id: 'trustscore', numeric: true, label: 'TrustScore' },
    { id: 'act_status', numeric: true, label: 'Status' },
  ];

  return (
    <TableHead sx={{ backgroundColor: "#f5f5f5", }}>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>

      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }} >
          {row.mobile}
        </TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.siteid}</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.username}</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.timestamp}</TableCell>
        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.act_transactionid}</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.trustscore}</TableCell>
        <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>{row.act_status}</TableCell>
      </TableRow>

      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 3 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="p-2 m-1 bg-white bg-gradient border-dark shadow" >
              <h4 className="p-2">Details</h4>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  {Array.isArray(row.details) ? (
                    row.details.map((detail, index) => (
                      <TableRow key={index}>
                        <TableCell>{Object.keys(detail)[0]}</TableCell>
                        <TableCell>{Object.values(detail)[0]}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>Details not available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="p-2 m-1 bg-white bg-gradient border-dark shadow">
              <h4 className="p-2">Number Info</h4>
              <Table size="small" aria-label="number info">
                <TableHead></TableHead>
                <TableBody>
                  {Object.entries(row.numberInfo).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                  {Object.entries(row.numberInfo).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2}>
                        Number info not available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="p-2 m-1 bg-white bg-gradient border-dark shadow">
              <h4 className="p-2">Indicators</h4>
              <Table size="small" aria-label="indicators">
                <TableHead>
                  <TableRow>
                    <TableCell>Indicator</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(row.indicators) ? (
                    row.indicators.map((indicator, index) => (
                      <TableRow key={index}>
                        <TableCell>{indicator}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>{row.indicators || 'Indicators not available'}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    act_transactionid: PropTypes.string.isRequired,
    siteid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    trustscore: PropTypes.string.isRequired,
    act_status: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    indicators: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]).isRequired,
    details: PropTypes.arrayOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
    numberInfo: PropTypes.shape({
      carrier: PropTypes.string.isRequired,
      lineType: PropTypes.string.isRequired,
      countryCode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

function CollapsibleTable({ rows }) {
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('timestamp');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };



  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const startIdx = page * rowsPerPage;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const sortedRows = stableSort(filteredRows.slice(startIdx), getComparator(order, orderBy));





  return (
    <>


      <TableContainer component={Paper} sx={{ padding: "0px", margin: "0px" }} >


        <Box sx={{ padding: '5px', display: 'flex', justifyContent: 'flex-end' }}>
          <CSVLink
            data={rows}
            filename={"Results.csv"}
            className="btn btn-transparent"
            style={{ marginRight: "20px" }}
          >
            Download CSV
            <CIcon
              icon={cilDataTransferDown}
              className="text-secondary"
              size="xl"
              title="CSV Download"
              data-bs-toggle="tooltip"
              data-bs-title="Another one here too"
            />
          </CSVLink>

          <Input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ width: '200px' }}
          />
        </Box>
        <Table aria-label="collapsible table">
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <Row key={index} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          <TableFooter sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow >
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                colSpan={10}
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',

                    },
                    native: true,


                  },
                }
                }
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}

              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.array.isRequired,

};


const IcnAllTable = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      const myHeaders = new Headers();
      myHeaders.append("i-token", "rvxdviev66at8db8p3av3jkckk50wd");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,

      };

      try {
        const response = await fetch('/activity', requestOptions);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`API returned status ${response.status}: ${text}`);
        }
        const data = await response.json();

        // console.log('Dados recebidos da API:', data);
        setRowData(data.rows || []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }

    };

    fetchData();
  }, []);

  return <CollapsibleTable rows={rowData} />;
};

IcnAllTable.propTypes = {

};

export default IcnAllTable;
