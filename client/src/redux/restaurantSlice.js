import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    restaurants: [],
    loading: false,
    error: null,
    cuisine: ""
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurants: (state, action) => {
            state.restaurants = action.payload;
        },
        setCuisine: (state, action) => {
            state.cuisine = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setRestaurants,
    setLoading,
    setCuisine,
    setError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;
