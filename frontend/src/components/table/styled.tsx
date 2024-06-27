import styled from "styled-components";
import TableRow from "@mui/material/TableRow";

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 100%;
  margin: 50px auto;
`;

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;
