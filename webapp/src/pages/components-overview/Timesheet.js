// material-ui
import { Box,  Grid,  Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import { times } from 'lodash';

function EditToolbar(props) {
  const { rows, onClick, userId } = props;

  const handleClick = () => {
    const newRow = {
      "id": 0,
      "userId": userId,
      "date": new Date().toISOString(),
      "vehicle": "",
      "projectNo": undefined,
      "location": "",
      "arriveTime": "7.00",
      "morningBreak": 20,
      "lunchBreak": 60,
      "departureTime": "17:00",
      "route": 30,
      "compensation": 60,
      "sleepAtHotel": true,
      "breakfastAtHotel": true,
      "sleepAtHome": false,
      "returnToAtelier": false,
      "repMidOption": true,
      "repMidValue": 18,
      "repSoirOption": false,
      "repSoirValue": 18,
      "description": "",
      "montant": "",
      "createdAt": new Date().toISOString(),
      "updatedAt": new Date().toISOString()
    }

    const newRows = [].concat(rows);
    newRows.push(newRow);
    console.log('newRows:::', newRows);
    onClick(newRows);
  };

  return (
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
  );
}

function getDate(params) {
  return `${new Date(params.row.date).toLocaleDateString()}`;
}

function getDeleteIcon(params) {
  return <DeleteIcon onClick={() => {
    console.log('params:::::', params)
    axios.delete(`http://localhost:4000/timesheets/${params.id}`);
    // console.log('timesheets', timesheets);
  }}/>
}

const vehicles = ['VS 448 346 - BT1 - 5047',
'VS 120 637 - BT2 - 5010',
'VS 401 723 - BT3 - 5045',
'VS 324 520 - BT4 - 5031',
'VS 275 86 - Camionnette 1 - 5023',
'VS 549971 - Camionnette 2 - 5051',
'VS 270 71 - SAV Ford - 5021',
'VS 448 441 - Toyota - 5048',
'VS 544 662 - Nouveau fourgon - 5050',
'VS 311955 - Bertrand - 5042',
'VS 330 603 - JC Echenard - 5049',
'VS 633 52 - Ribeiro - 5024',
'VS 316 492 - David F. - 5026',
'VS 399 249 - Jorge - 5046',
'VS 224 662 - Michel - 5043']

const columns = [
    { field: 'date', headerName: 'Date', type:'date', editable: true , valueGetter: getDate},
    { field: 'vehicle', headerName: 'Véhicule', type: 'singleSelect', editable: true, width:210, valueOptions: vehicles },
    { field: 'projectNo', headerName: 'N° de projet', type: 'number', editable: true },
    { field: 'location', headerName: 'Lieu du chantier', type: 'string', editable: true },
    { field: 'arriveTime', headerName: 'Arrivée chantier', type: 'string', editable: true },
    { field: 'morningBreak', headerName: 'Durée de pause matin', type: 'string', editable: true },
    { field: 'lunchBreak', headerName: 'Durée de pause midi', type: 'string', editable: true },
    { field: 'departureTime', headerName: 'Départ du chantier', type: 'string', editable: true },
    { field: 'route', headerName: 'Trajet', type: 'string', editable: true },
    { field: 'compensation', headerName: 'Compensation', type: 'string', editable: true },
    { field: 'sleepAtHotel', headerName: 'Nuit d\'hôtel', type: 'string', editable: true },
    { field: 'breakfastAtHotel', headerName: 'Petit déj. Hôtel', type: 'string', editable: true },
    { field: 'sleepAtHome', headerName: 'Nuit à la maison', type: 'string', editable: true },
    { field: 'returnToAtelier', headerName: 'Retour Atelier', type: 'string', editable: true },
    { field: 'repMidOption', headerName: 'Repas Midi', type: 'string', editable: true },
    { field: 'repMidValue', headerName: 'Repas Midi Val', type: 'string', editable: true },
    { field: 'repSoirOption', headerName: 'Repas Soir', type: 'string', editable: true },
    { field: 'repSoirValue', headerName: 'Repas Soir Val', type: 'string', editable: true },
    { field: 'description', headerName: 'Frais effectifs Descriptif', type: 'string', editable: true },
    { field: 'montant', headerName: 'Frais effectifs Montant', type: 'string', editable: true },
    { field: 'actions', type: 'string', headerName: 'Actions', width: 100, cellClassName: 'actions', renderCell:  getDeleteIcon},
  ];

const useMutation = () => {
  return useCallback(
    (timesheet) => {
      console.log('send timesheet to server:', timesheet);
      if(timesheet.id > 0){
        return axios.put(`http://localhost:4000/timesheets/${timesheet.id}`, timesheet);
      }
      delete timesheet.id;
      return axios.post(`http://localhost:4000/timesheets/`, timesheet);
    },
    [],
  );
};

// ==============================|| COMPONENTS - TIMESHEET ||============================== //

const ComponentTimesheet = () => {
    const mutateRow = useMutation();
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(users[0]);
    const [timesheets, setTimesheets] = useState([]);
    const [snackbar, setSnackbar] = useState(null);

    useEffect(() => {
      const getUsers = async () => {
        const { data } = await axios('http://localhost:4000/users');
        setUsers(data);
      };
      getUsers();
    }, []);

    useEffect(() => {
      const getTimesheets = async () => {
        if(!value)
          return;
        const { data } = await axios(`http://localhost:4000/timesheets/user/${value}`);
        setTimesheets(data);
      };

      getTimesheets();
    }, [value, mutateRow]);

    const processRowUpdate = useCallback(
      async (newRow) => {
        // Make the HTTP request to save in the backend
        const response = await mutateRow(newRow);
        setSnackbar({ children: 'Timesheet successfully saved', severity: 'success' });
        return JSON.parse(response.config.data);
      },
      [mutateRow],
    );

    const handleProcessRowUpdateError = useCallback((error) => {
      console.log('Error happened:', error);
      setSnackbar({ children: error.response.data.message, severity: 'error' });
    }, []);

    const handleCloseSnackbar = () => setSnackbar(null);

    return ( 
        <ComponentSkeleton>
            <Grid container spacing={3}>
                <Grid item xs={12} lg={12}>
                    <Stack spacing={3}>
                        <MainCard title="Tableau des frais montages prototype:">
                          <Stack spacing={2}>
                            <Autocomplete
                                disablePortal
                                onChange={(event, newValue) => {
                                  setValue(newValue.id);
                                }}
                                id="combo-box-demo"
                                options={users}
                                getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Nom:" />}
                            />
                            
                            <Box sx={{ height: 400, width: '100%' }}>
                                {value && <EditToolbar rows={timesheets} userId={value} onClick={(rows) => setTimesheets(rows)}/>}
                                <DataGrid
                                    editMode="row"
                                    rows={timesheets}
                                    columns={columns}
                                    processRowUpdate={processRowUpdate}
                                    getRowId={(row) => row.id}
                                    onCellClick={(params, event, details) => {
                                      if(params.field === 'actions') {
                                        setTimesheets(timesheets.filter(t => t.id !== params.id))
                                      }
                                    }}
                                    onProcessRowUpdateError={handleProcessRowUpdateError}
                                    experimentalFeatures={{ newEditingApi: true }}
                                />
                                {!!snackbar && (
                                  <Snackbar
                                    open
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                                    onClose={handleCloseSnackbar}
                                  >
                                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                                  </Snackbar>
                                )}
                            </Box>
                          </Stack>
                        </MainCard>
                    </Stack>
                </Grid>
            </Grid>
        </ComponentSkeleton>)};

export default ComponentTimesheet;
