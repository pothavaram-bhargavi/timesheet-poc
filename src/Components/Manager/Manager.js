import React from 'react'
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import DateRange from '../../mock-data/DateRange.json';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





var rows = [
  { id: 1, jobCode: "Testing", empName: "jain", projectCode: 'WFS_1101', total: 35, ViewDetails: "", Comments: "" },

];

const Manager = () => {
  localStorage.setItem("role", 'manager');
  const columns = [
    { field: 'id', headerName: 'Emp code', width: 90 },
    { field: 'jobCode', headerName: 'job Code', width: 90 },
    {
      field: 'empName',
      headerName: 'Emp Name',
      width: 150,
      editable: true,
    },
    {
      field: 'projectCode',
      headerName: 'Project Code',
      width: 150,
      editable: true,
    },
    {
      field: 'total',
      headerName: 'Total Hours',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'ViewDetails',
      headerName: 'View Details',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (param) => {
        return (

          <Button onClick={(e) => detailView(param)}><RemoveRedEyeIcon /></Button>
        );
      }
    },
    {
      field: 'Comments',
      headerName: 'Comments',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
      renderCell: (params) => {
        return (

          <input type="text" style={{ width: "100%" }} onChange={(e) => trigger(params, e)} />

        );
      }
    },
  ];
  const navigate = useNavigate();
  const detailView = (param) => {
    localStorage.setItem("details", param.id);

    navigate(`/details/${param.name}/${param.id}`);

  }
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [rowsData, setrowsData] = React.useState(rows);
  const [toastOpen, settoastOpen] = React.useState(false);
  const [rejectoast, setrejectoast] = React.useState(false);
  const [disableButtons, setdisableButtons] = React.useState(true);
  const [selectedDates, setselectedDates] = React.useState("");
  
  // const [timeSheetRows,setTimeSheetRows] = React.useState([]);
  const [refresh, setRefresh] = useState(false);
  const [dateRanges, setDateRanges] = useState(DateRange);
  const [selectedDate, setselectedDate] = React.useState(null);
  const role = localStorage.getItem("role") ?? 'employee';
  const [userSelectedDateRange, setUserSelectedDateRange] = useState(dateRanges[0].fromDate + '-' + dateRanges[0].toDate);
  // useEffect(() => {

  //   setDateRanges(DateRange);
  //   setSelectedDates(DateRange[0].dates)
  //   console.log("daterange", DateRange[0].dates);
  // }, []);

  useEffect(() => {

    if (refresh) {
      setSelectedRows([]);
      setrowsData([]);
      setdisableButtons(true);
      axios.get('http://localhost:3001/getdata')
        .then((response) => {
          console.log(response.data)
          setselectedDates(response.data[0]?.daterange);
          setrowsData(response.data)
          setRefresh(false);
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [refresh]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    settoastOpen(false);
    setrejectoast(false);
  };
  const apply = () => {

    const selectedIds = selectedRows.map(ele => ele?.id);
    const data = {
      id: selectedIds,
      status: 'approve'
    }
    axios.put("http://localhost:3001/timesheetActivity", data).then(response => {
      console.log('response:', response);
      settoastOpen(true);
      setTimeout(() => { setRefresh(true) }, 1000);
    }).catch(err => {
      console.log('err:', err);
    })
    return;



    // const arr1 = rowsData.map(e => e.id);
    // const arr2 = selectedRows.map(e => e.id);
    // let unique1 = arr1.filter((o) => arr2.indexOf(o) === -1);
    // let unique2 = arr2.filter((o) => arr1.indexOf(o) === -1);
    // const unique = unique1.concat(unique2);
    // let finalData = rowsData.filter((o) => unique.includes(o.id));
    // createEmployeeData(finalData);
    // setrowsData(finalData);


  }

  const reject = () => {
    const selectedIds = selectedRows.map(ele => ele?.id);
    const data = {
      id: selectedIds,
      status: 'rejected'
    }
    axios.put("http://localhost:3001/timesheetActivity", data).then(response => {
      console.log('response:', response);
      setrejectoast(true);
      setTimeout(() => { setRefresh(true) }, 1000);
      // setTimeout(() => { navigate('/employee') }, 1000);
    }).catch(err => {
      console.log('err:', err);
    })
    return;
    // const arr1 = rowsData.map(e => e.id);
    // const arr2 = selectedRows.map(e => e.id);
    // let unique1 = arr1.filter((o) => arr2.indexOf(o) === -1);
    // let unique2 = arr2.filter((o) => arr1.indexOf(o) === -1);
    // const unique = unique1.concat(unique2);
    // let finalData = rowsData.filter((o) => unique.includes(o.id));
    // createEmployeeData(finalData);
    // setrowsData(finalData);


  }
  var vertical = "top";
  var horizontal = "center";
  useEffect(()=>{
    setUserSelectedDateRange(dateRanges[0].fromDate + '-' + dateRanges[0].toDate);
  },[dateRanges]);
  useEffect(() => {

    // const data = JSON.parse(localStorage.getItem('EmployeesData'));
    // data && data.forEach((e, i) => {
    //   let strinfy = JSON.parse(e);
    //   setselectedDates(Object.keys(Object.values(strinfy)[0])[0]);
    //   let arrayData = Object.values(Object.values(strinfy)[0]);
    //   let rowsArray = arrayData[0].map((obj, index) => { obj["id"] = index; obj["empName"] = Object.keys(strinfy)[0]; return obj });
    //   if (localStorage.getItem("approved") === "true") {
    //     let removeItem = localStorage.getItem("details");

    //     let sorted = rowsArray.filter((e, i) => e.id !== Number(removeItem));
    //     createEmployeeData(sorted);
    //     setrowsData([...sorted]);
    //   } else {
    //     setrowsData([...rowsArray]);
    //   }

    // })

    axios.get(`http://localhost:3001/getdata?daterange=${userSelectedDateRange}`)
      .then((response) => {
        console.log(response.data)
        setselectedDates(response.data[0]?.daterange);
        setrowsData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userSelectedDateRange]);
  const createEmployeeData = (data) => {
    const empName = localStorage.getItem('employeeName');
    console.log(empName);
    const dateRange = localStorage.getItem('dateRange');
    const dateIndex = localStorage.getItem('selectedDateRangeIndex');
    if (empName && dateRange) {
      const empData = { [empName]: { [dateRange]: data, dateIndex: dateIndex } };
      let oldArray = [];
      oldArray.push(empData);

      localStorage.setItem('EmployeesData', [...oldArray])

    }

  }
  const checkItems = async (event, row, index) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      let rowsList = selectedRows;
      rowsList.push(row);
      setSelectedRows(rowsList);
      setdisableButtons(((selectedRows.length > 0) ? false : true));

    }


  }
  const handleDropdownChange = (event) => {
    const selectedIndex = event.target.value;
    // setSelectedRange(dateRanges[selectedIndex]);
    // setSelectedDates(dateRanges[selectedIndex].dates);
    const edata = dateRanges[selectedIndex].fromDate + '-' + dateRanges[selectedIndex].toDate;
    console.log('data', edata);
    // localStorage.setItem('dateRange', edata);
    // const empName = localStorage.getItem('employeeName');
    // let empData = localStorage.getItem(empName);
    // localStorage.setItem('selectedDateRangeIndex', selectedIndex);
    // empData = { [edata]: [] };
    // localStorage.setItem(empName, JSON.stringify(empData));

    // app call
    const dateRange = edata;
    axios.get(`http://localhost:3001/getdata?daterange=${dateRange}`)
      .then((response) => {
        console.log(response.data)
        setselectedDates(response.data[0]?.daterange);
        setrowsData(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

  };

  // const trigger = (row, e) => {
  //   console.log('trigger:',e.target.value,'length',e.target.value.length);
  //   const Data=rowsData.map(obj => {
  //     if (obj.id === row.id) {
  //       if((e.target.value).length<=250){
  //         obj.Comments = e.target.value; 
  //         return obj
  //       }
  //       return obj
  //     }
  //     return obj;
  //   });
  //   setrowsData(Data);
  
  // }
  const trigger = (row, e) => {
    if (e.target.value.length <= 250) {
      const updatedData = rowsData.map(obj => {
        if (obj.id === row.id) {
          obj.Comments = e.target.value;
        }
        return obj;
      });
      setrowsData(updatedData);
    } else {
      const truncatedValue = e.target.value.slice(0, 250);
      const updatedData = rowsData.map(obj => {
        if (obj.id === row.id) {
          obj.Comments = truncatedValue;
        }
        return obj;
      });
      setrowsData(updatedData);
    }
  };
  
  
  return (

    <div className="overall-layout">
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={toastOpen} autoHideDuration={6000} onClose={handleClose} role="alertdialog" aria-labelledby="approve-toast-message">
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Approved {selectedRows.map(e => e.EmpName).toString()}
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={rejectoast} autoHideDuration={6000} onClose={handleClose} role="alertdialog" aria-labelledby="reject-toast-message">
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          Rejected {selectedRows.map(e => e.EmpName).toString()}
        </Alert>
      </Snackbar>

      <div className="wrapper" role="group" aria-label="Time Sheet Actions">
        <div className="align-header">
          <div className='col-md-7'>
            <select className='employee-name-1' value={selectedDate} onChange={handleDropdownChange} aria-label="Select Date Range" tabIndex={0}>
              {dateRanges.map((range, index) => (
                <option key={index} value={index}>
                  {range.fromDate} - {range.toDate}
                </option>
              ))}
            </select>
          </div>
          {/* <input type="text" value={selectedDates} disabled aria-label="Selected Dates" role='textbox'/> */}
          {/* <select  className="select" value={selectedDates}>
            <option value="">{selectedDates}</option>
          </select> */}
          {/* <select className='employee-name' value={selectedDate} onChange={handleDropdownChange} aria-label="Select Date Range" tabIndex={0} >
                                {dateRanges.map((range, index) => (
                                    <option key={index} value={index}>
                                        {range.fromDate} - {range.toDate}

                                    </option>
                                ))}

                            </select> */}
        </div>
        <div className="align-buttons">
          <div>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" disabled={disableButtons} color="success" onClick={apply} role=" button" aria-label="Approve">Approve</Button>
              <Button variant="contained" disabled={disableButtons} color="error" onClick={reject} role=" button" aria-label="Reject">Reject</Button>
            </Stack>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div>
        <Box sx={{ height: 400, width: '100%' }}>
          <table class="table table-bordered text-center" aria-label='table'>
            <thead className='table-secondary' role="rowgroup">
              <tr className='bg-primary' role='row'>
                <th className='col-md-1' aria-label='Select' scope='col'>Select</th>
                <th className='col-md-2' aria-label='ProjectCode'>ProjectCode</th>
                <th className='col-md-2' aria-label='JobCode'>JobCode</th>
                <th className='col-md-2' aria-label='EmployeeName'>Emp name</th>
                <th className='col-md-1' aria-label='Total'>Total</th>
                <th className='col-md-1' aria-label='ViewDetails'>ViewDetails</th>
                <th className='col-md-2' aria-label='Comments'>Comments</th>
              </tr>
            </thead>
            <tbody id="table-body">
              {rowsData && rowsData.length > 0 ? rowsData.map((row, index) => {
                return (
                  <tr>
                    <td className='col-md-1' >

                      <label><input type='checkbox' title='checkbox' onChange={(e) => checkItems(e, row, index)} aria-label={`Select ${row.name}`} role="checkbox" /></label>

                    </td>
                    <td className='col-md-2' role="cell" tabIndex="0" aria-label={`Project Code: ${row.projectCode}`}>
                      {row.projectCode}
                    </td>
                    <td className='col-md-2' role='cell'>
                      <div className="container">
                        <div className="row justify-content-md-center" >
                          <div className="col-md-12 input" tabIndex="0" aria-label={`Job Code: ${row.jobCode}`} role='contentinfo'>
                            {row.jobCode}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='col-md-2' role='cell'>
                      <div className="container">
                        <div className="row justify-content-md-center">
                          <div className="col-md-12 input" tabIndex="0" aria-label={`Employee Name: ${row.name}`} role='contentinfo'>
                            {row.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='col-md-1' role="cell" tabIndex="0" aria-label={`Total: ${row.total}`}>{row.total}</td>
                    <td className='col-md-1'>
                      <div className="container">
                        <div className="row justify-content-md-center">
                          <div className="col-md-12 input">
                            <Button onClick={(e) => detailView(row)} aria-label="View Details" role='button' tabIndex={0}><RemoveRedEyeIcon /></Button>
                          </div>

                        </div>
                      </div>
                    </td>
                    <td className='col-md-2'>
                      <div className="container">
                        <div className="row justify-content-md-center">
                          <div className="col-md-12 input">
                          <input type="text" style={{ width: "100%" }} onChange={(e) => trigger(row, e)} aria-label="Enter Comments" role="textbox" tabIndex={0} value={row.Comments}/>
                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })
                : <p className="noData" aria-label="No Data">No Data</p>}
            </tbody>
          </table>
        </Box>
      </div>
    </div>
  )
}



export default Manager;