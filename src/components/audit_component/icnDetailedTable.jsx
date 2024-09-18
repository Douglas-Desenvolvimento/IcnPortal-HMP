import React, { useState } from 'react';
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
import Paper from '@mui/material/Paper';
import TableSortLabel from '@mui/material/TableSortLabel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from '@mui/utils';

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
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    { id: 'mobile', numeric: false, label: 'Phone' },
    { id: 'siteid', numeric: false, label: 'Site Id' },
    { id: 'username', numeric: false, label: 'Username' },
    { id: 'timestamp', numeric: false, label: 'Timestamp' },
    { id: 'transactionid', numeric: false, label: 'Transaction Id' },
    { id: 'trustscore', numeric: true, label: 'TrustScore' },
    { id: 'status', numeric: true, label: 'Status' },
  ];

  return (
    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" >{row.mobile}</TableCell>
        <TableCell align="center">{row.siteid}</TableCell>
        <TableCell align="center">{row.username}</TableCell>
        <TableCell align="center">{row.timestamp}</TableCell>
        <TableCell align="center">{row.transactionid}</TableCell>
        <TableCell align="right">{row.trustscore}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 3 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Details</h4>
              <Table component={Paper} size="small" aria-label="purchases">
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

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Number Info</h4>
              <Table component={Paper} size="small" aria-label="number info">
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
                      <TableCell colSpan={2}>Number info not available</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow component={Paper} sx={{ backgroundColor: '#f5f5f5' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box component={Paper} sx={{ margin: 1 }}>
              <h4 className="p-2">Indicators</h4>
              <Table component={Paper} size="small" aria-label="indicators">
                <TableHead></TableHead>

                <TableBody>
                  {Object.entries(row.indicators).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>{key}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}

                  {Object.entries(row.indicators).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={2}>Indicators not available</TableCell>
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
    mobile: PropTypes.string.isRequired,
    siteid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    transactionid: PropTypes.string.isRequired,
    trustscore: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      })
    ).isRequired,
    numberInfo: PropTypes.object.isRequired,
    indicators: PropTypes.object.isRequired,
  }).isRequired,
};



function CollapsibleTable({ rows }) {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  console.log('Rows before sorting:', rows);

  if (!Array.isArray(rows)) {
    console.error('Expected rows to be an array:', rows);
    rows = []; // or handle the error appropriately
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <TableBody>
          {stableSort(rows, getComparator(order, orderBy)).map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.array.isRequired,
};

export default CollapsibleTable;
