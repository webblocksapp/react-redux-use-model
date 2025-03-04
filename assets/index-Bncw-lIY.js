const n=`import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  TableContainerProps,
  TableProps,
} from '@mui/material';

type ApiData = {
  columnNames: Array<string>;
  rows: Array<Array<string | number | JSX.Element>>;
};

export interface ApiTableProps {
  data: ApiData;
  tableContainerProps?: TableContainerProps;
  tableProps?: TableProps;
}

export const ApiTable: React.FC<ApiTableProps> = ({
  tableContainerProps,
  tableProps,
  data,
}) => {
  return (
    <TableContainer component={Paper} {...tableContainerProps}>
      <Table {...tableProps}>
        <TableHead>
          <TableRow>
            {data.columnNames.map((columnName) => (
              <TableCell key={columnName}>{columnName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
`;export{n as default};
