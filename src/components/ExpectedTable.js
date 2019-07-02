import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ExpectedTable = ({ expectedData, updateSelectedTrip }) => {
    let titleList = [];
    if (expectedData.length) {
        titleList = Object.keys(expectedData[0]);
    }
    return (
        <Paper style={{ overflowX: 'scroll' }}>
        <Table>
          <TableHead>
            <TableRow>
                {titleList.map((title, i) => 
                    title !== 'end' && title !== ' start' ? 
                    <TableCell key={i} onClick={updateSelectedTrip} style={{cursor: 'pointer'}}>{title}</TableCell> : 
                    <TableCell key={i}>{title}</TableCell>
                )}
            </TableRow>
          </TableHead>
          <TableBody>
            {expectedData.map((row, i) => {
                const list = Object.keys(row);
                return (
              <TableRow key={i}>
                  {list.map((item, j) => (
                      <TableCell key={j} component="th" scope="row">
                      {row[item]}
                    </TableCell>
                  ))}
              </TableRow>
            )}
            )}
          </TableBody>
        </Table>
      </Paper>
    )
}

export default ExpectedTable;