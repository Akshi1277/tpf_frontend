import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    states: [],
    cities: {},
    professions: [],
    loadingStates: false,
    loadingCities: false,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setStates: (state, action) => {
            state.states = action.payload;
        },
        setCities: (state, action) => {
            const { stateCode, cities } = action.payload;
            state.cities[stateCode] = cities;
        },
        setProfessions: (state, action) => {
            state.professions = action.payload;
        },
        setLoadingStates: (state, action) => {
            state.loadingStates = action.payload;
        },
        setLoadingCities: (state, action) => {
            state.loadingCities = action.payload;
        },
    },
});

export const {
    setStates,
    setCities,
    setProfessions,
    setLoadingStates,
    setLoadingCities,
} = locationSlice.actions;

export default locationSlice.reducer;
