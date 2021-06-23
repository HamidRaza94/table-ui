import { useState, useEffect, useCallback } from 'react';
import Button from '@material-ui/core/Button';

import './App.css';
import { connection } from './libs';
import { Table, AddUserDialogBox, UpdateUserDialogBox, Icon } from './components';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [count, setCount] = useState(null);
  const [openUpdateDialogBox, setOpenUpdateDialogBox] = useState(false);
  const [openAddDialogBox, setOpenAddDialogBox] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchMutationCount = useCallback(async () => {
    try {
      const response = await connection('log');
      setCount(response?.data?.data?.count || 0);
    } catch (err) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data: { data } } = await connection('user');
        setLoading(false);
        setUsers(data);
      } catch (err) {
        setError(true)
      }
    };

    fetchUsers();
    fetchMutationCount();
  }, [fetchMutationCount]);

  const handleCloseUpdateDialogBox = () => {
    setOpenUpdateDialogBox(false);
  }

  const handleCloseAddDialogBox = () => {
    setOpenAddDialogBox(false);
  }

  const updateUserDetail = async (data) => {
    try {
      const response = await connection(`user/${selectedId}`, 'put', data);
      handleCloseUpdateDialogBox();

      const updatedUsers = users.map((user) => {
        if (user.originalId === selectedId) {
          return ({ ...response?.data?.data });
        }

        return user;
      });

      setUsers(updatedUsers);
      await fetchMutationCount();
    } catch (err) {
      console.log(err);
    }
  }

  const addUser = async (data) => {
    try {
      const response = await connection('user', 'post', data);
      handleCloseAddDialogBox();

      setUsers([...users, { ...response?.data?.data }]);
      await fetchMutationCount();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <h1 id='title'>Users</h1>
        <Button variant="contained" onClick={() => setOpenAddDialogBox(true)} style={{ height: 40, marginLeft: 10 }}>Add User</Button>
      </div>
      {error ? 'Something went wrong' : (
        <>
          <Table
            columns={[
              { label: 'ID', id: 'id', accessor: 'originalId' },
              { label: 'NAME', id: 'name', accessor: 'name' },
              { label: 'AGE', id: 'age', accessor: 'age' },
              { label: 'EMAIL', id: 'email', accessor: 'email' },
              {
                label: 'ACTION',
                id: 'action',
                Component: ({ data }) => (
                  <Icon
                    icon="edit"
                    onClick={() => {
                      setOpenUpdateDialogBox(true);
                      setSelectedId(data.originalId)
                    }}
                  />
                ),
              },
            ]}
            data={users}
            loading={loading}
          />
          <h5>Mutation count: {count}</h5>
        </>
      )}
      <AddUserDialogBox
        open={openAddDialogBox}
        handleClose={handleCloseAddDialogBox}
        primaryAction={addUser}
      />
      <UpdateUserDialogBox
        open={openUpdateDialogBox}
        handleClose={handleCloseUpdateDialogBox}
        primaryAction={updateUserDetail}
      />
    </div>
  );
}

export default App;
