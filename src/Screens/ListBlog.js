import {useState,useEffect} from "react"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import {
  Avatar,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
// import MaterialTable from "material-table";
import MaterialTable from "@material-table/core";

import makeStyles from "@mui/styles/makeStyles";
 

import adddoctor from '../assets/adddoctor.png'
import doctorimage from '../assets/doctor.webp'
import Heading from "../Component/Heading";
import Swal from "sweetalert2";

import { serverURL, getData, postData,imageURL } from "../Services/FetchDjangoServices";
const useStyles = makeStyles((theme) => ({
  
  container: {
    width: "100%",
    height: "100%",
    background: "#a5b1c2",
    display: "flex",
  },
  box: {
    width: 1000,
    height:'80%' ,
    background: "#fff",
    borderRadius: 10,
    padding: 15,
    marginLeft:'10%',
    marginTop:'2%'
  },
}));

export default function ListBlog()
    {
        var classes=useStyles()
        const [blogList,setBlogList]=useState([])   
        





        /**********************/

        const fetchAllBlog=async()=>{
            var result=await getData('bloglist')
            setBlogList(result)
        }  

        useEffect(function(){
            fetchAllBlog()
        },[])  



        function showBloglist() {
            return (
            <Grid container spacing={2}> 
            <Grid item xs={12}>
            <Heading
                    color="#079992"
                    icon={doctorimage}
                    text="BLOG"
                    linkimage={adddoctor}
                    link={'/home/user'}
                    />
            </Grid>  
            <Grid item xs={12}>
            <MaterialTable
                title=''
                data={blogList}
                columns={[
                  { title: 'category', render:(rowData)=><div>{rowData.category.categoryname}</div> },
                { title: 'image', render:(rowData)=><div><Avatar src={`${imageURL}${rowData.image}`}  style={{width:150,height:150}} /></div> },
                { title: 'title',render:(rowData)=><div><div>{rowData.id}/{rowData.title}</div></div> },
                { title: 'content', render:(rowData)=><div><div>{rowData.content}</div></div>},
                // { title: 'summary', render:(rowData)=><div><div>{rowData.summary}</div></div> }
                
                ]}
                options={{
                  // filtering: true,
                  paging:true,
                pageSize:5,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,10]
                }}

                detailPanel={(rowData => {
                  return (
                    <body>
                      A blog (a truncation of "weblog")[1] is an informational website consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page. In the 2000s, blogs were often the work of a single individual, occasionally of a small group, and often covered a single subject or topic. In the 2010s, "multi-author blogs" (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups, and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other "microblogging" systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to maintain or add content to a blog.

The emergence and growth of blogs in the late 1990s coincided with the advent of web publishing tools that facilitated the posting of content by non-technical users who did not have much experience with HTML or computer programming. Previously, knowledge of such technologies as HTML and File Transfer Protocol had been required to publish content on the Web, and early Web users therefore tended to be hackers and computer enthusiasts. As of the 2010s, the majority are interactive Web 2.0 websites, allowing visitors to leave online comments, and it is this interactivity that distinguishes them from other static websites.[2] In that sense, blogging can be seen as a form of social networking service. Indeed, bloggers not only produce content to post on their blogs but also often build social relations with their readers and other bloggers.[3] Blog owners or authors often moderate and filter online comments to remove hate speech or other offensive content. There are also high-readership blogs which do not allow comments.
                    </body>
                  )
                })}
                
                onRowClick={(event, rowData, togglePanel) => togglePanel()}
                // actions={[
                // {
                //   icon: 'edit',
                //   tooltip: 'Edit User',
                //   onClick: (event, rowData) =>handleEdit(rowData)
                // },
                //   {
                //     icon: 'delete',
                //     tooltip: 'Delete User',
                //     onClick: (event, rowData) =>handleDelete(rowData)
                //   }
                // ]}
            />
            </Grid>
            </Grid>
            )
        }

        return(<div className={classes.container}>
            {/* <div className={classes.box}> */}
            {showBloglist()}
        {/* </div>   */}
        </div>)
    }