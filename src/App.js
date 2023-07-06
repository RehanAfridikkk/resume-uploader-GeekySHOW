import{ Grid , TextField, Typography,FormControlLabel,Checkbox,Button,Box ,Alert, InputLabel, MenuItem, Select, FormControl, FormLabel, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead ,TableRow,Paper, Avatar, Radio, FormGroup }
from '@mui/material';
// import { LocalizationProvider} from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';e
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { styled } from '@mui/material/styles';
import { useState } from 'react';


function App() {

  //style for upload button
  const Input = styled('input')({
    display: 'none',
  });


  //states
  const [userList, setUserList] = useState([]);

  const [name, setName]=useState()
  const [email, setEmail]=useState()
  const [gender, setGender]=useState()
  const [dob, setDob]=useState(null)
  const [st, setSt]=useState('')
  const [pjl, setPjl]=useState([])
  const [pimage, setPimage]=useState('')
  const [rdoc, setRdoc]=useState('')
  const [error, setError]=useState({
    status: false,
    msg: '',
    type: ""
  })
  //multicheckbox 
  const getPjl= (e) => {
      //destructing
      const{ value, checked} =e.target
      console.log(`${value} is ${checked}`)

      if(checked){        //user check the box
        setPjl([...pjl,value])
      } else {            //user uncheck thebox
        setPjl(pjl.filter((e) => e !== value))
      }
  }

  //clear form
  const resetForm =() =>{
    setName('')
    setEmail('')
    setDob('')
    setSt('')
    setGender('')
    setPjl([])
    setPimage('')
    setRdoc('')
    document.getElementById('resume-form').reset()
  }
  const formData = []

  //handle form submission
  // const handleSubmit =(e) =>{
  //   e.preventDefault();
  //   // const data = new FormData()
  //   // data.append('name',name)
  //   // data.append('email',email)
  //   // data.append('dob',dob)
  //   // data.append('st',st)
  //   // data.append('gender',gender)
  //   // data.append('pjl',pjl)
  //   // data.append('pimage',pimage)
  //   // data.append('rdoc',rdoc)
  //   // formData.push(data)
  //   // console.log(data)
  //   const data ={
  //     name,
  //     email,
  //     dob,
  //     st,
  //     gender,
  //     pjl
  //   }
  //   console.log(data,'data')
  //   if (name && email){
  //     // console.log(data.get('name'))
  //     // console.log(data.get('email'))
  //     // console.log(data.get('dob'))
  //     // console.log(data.get('st'))
  //     // console.log(data.get('pjl'))
  //     // console.log(data.get('gender'))
  //     // console.log(data.get('pimage'))
  //     // console.log(data.get('rdoc'))
  //     setError({status: true, msg: "Resume Uploaded Successfully", type: 'success'});
  //         const newUser = {
  //         name: name,
  //         dob: dob,
  //         st: st,
  //         gender: gender,
  //         pjl: pjl,
  //       };
      
  //       setUserList([...userList, newUser]);
      
  //       resetForm();
  //     } else {
  //       setError({ status: true, msg: "ALL Fields are Required", type: 'error' });
  //     }

  // console.log(formData, "user data")
  
  //   }
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      name,
      email,
      dob: dob ? dob.format("DD/MM/YYYY") : "", // Format the dob value before storing it
      st,
      gender,
      pjl,
    };
  
    if (name && email) {
      setError({ status: true, msg: "Resume Uploaded Successfully", type: "success" });
  
      const newUser = {
        name: name,
        dob: data.dob, // Use the formatted dob value
        st: st,
        gender: gender,
        pjl: pjl,
      };
  
      setUserList([...userList, newUser]);
  
      resetForm();
    } else {
      setError({ status: true, msg: "ALL Fields are Required", type: "error" });
    }
  
    console.log(formData, "user data");
  };
  
  return (
    <>
    <Box display="flex" justifyContent="center" sx={{backgroundColor: 'error.light', padding: 2}}>
      
      <Typography variant='h2' component="div" sx={{fontWeight:'bold', color:'white'}}>Resume Uploder</Typography>
    </Box>
    <Grid container justifyContent='center'>
      
      <Grid item xs={5}>
        <Box component='form' sx={{ p:3}} noValidate id="resume-form" 
        onSubmit={handleSubmit}>
          <TextField id="name" name="name" required fullWidth margin='normal' label='Name' onChange={(e)=> setName(e.target.value)} /> 
          <TextField id="email" name="email" required fullWidth margin='normal' label='email' onChange={(e)=> setEmail(e.target.value)} />

          <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="date of birth" value={dob} onChange={(newValue) => {setDob(newValue)}} 
              renderInput={(params) => <TextField {...params}/>}/>
            </LocalizationProvider>

          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel id="state-select-label">State</InputLabel>
            <Select labelId="state-select-label" id='state-select' value={st} label='st' onChange={(e)=>{setSt(e.target.value)}}>
              <MenuItem value="islamabad">islamabad</MenuItem>
              <MenuItem value="lahore">lahore</MenuItem>
              <MenuItem value="karachi">karachi</MenuItem>
            </Select>
          </FormControl >
          <FormControl fullWidth margin="normal">
            <FormLabel id="gender-radio">Gender</FormLabel>
            <RadioGroup row name='gender'>
              <FormControlLabel value="male" control={<Radio />} label='Male' onChange={(e)=> setGender(e.target.value)} />
              <FormControlLabel value="female" control={<Radio />} label='feMale'onChange={(e)=> setGender(e.target.value)}/>
              <FormControlLabel value="other" control={<Radio />} label='other' onChange={(e)=> setGender(e.target.value)}/>
            </RadioGroup>

          </FormControl>
          <FormControl component='fieldset' fullWidth margin='normal'>
          <FormLabel component='legend'>preffered job location:</FormLabel>
            <FormGroup row>
              <FormControlLabel control={<Checkbox/>} label="punjab" value="punjab" onChange={(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox/>} label="KPK" value="KPK" onChange={(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox/>} label="Balochistan" value="Balochistan" onChange={(e) => getPjl(e)}/>
              <FormControlLabel control={<Checkbox/>} label="Sindth" value="Sindth" onChange={(e) => getPjl(e)}/>
            </FormGroup>

          </FormControl>

          {/* <Stack direction="row" alignItems="center" spacing={4} >
            <label htmlFor='profile-photo'>
              <Input accept='image/*' id='profile-photo' type='file' onChange={(e) => {setPimage(e.target.files[0])}} />
              <Button variant='contained' component='span'>upload photo </Button>
            </label>
            <label htmlFor="resume-file">
              <Input accept='doc/*' id="resume-file" type="file" onChange={(e) => {setRdoc(e.target.files[0])}} />
              <Button variant='contained' component='span'>upload file</Button>

            </label>
          </Stack> */}
            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5}} color="error">Submit</Button>
              {error.status ? <Alert serverity={error.type}>{error.msg}</Alert>: ''}
        </Box>


      </Grid>
      
      <Grid item xs={7}>
        <Box display="flex"       justifyContent="center" sx={{backgroundColor: 'info.light', padding: 1}}>
      
          <Typography variant='h5' component="div" sx={{fontWeight:'bold', color:'white'}}  >list of candidates</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{minWidth:650}} aria-label="simpletable">
            <TableHead>
              <TableRow>
                <TableCell align="center" >name</TableCell>
                <TableCell align="center">DOB</TableCell>
                <TableCell align="center">State</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Location</TableCell>
                <TableCell align="center">Avatar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': {border: 0}}}>
                    <TableCell align="center">{user.name}</TableCell>
                    <TableCell align="center">{user.dob}</TableCell>
                    <TableCell align="center">{user.st}</TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">{user.pjl.join(', ')}</TableCell>
                    <TableCell align="center"><Avatar src='#'/></TableCell>
                </TableRow>
                   ))}
            </TableBody>

          </Table>
        </TableContainer>

      </Grid>
    </Grid>
    </>
  );
}

export default App;
