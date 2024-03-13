import React, { useEffect, useState } from 'react';
import { Box, Grid, CircularProgress, Select, MenuItem, FormControl, InputLabel, Pagination } from "@mui/material";
import useFetch from "../hooks/useFetch";
import MediaCard from "./model_cards";
import { useDispatch } from "react-redux";
import dataSlice from "../store/dataSlice";

const ModelList = ({data,loading,error}) => {
    // const [data, setData] = useState(null);
    const [category, setCategory] = useState('');
    // const { data: data1, loading, error } = useFetch("https://my-json-server.typicode.com/Shrey312003/Modal_database/posts");
    // const dispatch = useDispatch();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // useEffect(() => {
    //     if (data1) {
    //         setData(data1);
    //         dispatch(dataSlice.actions.setData({ data: data1 }));
    //     }
    // }, [data1, dispatch]);

    const categories = data ? Array.from(new Set(data.map(item => item.type))) : [];

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
        setCurrentPage(1); // Reset to first page upon changing categories
    };

    // Filter data based on the selected category
    const filteredData = category === '' ? data : data?.filter(modal => modal.type === category);

    // Calculate data for the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData?.slice(indexOfFirstItem, indexOfLastItem);

    // Change page handler
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <Box sx={{ marginTop: "10px", margin: "3%" }}>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </div>
            )}
            {error && <div>Error: {error.message}</div>}
            {!loading && data && (
                <>
                    <FormControl sx={{ width: "40%", marginBottom: "5%" }}>
                        <InputLabel id="category-selector-label">Category</InputLabel>
                        <Select
                            labelId="category-selector-label"
                            id="category-selector"
                            value={category}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Grid container spacing={4}>
                        {currentData && currentData.map((modal) => (
                            <Grid item md={6} xs={12} key={modal.id}>
                                <MediaCard card_data={modal} />
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                        <Pagination
                            count={Math.ceil(filteredData?.length / itemsPerPage)}
                            page={currentPage}
                            onChange={handleChangePage}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}

export default ModelList;
