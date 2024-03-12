import { useFormik } from 'formik';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import * as yup from "yup"

const password_rules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;


export const login_schema = yup.object().shape({
    title: yup.string().required("Required"),
    body: yup.string().required("Required"),
    author: yup.string().required("Required"),
    password: yup.string().matches(password_rules,{message:"Write a valid password"}).required("Required"),
});

const Create = () => {
    
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
            email: '',
            password: '',
        },
        validationSchema: login_schema,
        onSubmit,
    });

    return ( 
        <Box sx={styles.formContainer}>
            <Typography variant="h5" sx={{ marginBottom: '20px' }}>
                Share your modal
            </Typography>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <TextField
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="email"
                    sx={styles.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
                />
                <Typography variant="body2" sx={{ color: 'red',marginBottom:"5px" }}>
                    {touched.email && errors.email}
                </Typography>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={styles.inputField}
                    value={values.password}
                    error={errors.password && touched.password}
                />
                <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {touched.password && errors.password}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={styles.loginButton}
                    disabled={isSubmitting}
                    type="submit"
                >
                    Log in
                </Button>
                {/* <Typography variant="body2" sx={{ color: 'red', marginTop: "0px" , paddingTop:"0px", marginBottom:"5px"}}>
                    {error && error.response.data.detail}
                </Typography> */}

                <Link href="/signup" sx={{ display:"flex" ,width:"100%", textAlign:"center"}}>
                    Don't have an account ?
                </Link>
            </form>
        </Box>
    );
}
 
export default Create ;