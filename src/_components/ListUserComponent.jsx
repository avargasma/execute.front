import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
    PagingState,
    IntegratedSorting,
    SortingState,
    IntegratedPaging,
    DataTypeProvider,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';
import Chip from '@material-ui/core/Chip';

import { userActions } from '../_actions';

const BooleanFormatter = ({ value }) => <Chip label={value ? 'Si' : 'No'} />;
const BooleanTypeProvider = props => (
    <DataTypeProvider
      formatterComponent={BooleanFormatter}
      {...props}
    />
  );


function ListUserComponent() {

    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const [columns] = useState([
        { name: 'Identificacion', title: 'Id' },
        { name: 'Nombre', title: 'Nombres' },
        { name: 'Apellido', title: 'Apellidos' },
        { name: 'Email', title: 'Email' },
        { name: 'Telefono', title: 'Tel' },
        { name: 'Institucion', title: 'Id inst.' },
        { name: 'Usuario', title: 'User' },
        { name: 'Activo', title: 'Activo' },
        { name: 'FechaCrea', title: 'Creado' },
        { name: 'FechaModifica', title: 'Modificado' },
    ]);

    const [booleanColumns] = useState(['Activo']);

    const [pageSizes] = useState([5, 10, 15]);

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    return (
        <div className="col-lg-12  h-100">
            <h3>Usuarios registrados</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}

            {users.items &&
                <Paper style={{ position: 'relative' }}>
                    <Grid
                        rows={users.items}
                        columns={columns}
                    >
                        <SortingState
                            defaultSorting={[{ columnName: 'Nombre', direction: 'asc' }]}
                        />
                        <IntegratedSorting />
                        <PagingState
                            defaultCurrentPage={0}
                            defaultPageSize={5}
                        />
                        <IntegratedPaging />
                        <BooleanTypeProvider
                        for={booleanColumns}
                        />
                        <Table

                        />
                        <TableHeaderRow showSortingControls />
                        <PagingPanel
                            pageSizes={pageSizes}
                        />
                    </Grid>
                    {users.loading && <Loading />}
                </Paper>
            }
        </div>
    );
}

export { ListUserComponent };