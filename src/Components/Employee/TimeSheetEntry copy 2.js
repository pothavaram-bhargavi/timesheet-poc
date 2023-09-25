import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";
// import DateRange from './DateRange.json';
import DateRange from '../../mock-data/DateRange.json';
import axios from 'axios';
import projectData from "../../mock-data/project-codes.json";
import jobData from "../../mock-data/job-codes.json";
import Select from 'react-select';
import MuiAlert from '@mui/material/Alert';
import "./Table.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TimeSheetEntry = (props) => {
    console.log('TimeSheetEntry', props);
    const naviagate = useNavigate();
    const role = localStorage.getItem("role") ?? 'employee';
    const [dateRanges, setDateRanges] = useState(DateRange);
    console.log('dates', DateRange);
    const [selectedDates, setSelectedDates] = useState(['', '', '', '', '', '', '']);
    const [selectedRange, setSelectedRange] = useState(null);
    const [selectedDate, setselectedDate] = React.useState(null);
    const [comments, setComments] = useState('');
    const [open, setOpen] = React.useState(false);
    const [currentpojectCode, setcurrentpojectCode] = React.useState(null);
    const [currentjobCode, setcurrentjobCode] = React.useState(null);

    const [suggestions, setSuggestions] = useState([]);
    const [text, setText] = useState('');
    const [jobtext, setjobText] = useState('');
    const [timesheetExists, setTimesheetExists] = useState(false);
    const [userHaveData,setUserHaveData] = useState(false);

    // const [items, setItems] = useState([]);


    const [timeSheetRows, setTimeSheetRows] = useState();

    // dayswise column sum
    const [day1Total, setDay1Total] = useState(0);
    const [day2Total, setDay2Total] = useState(0);
    const [day3Total, setDay3Total] = useState(0);
    const [day4Total, setDay4Total] = useState(0);
    const [day5Total, setDay5Total] = useState(0);
    const [day6Total, setDay6Total] = useState(0);
    const [day7Total, setDay7Total] = useState(0);


    const [projectCodes, setProjectCodes] = useState([]);
    const [employeeName, setEmployeeName] = useState('');
    const [jobCodes, setJobCodes] = useState([]);
    var vertical = "top";
    var horizontal = "center";
    const [toastOpen, settoastOpen] = React.useState(false);
    const [rejectoast, setrejectoast] = React.useState(false);
    const [existtoast,setExistToast] = useState(false);
    const [employees, setEmployees] = useState(
        ['Bhargavi',
            'Karthik',
            'Rakesh']);
    const [employee, setEmployee] = useState('');
    const [selectedDateRange, setselectedDateRange] = useState("");
    const [timeSheetData, setTimeSheetData] = useState({});

    // Initialize timeSheetData with an empty object for the current date range
    useEffect(() => {
        const initialData = {};
        setTimeSheetData(initialData);
    }, []);



    const BacktoManagerApprove = () => {
        const data = {
            id: [props?.empDetails?.id],
            status: 'approve'
        }
        axios.put("http://localhost:3001/timesheetActivity", data).then(response => {
            console.log('response:', response);
            settoastOpen(true);
            setTimeout(() => naviagate("/manager"), 1000);
        }).catch(err => {
            console.log('err:', err);
        })
        return;
        // localStorage.setItem("approved", true);
        // settoastOpen(true);
        // setTimeout(() => naviagate("/manager"), 1000);




    }
    const BacktoManagerRejected = () => {
        const data = {
            id: [props?.empDetails?.id],
            status: 'rejected'
        }
        axios.put("http://localhost:3001/timesheetActivity", data).then(response => {
            console.log('response:', response);
            setrejectoast(true);
            setTimeout(() => naviagate("/manager"), 1000);
        }).catch(err => {
            console.log('err:', err);
        })
        return;
        // setrejectoast(true);
        // setTimeout(() => naviagate("/manager"), 1000);
        // localStorage.setItem("approved", true);


    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        settoastOpen(false);
        setrejectoast(false);
        setExistToast(false);
    };
    useEffect(() => {
        // setTimeSheetRows([{ projectCode: '', jobCode: '', day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, total: 0 }])
        console.log('props?.name', props?.name);
        // if (props?.name && props?.name.length > 0) {
        //     setEmployeeName(props.name);
        //     setTimeSheetRows([props?.empDetails ? props?.empDetails : { projectCode: '', jobCode: '', day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, total: 0 }])
        //     setDay1Total(parseInt(props.empDetails['day1']));
        //     setDay2Total(parseInt(props.empDetails['day2']));
        //     setDay3Total(parseInt(props.empDetails['day3']));
        //     setDay4Total(parseInt(props.empDetails['day4']));
        //     setDay5Total(parseInt(props.empDetails['day5']));
        //     setDay6Total(parseInt(props.empDetails['day6']));
        //     setDay7Total(parseInt(props.empDetails['day7']));
        // }
    }, []);


    useEffect(() => {
        setEmployees(['Bhargavi',
            'Karthik',
            'Rakesh'])
        setDateRanges(DateRange);
        setSelectedDates(DateRange[0].dates)
        console.log("daterange", DateRange[0].dates);
        setProjectCodes(projectData);
        setJobCodes(jobData);
        if (window.location.href.includes("details")) {
            //     const employeesData= JSON.parse(localStorage.getItem('EmployeesData'));
            //     const pathname = window.location.pathname;
            //     const name = pathname.split("/")[2];
            //     setEmployeeName(name);
            //     console.log(employeesData);    
            //   let date = employeesData.length && Object.values(JSON.parse(employeesData[0]))[0].dateIndex;
            //   setselectedDate(date);
            //   setSelectedRange(dateRanges[date]);
            //   setSelectedDates(dateRanges[date]?.dates);

            //   if(employeesData && employeesData.length) {
            //       const selectedView = Number(localStorage.getItem('details'));
            //    let timesheetData =   Object.values(Object.values(JSON.parse(employeesData[0]))[0])[0];
            //   let updateTable =  timesheetData[selectedView]
            //    setTimeSheetRows([updateTable]);
            //    setDay1Total( parseInt(updateTable['day1']));
            //    setDay2Total(parseInt(updateTable['day2']));
            //    setDay3Total(parseInt(updateTable['day3']));
            //    setDay4Total(parseInt(updateTable['day4']));
            //    setDay5Total(parseInt(updateTable['day5']));
            //    setDay6Total(parseInt(updateTable['day6']));
            //    setDay7Total(parseInt(updateTable['day7']));
            //    };
            //    if(window.location.href.includes("details")) {


            //     }

        }
    }, []);
    useEffect(() => {
        console.log('emp', props?.empDetails);
        const employeesData = props?.empDetails;
        if (employeesData && employeesData?.id) {

            console.log('employeeName', props.name);
            // const emp = props.empDetails
            console.log('day1', parseInt(props.empDetails['day1']))
            setTimeSheetRows([props.empDetails])
            setDay1Total(parseInt(props.empDetails['day1']));
            setDay2Total(parseInt(props.empDetails['day2']));
            setDay3Total(parseInt(props.empDetails['day3']));
            setDay4Total(parseInt(props.empDetails['day4']));
            setDay5Total(parseInt(props.empDetails['day5']));
            setDay6Total(parseInt(props.empDetails['day6']));
            setDay7Total(parseInt(props.empDetails['day7']));
            setselectedDateRange(props.empDetails.daterange);
        } else {
            setTimeSheetRows([{ projectCode: '', jobCode: '', day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, total: 0 }])
        }
    }, [props?.empDetails])

    useEffect(() => {
        setEmployeeName(props.name);
    }, [props?.name]);

    // const handleEmployee = (empName) => {
    //    setEmployeeName(empName);
    //     localStorage.setItem('employeeName', empName);
    //     localStorage.setItem(empName, '');
    // }

    const handleDropdownChange = (event) => {
        const selectedIndex = event.target.value;
        console.log('selectedIndex', selectedIndex);
        setSelectedRange(dateRanges[selectedIndex]);
        console.log('dateRanges', dateRanges[selectedIndex])
        setSelectedDates(dateRanges[selectedIndex].dates);
        console.log('dates', dateRanges[selectedIndex].dates)
        const edata = dateRanges[selectedIndex].fromDate + '-' + dateRanges[selectedIndex].toDate;

        axios.get(`http://localhost:3001/getEmpTimeSheetdata?daterange=${edata}&name=${employeeName}`)
            .then((response) => {
                console.log('getdata response:', response.data)
                setTimeSheetRows(response.data);
             setUserHaveData(true);

                const day1HoursArr = response.data.map(ele => ele?.day1);
                let day1sum = day1HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay1Total(day1sum)

                const day2HoursArr = response.data.map(ele => ele?.day2);
                let day2sum = day2HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay2Total(day2sum)
               
                const day3HoursArr = response.data.map(ele => ele?.day3);
                let day3sum = day3HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay3Total(day3sum)
                const day4HoursArr = response.data.map(ele => ele?.day4);
                let day4sum = day4HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay4Total(day4sum)

                const day5HoursArr = response.data.map(ele => ele?.day5);
                let day5sum = day5HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay5Total(day5sum)
                const day6HoursArr = response.data.map(ele => ele?.day6);
                let day6sum = day6HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay6Total(day6sum)

                const day7HoursArr = response.data.map(ele => ele?.day7);
                let day7sum = day7HoursArr.reduce(function (accumulator, curValue) {

                    return accumulator + curValue

                }, 0)
                setDay7Total(day7sum)

            })
            .catch((error) => {
                console.log('error:', error)
            })
        // localStorage.setItem('dateRange', edata);
        // const empName = localStorage.getItem('employeeName');
        // let empData = localStorage.getItem(empName);
        // localStorage.setItem('selectedDateRangeIndex', selectedIndex);
        // empData = { [edata]: [] };
        // localStorage.setItem(empName, JSON.stringify(empData));
        const dateRangeData = timeSheetData[employeeName];
        if (dateRangeData && dateRangeData[edata]) {
            
            const rowsForSelectedRange = dateRangeData[edata];
            setTimeSheetRows(rowsForSelectedRange);
            // setEmployeeName(empName);
            setDay1Total(day1Total);
            setDay2Total(day2Total);
            setDay3Total(day3Total);
            setDay4Total(day4Total);
            setDay5Total(day5Total);
            setDay6Total(day6Total);
            setDay7Total(day7Total);

        } else {
            
            // No data found, initialize with empty rows
            setTimeSheetRows([{ projectCode: '', jobCode: '', day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, total: 0 }]);
            // setEmployeeName('');
            setDay1Total(0);
            setDay2Total(0);
            setDay3Total(0);
            setDay4Total(0);
            setDay5Total(0);
            setDay6Total(0);
            setDay7Total(0);
        }

    };


    const addTableRow = () => {
        const rows = timeSheetRows;
        rows.push({ projectCode: '', jobCode: '', day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0, total: 0 });
        setTimeSheetRows([...rows]);
        console.log(rows);
    }
    const deleteTableRow = (index) => {
        console.log('index:', index);

        const rows = [...timeSheetRows];
        rows.splice(index, 1);


        setDay1Total(rows.reduce((total, row) => total + parseInt(row['day1']), 0));
        setDay2Total(rows.reduce((total, row) => total + parseInt(row['day2']), 0));
        setDay3Total(rows.reduce((total, row) => total + parseInt(row['day3']), 0));
        setDay4Total(rows.reduce((total, row) => total + parseInt(row['day4']), 0));
        setDay5Total(rows.reduce((total, row) => total + parseInt(row['day5']), 0));
        setDay6Total(rows.reduce((total, row) => total + parseInt(row['day6']), 0));
        setDay7Total(rows.reduce((total, row) => total + parseInt(row['day7']), 0));



        setTimeSheetRows([...rows]);
    };


    const suggestionSelectedVal = (key, index, value, type) => {
        const rows = [...timeSheetRows];
        rows[index][key] = value;
        setTimeSheetRows([...rows]);
    }
    const handleProjectCode = (code, i, data) => {
        console.log('code', code, 'i', i, 'data', data);
        if (code === "projectCode") {
            setcurrentpojectCode(data);
        }
        if (code === "jobCode") {
            setcurrentjobCode(data);
        }

        timeSheetRows.map((obj, index) => {
            if (index === i) {
                obj[code] = data.value
                return obj;

            }

        }

        );

    }
    const changeTimeSheetData = async (key, index, value) => {
        console.log('key:', key, 'index:', index, 'value:', value);
        const rows = [...timeSheetRows];
        rows[index][key] = value;
        console.log('rows', rows[index][key])
        console.log('das:', document.getElementById(`auto_suggestion_${index}`));


        if (key === 'projects') {
            let suggestions = [];
            if (value.length > 0) {
                const regex = new RegExp(`^${value}`, 'i');
                suggestions = projectCodes.map(ele => ele.code).sort().filter(v => regex.test(v));
                setSuggestions(suggestions);
            }

            const root = document.getElementById(`auto_suggestion_${index}_srchList`);
            for await (const suggestion of suggestions) {
                const optionElement = `<option onClick={(e) => {${suggestionSelectedVal(key, index, suggestion, 'project')}}>${suggestion}</option>`;
                root.innerHTML += optionElement;
            }
        }
        if (key === 'projectCode') {
            getJobCodes(value);
        } else if (key !== 'projectCode' && key !== 'jobCode' && key !== 'total') {
            const inputText = rows[index][key];
            const parsedValue = parseInt(inputText);

            // Check if the parsed value is a valid number or NaN
            if (!isNaN(parsedValue)) {
                // The input is a valid number, set it to the parsed value
                rows[index][key] = parsedValue;
            } else {
                // The input is not a valid number, set it to zero
                rows[index][key] = 0;
            }
            rows[index]['total'] = Math.min(parseInt(rows[index]['day1']), 16) +
                Math.min(parseInt(rows[index]['day2']), 16) +
                Math.min(parseInt(rows[index]['day3']), 16) +
                Math.min(parseInt(rows[index]['day4']), 16) +
                Math.min(parseInt(rows[index]['day5']), 16) +
                Math.min(parseInt(rows[index]['day6']), 16) +
                Math.min(parseInt(rows[index]['day7']), 16);
        }

        // } else if (key !== 'projectCode' && key !== 'jobCode' && key !== 'total') {
        //     const oldValue = parseInt(rows[index][key]);
        //     console.log('oldValue', oldValue);

        //     console.log('total:', Math.min(parseInt(rows[index]['day1']), 16) + Math.min(parseInt(rows[index]['day2']), 16) + Math.min(parseInt(rows[index]['day3']), 16) + Math.min(parseInt(rows[index]['day4']), 16) + Math.min(parseInt(rows[index]['day5']), 16) + Math.min(parseInt(rows[index]['day6']), 16) + Math.min(parseInt(rows[index]['day7']), 16))
        //     rows[index]['total'] = Math.min(parseInt(rows[index]['day1']), 16) + Math.min(parseInt(rows[index]['day2']), 16) + Math.min(parseInt(rows[index]['day3']), 16) + Math.min(parseInt(rows[index]['day4']), 16) + Math.min(parseInt(rows[index]['day5']), 16) + Math.min(parseInt(rows[index]['day6']), 16) + Math.min(parseInt(rows[index]['day7']), 16);
        // }

        setDay1Total(rows.reduce((total, row) => total + parseInt(row['day1']), 0));
        setDay2Total(rows.reduce((total, row) => total + parseInt(row['day2']), 0));
        setDay3Total(rows.reduce((total, row) => total + parseInt(row['day3']), 0));
        setDay4Total(rows.reduce((total, row) => total + parseInt(row['day4']), 0));
        setDay5Total(rows.reduce((total, row) => total + parseInt(row['day5']), 0));
        setDay6Total(rows.reduce((total, row) => total + parseInt(row['day6']), 0));
        setDay7Total(rows.reduce((total, row) => total + parseInt(row['day7']), 0));

        setTimeSheetRows([...rows]);
        const empName = localStorage.getItem('employeeName');
        console.log(empName);
        const dateRange = localStorage.getItem('dateRange');
        const dateIndex = localStorage.getItem('selectedDateRangeIndex');
        if (empName && dateRange) {
            const empData = { [empName]: { [dateRange]: rows, dateIndex: dateIndex } };

            localStorage.setItem("empData", JSON.stringify(empData))
            const employee = {
                'name': empName,
                'dateRange': dateRange,
                'rows': rows

            }
            console.log('test', employee);
        }
    }

    const getJobCodes = (projectCode) => {
        console.log(jobData);
        const jobs = jobData.filter((job) => job.projectCode === projectCode);
        setJobCodes(jobs);

    }
    const handleCommentsChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue.length <= 250) {
            setComments(inputValue);
        } else {

            setComments(inputValue.slice(0, 250));
        }
    }

    const submitData = () => {
        const rows = [...timeSheetRows];
        const empName = localStorage.getItem('employeeName');
        console.log(empName);
        const dateRange = localStorage.getItem('dateRange');
        const dateIndex = localStorage.getItem('selectedDateRangeIndex');
        if (empName && dateRange) {
            const empData = { [empName]: { [dateRange]: rows, dateIndex: dateIndex } };
            setTimeSheetData((prevData) => ({
                ...prevData,
                ...empData,
            }));

            localStorage.setItem("empData", JSON.stringify(empData))
            const employee = {
                'name': empName,
                'dateRange': dateRange,
                'rows': rows

            }
            console.log('test', employee);
        }

        // const empData = localStorage.getItem("empData");
        // console.log(JSON.parse(empData));
        // let oldData = localStorage.getItem('EmployeesData') ? JSON.parse(localStorage.getItem('EmployeesData')) : [];
        // oldData.push(empData);
        // localStorage.setItem('EmployeesData', JSON.stringify(oldData));
        handleClickOpen();
        setTimeout(() => {
            handleClose();
        }, 2000);



        const headers = {
            'Content-Type': 'application/json'

        }
        const totalrows = day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total
        const data = { name: employeeName, daterange: dateRange, timesheetsRows: timeSheetRows, totalhours: totalrows }


         if(userHaveData){
            data.timesheetsRows = timeSheetRows.filter(ele=> ele.status != 'approve');
            axios.put('http://localhost:3001/modifyUserTimeSheet', data, {
                headers: headers
            })
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
         }else{
            axios.post('http://localhost:3001/addEmpTimeSheet', data, {
            headers: headers
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
         }
        
    }


    return (
        <>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={toastOpen} autoHideDuration={6000} onClose={handleToastClose} role="alertdialog" aria-labelledby="approve-toast-message">
                <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                    Applied successfully
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={rejectoast} autoHideDuration={6000} onClose={handleToastClose} role="alertdialog" aria-labelledby="reject-toast-message">
                <Alert onClose={handleToastClose} severity="warning" sx={{ width: '100%' }}>
                    Rejected successfully
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose} role="alertdialog" aria-labelledby="timesheet submit-toast-message">
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Timesheet Submitted Successfully
                </Alert>
            </Snackbar>
            <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleToastClose} role="alertdialog" aria-labelledby="timesheet submit-toast-message">
                <Alert onClose={handleToastClose} severity="info" sx={{ width: '100%' }}>
                    Timesheet is already existed
                </Alert>
            </Snackbar>
            <div class="container mt-4">
                <div class="employee-select">
                    {window.location.href.includes("manager") || window.location.href.includes("details") && <input type='text' value={employeeName} disabled aria-label="Employee Name" />}
                    {window.location.href.includes("employee") && <select className={window.location.href.includes("employee") || window.location.href.includes("details") ? 'employee-name' : 'employee-name disabled'} value={employeeName} onChange={(event) => setEmployeeName(event.target.value)} aria-label="Employee Name" tabIndex={0} role='presentation'>
                        <option>Employee Name</option>
                        <option>Bhargavi</option>
                        <option>Karthik</option>
                        <option>Ejaz</option>
                        <option>Rakesh</option>
                        <option>Jainu</option>
                    </select>}

                    <div className='col-md-7'>
                        {window.location.href.includes("manager") || window.location.href.includes("details") && <input type="text" value={selectedDateRange} disabled aria-label='select date range' role="textbox" />}
                        {window.location.href.includes("employee") && <div className='col-md-7'>
                            <div className="select-container">
                                <select className={window.location.href.includes("employee") || window.location.href.includes("details") ? 'employee-name' : 'employee-name disabled'} value={selectedDate} onChange={handleDropdownChange} aria-label="Select Date Range" tabIndex={0} >
                                    {dateRanges.map((range, index) => (
                                        <option key={index} value={index}>
                                            {range.fromDate} - {range.toDate}

                                        </option>
                                    ))}

                                </select>
                                <div className="calendar-icon">
                                    <CalendarMonthIcon />
                                </div>
                            </div>
                        </div>}
                        {/* <select className={role !== 'manager' ? 'employee-name' : 'employee-name disabled'} value={selectedDate} onChange={handleDropdownChange}>
                            {dateRanges.map((range, index) => (
                                <option key={index} value={index}>
                                    {range.fromDate} - {range.toDate}
                                </option>
                            ))}
                        </select> */}
                        

                    </div>
                    {window.location.href.includes("employee") && <button class="btn btn-primary" onClick={submitData} disabled={!(employeeName && timeSheetRows && timeSheetRows[0].projectCode.length > 0 && timeSheetRows[0].jobCode.length > 0) ? 'true' : ''} className='timesheet-button' aria-label="Submit Timesheet" role='button'>Submit</button>}
                    {window.location.href.includes("manager") || window.location.href.includes("details") && <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="success" onClick={(e) => BacktoManagerApprove()} aria-label="Approve Timesheet" role='button' tabIndex={0}>Approve</Button>
                        <Button variant="contained" color="error" onClick={(e) => BacktoManagerRejected()} aria-label="Reject Timesheet" role='button' tabIndex={0}>Reject</Button>
                    </Stack>}
                </div>

                <table class="table table-bordered text-center" cellspacing="0" aria-label='table'>
                    <thead className='table-secondary'>
                        <tr className='bg-primary'>
                            <th className='col-md-2' scope="col" aria-label='ProjectCode'>ProjectCode</th>
                            <th className='col-md-2' scope="col" aria-label='JobCode'>JobCode</th>
                            {selectedDates && selectedDates.length > 0 && selectedDates.map((date, index) => {
                                return <th key={index} scope="col" aria-label='select dates'>{date ?? ''}</th>
                            })}
                            {window.location.href.includes("employee") && <th className='col-md-1' scope="col" aria-label='Delete'>Delete</th>}
                            <th className='col-md-2' Style={'width:12px;'} scope="col" aria-label='Total'>Total</th>
                        </tr>
                    </thead>
                    <tbody id="table-body" role='row'>
                        {timeSheetRows && timeSheetRows.length > 0 && timeSheetRows.map((row, index) => {
                            return (
                                <tr>
                                    <td className='col-md-2'>
                                        <div className="container">
                                            <div className="row justify-content-md-center">
                                                <div className="col-md-12 input">
                                                    {window.location.href.includes("manager") || window.location.href.includes("details") && <input type="text" disabled value={row.projectCode} role="textbox" aria-label={`Project Code for Row ${index + 1}`} />}
                                                    {window.location.href.includes("employee") &&
                                                        <Select
                                                            defaultValue={currentpojectCode}
                                                            value={{ value: row.projectCode, label: row.projectCode }}
                                                            options={projectData}
                                                            onChange={(e) => handleProjectCode("projectCode", index, e)}
                                                            aria-label={`Select Project Code for Row ${index + 1}`}
                                                            tabIndex={0}
                                                            role='row'
                                                        />


                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='col-md-2'>
                                        <div className="container">
                                            <div className="row justify-content-md-center">
                                                <div className="col-md-12 input">
                                                    {window.location.href.includes("manager") || window.location.href.includes("details") && <input typ="text" value={row.jobCode} disabled style={{ height: "35px" }} role="textbox" aria-label={`Job Code for Row ${index + 1}`} />}
                                                    {window.location.href.includes("employee") &&
                                                        <Select
                                                            defaultValue={currentjobCode}
                                                            value={{ value: row.jobCode, label: row.jobCode }}

                                                            options={jobCodes}
                                                            onChange={(e) => handleProjectCode("jobCode", index, e)}
                                                            aria-label={`Select Job Code for Row ${index + 1}`}
                                                            tabIndex={0}
                                                            role='row'
                                                        />
                                                    }

                                                </div>

                                            </div>
                                        </div>
                                    </td>
                                    <td className="col-md-1"><input type="text" disabled={row.status === 'approve' || window.location.href.includes("details")} className="form-control text-center" value={row.day1} onChange={(event) => changeTimeSheetData('day1', index, Math.min(event.target.value, 16))} aria-label={`Day 1 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day2} onChange={(event) => changeTimeSheetData('day2', index, Math.min(event.target.value, 16))} aria-label={`Day 2 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day3} onChange={(event) => changeTimeSheetData('day3', index, Math.min(event.target.value, 16))} aria-label={`Day 3 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day4} onChange={(event) => changeTimeSheetData('day4', index, Math.min(event.target.value, 16))} aria-label={`Day 4 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day5} onChange={(event) => changeTimeSheetData('day5', index, Math.min(event.target.value, 16))} aria-label={`Day 5 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day6} onChange={(event) => changeTimeSheetData('day6', index, Math.min(event.target.value, 16))} aria-label={`Day 6 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>
                                    <td className="col-md-1"><input type="text" disabled={window.location.href.includes("details")} className="form-control text-center" value={row.day7} onChange={(event) => changeTimeSheetData('day7', index, Math.min(event.target.value, 16))} aria-label={`Day 7 for Row ${index + 1}`} role="textbox" tabIndex={0} /></td>

                                    {window.location.href.includes("employee") &&
                                        <td className="col-md-auto">
                                            <button class="btn" onClick={() => { deleteTableRow(index) }} aria-label={`Delete Row ${index + 1}`} role="button" tabIndex={0}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                                </svg></button></td>}

                                    <td className="col-md-1" aria-label={`Total for Row ${index + 1}`} tabIndex={0}>{row.total}</td>

                                </tr>
                            )
                        })}
                        <tr>
                            <td className='col-md-2'>{(window.location.href.includes("employee") && userHaveData) && <button class="btn btn-secondary" id="add-row" onClick={addTableRow} style={{ height: '40px', width: '150px' }} role="button" tabindex="0" aria-label="Add Row">Add Row</button>}</td>
                            <td className='col-md-2'></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day1"><p>{day1Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day2"><p>{day2Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day3"><p>{day3Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day4"><p>{day4Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day5"><p>{day5Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day6"><p>{day6Total}</p></td>
                            <td className='col-md-1 text-center' aria-label="Total for the day7"><p>{day7Total}</p></td>
                            {window.location.href.includes("employee") && <td className='col-md-1'></td>}
                            <td className='col-md-1' aria-label="Total for the week"><p>{day1Total + day2Total + day3Total + day4Total + day5Total + day6Total + day7Total}</p></td>
                        </tr>
                        <td> {window.location.href.includes("manager") || window.location.href.includes("details") && <input type="text" value={comments} onChange={handleCommentsChange} placeholder='comments' style={{ marginTop: '20px', width: '400%', height: '50px', border: '1px solid #D6EAF8' }} aria-label="Comments" tabIndex={0} />}</td>
                    </tbody>
                </table>

            </div>
        </>

    );
}


export default TimeSheetEntry;