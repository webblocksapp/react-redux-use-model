import { Body1 } from '@components/Body1';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const ListRecords: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          List Records
        </H3>
        <Body1>
          This model action allows you to handle a backend endpoint for
          retrieving a paginated list of records.
        </Body1>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Action Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>HTTP Verb</TableCell>
              <TableCell>TS Handler Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <code>ENTITY:LIST</code>
              </TableCell>
              <TableCell>
                Action for fetching a paginated list of records from an API
                endpoint.
              </TableCell>
              <TableCell>
                <code>GET</code>
              </TableCell>
              <TableCell>
                <code>{'ListQueryHandler<T>'}</code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            ListQueryHandler Constraints
          </H6>
          <Code
            type="path"
            codePath="code-snippets/model-snippet-2.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6 className={ContentsClass.ItemTitle} fontWeight={500}>
            List API client method
          </H6>
          <Body1>
            You can use the <code>ListResponse</code> constraint to type your
            API response and ensure it matches the required format for the{' '}
            <code>ListQueryHandler</code> constraint.
          </Body1>
          <Code
            type="path"
            codePath="code-snippets/api-client-snippet-2.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
