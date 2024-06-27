import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { TableWrapper, StyledTableRow } from './styled';
import { useNavigate } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import { usePassengerData } from '../../hooks/usePassengerData';

export const TableComponent = () => {
  const navigate = useNavigate();
  const { data } = usePassengerData();

  return (
    <TableWrapper>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 700 }}>Title</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Phone</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Street</TableCell>
              <TableCell style={{ fontWeight: 700 }}>Zipcode</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((passenger) => (
              <StyledTableRow
                key={passenger._id}
                onClick={() => navigate(`/passenger/${passenger._id}`)}
              >
                <TableCell component="th" scope="row">
                  {passenger.title}
                </TableCell>
                <TableCell>
                  {passenger.firstName} {passenger.lastName}
                </TableCell>
                <TableCell>{passenger.email}</TableCell>
                <TableCell>{passenger.phone}</TableCell>
                <TableCell>{passenger.street}</TableCell>
                <TableCell>{passenger.zipcode}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableWrapper>
  );
};
