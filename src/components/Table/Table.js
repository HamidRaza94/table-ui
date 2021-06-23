import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableMUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Table = ({ columns, data, loading }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <TableMUI className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map(({ id, label }) => (<TableCell key={id}>{label}</TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && data.map((row) => (
            <TableRow key={row.id}>
              {columns.map(({ accessor, Component }) => {
                if (Component) {
                  return (<Component key={`${accessor}.${row.id}`} data={row} />)
                }

                return (<TableCell key={`${accessor}.${row.id}`}>{row[accessor]}</TableCell>)
              })}
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
}

export default Table;
