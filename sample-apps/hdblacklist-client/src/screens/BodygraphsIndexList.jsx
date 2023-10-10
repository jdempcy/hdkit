import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../components/dashboard/Title';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

// Generate bodygraph data.
function createData(id, date, name, type, profile, personalitySun) {
  return { id, date, name, type, profile, personalitySun };
}
  
const BodygraphsIndexList = (props) => {
  let rows = [];

  axios.get(`${REACT_APP_API_URL}/user/1/bodygraphs`, {withCredentials: true})
  .then(response => {
    console.log('response!', response)
  })
  .catch(error => console.log('API error:', error));


  rows[rows.length] = createData(
    0,
    new Date().toLocaleDateString(),
    'Jonah Dempcy',
    'Generator',
    '5/1',
    46.5,
  );

  return (
    <React.Fragment>
      <Title>Recent Bodygraphs</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Profile</TableCell>
            <TableCell align="right">P. Sun</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.profile}</TableCell>
              <TableCell align="right">{row.personalitySun}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default BodygraphsIndexList();