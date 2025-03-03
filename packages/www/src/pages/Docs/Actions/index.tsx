import { Body1 } from '@components/Body1';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Code, ContentsClass, H3, H6, Stack } from 'reactjs-ui-core';

export const Actions: React.FC = () => {
  return (
    <Stack spacing={2}>
      <Stack className={ContentsClass.Item} spacing={2}>
        <H3 className={ContentsClass.ItemTitle} fontWeight={500}>
          Actions
        </H3>
        <Body1>
          <code>react-redux-use-model</code> provides the basic actions to
          handle CRUD operations with the backend:
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
            <TableRow>
              <TableCell>
                <code>ENTITY:READ</code>
              </TableCell>
              <TableCell>
                Action for fetching a single record from an API endpoint.
              </TableCell>
              <TableCell>
                <code>GET</code>
              </TableCell>
              <TableCell>
                <code>{'ReadQueryHandler<T>'}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>ENTITY:CREATE</code>
              </TableCell>
              <TableCell>
                Action for creating a single record from an API endpoint.
              </TableCell>
              <TableCell>
                <code>POST</code>
              </TableCell>
              <TableCell>
                <code>{'CreateQueryHandler<T>'}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>ENTITY:UPDATE</code>
              </TableCell>
              <TableCell>
                Action for updating a single record from an API endpoint.
              </TableCell>
              <TableCell>
                <code>PUT</code>
              </TableCell>
              <TableCell>
                <code>{'UpdateQueryHandler<T>'}</code>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <code>ENTITY:REMOVE</code>
              </TableCell>
              <TableCell>
                Action for deleting a single record from an API endpoint.
              </TableCell>
              <TableCell>
                <code>DELETE</code>
              </TableCell>
              <TableCell>
                <code>{'RemoveQueryHandler<T>'}</code>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack className={ContentsClass.Item} spacing={2}>
          <H6
            fontWeight={500}
            color="text.primary"
            className={ContentsClass.ItemTitle}
          >
            Defining a Model
          </H6>
          <Body1>
            By using the hook <code>useModel</code> you will define the
            interaction between the backend and the redux store.
          </Body1>
          <Code
            type="path"
            codePath="code-snippets/model-snippet-1.ts"
            language="typescript"
            mapReplace={{ '//MORE_CODE': '...' }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
