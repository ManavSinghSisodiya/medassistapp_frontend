import { useEffect, useState } from "react";
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
import makeStyles from "@mui/styles/makeStyles";
import Heading from "../Component/Heading";
import Swal from "sweetalert2";
import doctorimage from "../assets/doctor.webp" 
import listdoctor from "../assets/listdoctor.png"
import { serverURL, getData, postData } from "../Services/FetchDjangoServices";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import { RestaurantOutlined } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "auto",
    height: "100vh",
    background: "#a5b1c2",
    display: "flex",
    alignItems:"center",
    justifyContent:"center"
    
    
  },
  box: {            
    width: 1000,
    height:'80%' ,
    background: "#fff",
    borderRadius: 10,
    padding: 15,
    // marginLeft:'10%',
    // marginTop:'2%'
    },
}));

export default function AddBlog(props) {
  
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [Title, setTitle] = useState("");
  const [Content, setContent] = useState("");
  const [Summary, setSummary] = useState("");
  const [image, setimage] = useState({ url: "", bytes: "" });
  const [formError, setFormError] = useState({});
 
  const handleReset = () => {
    setContent("");
    setTitle("");
    setCategoryId("");
    setSummary("");
    setimage({ url: "", bytes: "" });
  };

  const handleError = (error, label) => {
    setFormError((prev) => ({ ...prev, [label]: error }));

    console.log("Error", formError);
  };

  const isError = () => {
    var error = false;
    if (categoryId.length == 0) {
      handleError("Please Select Category Id", "categoryid");
      error = true;
    }
    if (Title.length == 0) {
      handleError("Title Should Not Be Blank", "doctorname");
      error = true;
    }

    if (Summary.length == 0) {
      handleError("Pls Input Address", "address");
      error = true;
    }

    if (image.bytes.length == 0) {
      handleError("Pls Upload Picture", "image");
      error = true;
    }
    if (Content.length == 0) {
      handleError("Pls Input Qualification", "qualification");
      error = true;
    }

    return error;
  };

  const fetchAllCategory = async () => {
    var data = await getData("categorylist");
    setCategory(data);
  };

  const fillCategory = () => {
    return category.map((item) => {
      return <MenuItem value={item.id}>{item.categoryname}</MenuItem>;
    });
  };
//   const show=()=>{
    
//     var x=new Array(4)
//     x.fill(0)
//     return x.map((item,index)=>{
      
//       return <TextField label={"Option"+index}/>
//     }) 
    
//   }


  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleImage = (event) => {
    setimage({
      url: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleSubmit = async () => {
    if (!isError()) {
      var formData = new FormData();
      formData.append("category", categoryId);
      formData.append("title", Title);
      formData.append("content", Content);
      formData.append("summary", Summary);
      formData.append("image", image.bytes);

      var result = await postData("blogsubmit", formData);
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: result.message,
          showConfirmButton: false,
          timer: 5000,
        });
      }
    }
  };
  var classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Heading
              color="#079992"
              icon={doctorimage}
              text="Blog Register"
              linkimage={listdoctor}
            //   link={'/doctordashboard'}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                error={formError.categoryid}
                onFocus={() => handleError("", "categoryid")}
                label="Category"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <MenuItem>-Select Category-</MenuItem>
                {fillCategory()}
              </Select>
              {formError.categoryid ? (
                <FormHelperText style={{ color: "red" }}>
                  {formError.categoryid}
                </FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <TextField
              error={formError.Title}
              onFocus={() => handleError("", "title")}
              onChange={(event) => setTitle(event.target.value)}
              label="Title"
              value={Title}
              helperText={formError.Title}
              fullWidth
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              error={formError.Content}
              onFocus={() => handleError("", "content")}
              onChange={(event) => setContent(event.target.value)}
              label="Content"
              value={Content}
              helperText={formError.Content}
              fullWidth
            />
          </Grid>

          
          <Grid item xs={12}>
            <TextField
              error={formError.Summary}
              onFocus={() => handleError("", "summary")}
              value={Summary}
              onChange={(event) => setSummary(event.target.value)}
              label="summary"
              fullWidth
              helperText={formError.Summary}
            />
          </Grid>       
          
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              alt=" Image"
              src={image.url}
              variant="rounded"
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" startIcon={<UploadIcon />} component="label">
              Upload Image
              <input
                error={formError.image}
                onFocus={() => handleError("", "image")}
                onChange={handleImage}
                type="file"
                hidden
                accept="image/*"
                multiple
              />
            </Button>
            {formError.image ? (
              <FormHelperText style={{ color: "red" }}>
                {formError.image}
              </FormHelperText>
            ) : (
              <></>
            )}
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} fullWidth variant="contained">
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={() => handleReset()} fullWidth variant="contained">
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
 
    </div>
  );
}
