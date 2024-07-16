
import {IconButton, AppBar,Box,Toolbar,Paper,Grid } from "@mui/material";
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DoctorInterface from "./DoctorInterface";
import DisplayAllDoctor from "./DisplayAllDoctors";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import {Routes,Route,useNavigate} from "react-router-dom"
import adminimage from "../assets/admin.jpeg"
import ListofDoctors from "./ListofDoctors";
import UserRegistration from "./UserRegistration"
import PatientList from "./PatientList";
export default function AdminDashboard()
{
var navigate=useNavigate()
 function menuList() {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/doctorinterface')}>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Add Doctor" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/admindashboard/UserRegistration')}>
              <ListItemIcon>
                <PersonSearchIcon/>
              </ListItemIcon>
              <ListItemText primary="Add Patient" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/admindashboard/displayalldoctor')}>
              <ListItemIcon>
                <PersonSearchIcon/>
              </ListItemIcon>
              <ListItemText primary="Manage Doctors" />
            </ListItemButton>
          </ListItem>
          {/* <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/admindashboard/patientlist')}>
              <ListItemIcon>
                <PersonSearchIcon/>
              </ListItemIcon>
              <ListItemText primary="patients" />
            </ListItemButton>
          </ListItem> */}
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/adminlogin')}>
              <ListItemText primary="Sign out" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/main')}>
              <ListItemText primary="Go to Dashboard" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}



 const appBar=()=>{
  return(  
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
       <Toolbar>
        
         <div style={{fontWeight:'bold',fontSize:26}}>Medassist</div>
         <IconButton  onClick={()=>navigate('/main')} style={{color:'#fff',marginLeft:'auto'}}>
        <LogoutRounded />
      </IconButton>
         </Toolbar>   
      </AppBar>
    </Box>
  )
 }   
 const sideBar=()=>{
  return(
  <Grid container spacing={1}>
    <Grid item xs={2}>
     <Paper elevation={3} style={{width:200,margin:10,padding:10,display:'flex',flexDirection:'column',borderRadius:20,alignItems:'center'}}>
       <div>
        <img src={adminimage} style={{width:80,height:80,borderRadius:40}}/>
       </div>
       <div style={{fontWeight:14,fontWeight:'bold'}}>Thomas Cook</div>
       <div style={{fontWeight:10,fontWeight:300}}>+919301123085</div> 
       <div style={{fontWeight:10,fontWeight:300}}>thomascook@gmail.com</div>
       <div>
        {menuList()}
        </div> 




  </Paper>
  </Grid>

  <Grid item xs={10}>
 
  <Routes>
  <Route element={<DoctorInterface/>} path="/doctorinterface"/>
  <Route element={<UserRegistration/>} path="/UserRegistration"/>
  <Route element={<DisplayAllDoctor/>} path="/displayalldoctor"/>
  <Route element={<PatientList/>} path="/patientlist"/>
  
  </Routes>
  </Grid>
  </Grid>

  )

 }
  return(<div>
  {appBar()}
  {sideBar()}

  </div>)

}