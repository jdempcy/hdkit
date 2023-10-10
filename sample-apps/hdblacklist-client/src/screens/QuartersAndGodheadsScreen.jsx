import * as React from 'react';

import Box from '@mui/material/Box';
import Christ from "../assets/godheads/christ.png";
import Hades from "../assets/godheads/hades.png";
import Harmonia from "../assets/godheads/harmonia.png";
import Janus from "../assets/godheads/janus.png";
import Kali from "../assets/godheads/kali.png";
import KeepersOfTheWheel from "../assets/godheads/keepers-of-the-wheel.png";
import Lakshmi from "../assets/godheads/lakshmi.png";
import Maat from "../assets/godheads/maat.png";
import Maia from "../assets/godheads/maia.png";
import Michael from "../assets/godheads/michael.png";
import Minerva from "../assets/godheads/minerva.png";
import Mitra from "../assets/godheads/mitra.png";
import Parvati from "../assets/godheads/parvati.png";
import Prometheus from "../assets/godheads/prometheus.png";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Thoth from "../assets/godheads/thoth.png";
import Title from '../components/dashboard/Title';
import Vishnu from "../assets/godheads/vishnu.png";

export default function QuartersAndGodheadsScreen() {

  let circularPortraitWrapperStyles = { position: 'relative', width: '200px', height: '200px', overflow: 'hidden', borderRadius: '50%' }; 
  let circularPortraitImageStyles = { width: '100%', height: 'auto' };
  let overlayTextStyles = { position: 'absolute', color: 'white', bottom: 8, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', background: '#000', opacity: .6, padding: '4 9', width: '100%' };

  return (
    <React.Fragment>
      <Title>Quarters and Godheads</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>&nbsp;</TableCell>
            <TableCell>1st</TableCell>
            <TableCell>2nd</TableCell>
            <TableCell>3rd</TableCell>
            <TableCell align="right">4th</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Initiation</TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Kali</div><Box component="img" sx={circularPortraitImageStyles} alt="Kali" src={Kali} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Mitra</div><Box component="img" sx={circularPortraitImageStyles} alt="Mitra" src={Mitra} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Michael</div><Box component="img" sx={circularPortraitImageStyles} alt="Michael" src={Michael} /></Box></TableCell>
            <TableCell align="right"><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Janus</div><Box component="img" sx={circularPortraitImageStyles} alt="Janus" src={Janus} /></Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Civilization</TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Maia</div><Box component="img" sx={circularPortraitImageStyles} alt="Maia" src={Maia} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Lakshmi</div><Box component="img" sx={circularPortraitImageStyles} alt="Lakshmi" src={Lakshmi} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Parvati</div><Box component="img" sx={circularPortraitImageStyles} src={Parvati} /></Box></TableCell>
            <TableCell align="right"><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Maat</div><Box component="img" sx={circularPortraitImageStyles} alt="Maat" src={Maat} /></Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Duality</TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Thoth</div><Box component="img" sx={circularPortraitImageStyles} alt="Thoth" src={Thoth} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Harmonia</div><Box component="img" sx={circularPortraitImageStyles} alt="Harmonia" src={Harmonia} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Christ</div><Box component="img" sx={circularPortraitImageStyles} alt="Christ" src={Christ} /></Box></TableCell>
            <TableCell align="right"><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Minerva</div><Box component="img" sx={circularPortraitImageStyles} alt="Minerva" src={Minerva} /></Box></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Mutation</TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Hades</div><Box component="img" sx={circularPortraitImageStyles} alt="Hades" src={Hades} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Prometheus</div><Box component="img" sx={circularPortraitImageStyles} alt="Prometheus" src={Prometheus} /></Box></TableCell>
            <TableCell><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Vishnu</div><Box component="img" sx={circularPortraitImageStyles} alt="Vishnu" src={Vishnu} /></Box></TableCell>
            <TableCell align="right"><Box component="div" sx={circularPortraitWrapperStyles}><div style={overlayTextStyles}>Keepers of<br/>the Wheel</div><Box component="img" sx={circularPortraitImageStyles} alt="KeepersOfTheWheel" src={KeepersOfTheWheel} /></Box></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
