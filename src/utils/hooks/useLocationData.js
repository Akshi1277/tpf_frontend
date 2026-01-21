import { useDispatch, useSelector } from 'react-redux';
import { setStates, setCities, setProfessions, setLoadingStates, setLoadingCities } from '../slices/locationSlice';

const API_KEY = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
const API_BASE = 'https://api.countrystatecity.in/v1';

export const useLocationData = () => {
    const dispatch = useDispatch();
    const { states, cities, professions, loadingStates, loadingCities } = useSelector(
        (state) => state.location
    );

    const fetchStates = async () => {
        // Return cached data if available
        if (states.length > 0) {
            return states;
        }

        dispatch(setLoadingStates(true));
        try {
            const response = await fetch(`${API_BASE}/countries/IN/states`, {
                headers: { 'X-CSCAPI-KEY': API_KEY }
            });
            const data = await response.json();
            dispatch(setStates(data));
            return data;
        } catch (error) {
            console.error('Error fetching states:', error);
            return [];
        } finally {
            dispatch(setLoadingStates(false));
        }
    };

    const fetchCities = async (stateCode) => {
        // Return cached data if available
        if (cities[stateCode]) {
            return cities[stateCode];
        }

        dispatch(setLoadingCities(true));
        try {
            const response = await fetch(`${API_BASE}/countries/IN/states/${stateCode}/cities`, {
                headers: { 'X-CSCAPI-KEY': API_KEY }
            });
            const data = await response.json();
            dispatch(setCities({ stateCode, cities: data }));
            return data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            return [];
        } finally {
            dispatch(setLoadingCities(false));
        }
    };

    const fetchProfessions = () => {
        // Return cached data if available
        if (professions.length > 0) {
            return professions;
        }

        const commonProfessions = [
            "Accountant", "Actor/Actress", "Architect", "Artist", "Banker",
            "Business Owner", "Chef", "Civil Engineer", "Consultant", "Data Analyst",
            "Data Scientist", "Designer", "Developer", "Doctor", "Driver",
            "Electrician", "Engineer", "Entrepreneur", "Farmer", "Fashion Designer",
            "Financial Analyst", "Freelancer", "Government Employee", "Graphic Designer",
            "HR Manager", "IT Professional", "Journalist", "Lawyer", "Manager",
            "Marketing Manager", "Mechanic", "Musician", "Nurse", "Pharmacist",
            "Photographer", "Pilot", "Plumber", "Professor", "Project Manager",
            "Real Estate Agent", "Researcher", "Sales Representative", "Scientist",
            "Self Employed", "Software Engineer", "Student", "Teacher", "Writer", "Other"
        ];

        const sorted = commonProfessions.filter(p => p !== "Other").sort();
        sorted.push("Other");

        dispatch(setProfessions(sorted));
        return sorted;
    };

    return {
        states,
        cities,
        professions,
        loadingStates,
        loadingCities,
        fetchStates,
        fetchCities,
        fetchProfessions,
    };
};
