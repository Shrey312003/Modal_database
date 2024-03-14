import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import * as yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Input} from '@mui/material';

const regex = "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)";

const baseURL = "https://my-json-server.typicode.com/Shrey312003/Modal_database/posts";
//styling
const CreateStyles = () => {
    return {
        formContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            margin: 'auto',
            maxWidth: '400px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '5px',
            backgroundColor: '#ffffff',
            marginTop: '30px'
        },
        inputField: {
            marginBottom: '8px',
            width: '100%',
        },
        loginButton: {
            padding: '10px 0',
            marginBottom: '10px',
        },
        link: {
            textDecoration: 'none',
            margin: '5px 0',
        },
        checkboxLabel: {
            alignSelf: 'flex-start',
            margin: '0 0 20px 0',
        },   
    }
}

//Validation schema using yup
export const create_schema = yup.object().shape({
    title: yup.string().required("Required"),
    body: yup.string().required("Required"),
    author: yup.string().required("Required"),
    type : yup.string().required("Required"),
    link: yup.string().matches(regex,{message:"Give a valid link"}).required("Required"),
    pic: yup.string().matches(regex,{message:"Give a valid image link"}).required("Required")
});



//Form to add new modals to site. Currently Post request works but no new modals are added as JSON Placeholder dont support
const Create = () => {
    
    const navigate = useNavigate();

    const onSubmit = async (values,actions) => {
        console.log("values");
        
        try{
            console.log(values);
            const response = await axios.post(baseURL,values);
            
            console.log(response);
            console.log("Modal Created");
            navigate("/")
            actions.resetForm();
            
        }catch(error){
            console.log(error);
        }
    }
    
    const styles = CreateStyles();

    //formik initilizations for form control 
    const {
        values,
        handleBlur,
        handleChange,
        errors,
        touched,
        isSubmitting,
        handleSubmit,
    } = useFormik({
        initialValues: {
            title: '',
            body: '',
            author: '',
            type: '',
            link:'',
            pic: '',
            likes: 0,
            views: 0
        },
        validationSchema: create_schema,
        onSubmit
    });
    

    return ( 
        <Box sx={styles.formContainer}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Share your modal
            </Typography>
            <form id="form_id" onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Title"
                    variant="outlined"
                    name="title"
                    type="text"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    error={errors.title && touched.title}
                />
                <Typography variant="body2" sx={{ color: 'red',marginBottom:"5px" }}>
                    {touched.title && errors.title}
                </Typography>

                <TextField
                    id="outlined-textarea"
                    label="Body"
                    placeholder="Placeholder"
                    variant="outlined"
                    name="body"
                    type="text"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.body}
                    error={errors.body && touched.body}
                    multiline
                />
                <Typography variant="body2" sx={{ color: 'red',marginBottom:"5px" }}>
                    {touched.body && errors.body}
                </Typography>

                <TextField
                    label="author"
                    type="text"
                    variant="outlined"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={styles.inputField}
                    value={values.author}
                    error={errors.author && touched.author}
                />
                <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {touched.author && errors.author}
                </Typography>

                <TextField
                    label="type"
                    type="text"
                    variant="outlined"
                    name="type"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={styles.inputField}
                    value={values.type}
                    error={errors.type && touched.type}
                />
                <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {touched.type && errors.type}
                </Typography>

                <TextField
                    label="link"
                    type="text"
                    variant="outlined"
                    name="link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={styles.inputField}
                    value={values.link}
                    error={errors.link && touched.link}
                />
                <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {touched.link && errors.link}
                </Typography>

                <TextField
                    label="pic"
                    type="text"
                    variant="outlined"
                    name="pic"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={styles.inputField}
                    value={values.pic}
                    error={errors.pic && touched.pic}
                />
                <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {touched.pic && errors.pic}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={styles.loginButton}
                    disabled={isSubmitting}
                    type="submit" // This should be 'submit' to trigger Formik's handleSubmit
                >
                    Create
                </Button>
                
            </form>
        </Box>
    );
}
 
export default Create ;