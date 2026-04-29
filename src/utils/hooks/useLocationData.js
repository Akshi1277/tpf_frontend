import { useDispatch, useSelector } from 'react-redux';
import { setStates, setCities, setProfessions, setLoadingStates, setLoadingCities } from '../slices/locationSlice';

const API_BASE = 'https://countriesnow.space/api/v0.1/countries';

// Static fallback for Indian States in case API fails
const FALLBACK_STATES = [
    { name: "Andaman and Nicobar Islands", iso2: "AN" },
    { name: "Andhra Pradesh", iso2: "AP" },
    { name: "Arunachal Pradesh", iso2: "AR" },
    { name: "Assam", iso2: "AS" },
    { name: "Bihar", iso2: "BR" },
    { name: "Chandigarh", iso2: "CH" },
    { name: "Chhattisgarh", iso2: "CT" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", iso2: "DN" },
    { name: "Delhi", iso2: "DL" },
    { name: "Goa", iso2: "GA" },
    { name: "Gujarat", iso2: "GJ" },
    { name: "Haryana", iso2: "HR" },
    { name: "Himachal Pradesh", iso2: "HP" },
    { name: "Jammu and Kashmir", iso2: "JK" },
    { name: "Jharkhand", iso2: "JH" },
    { name: "Karnataka", iso2: "KA" },
    { name: "Kerala", iso2: "KL" },
    { name: "Ladakh", iso2: "LA" },
    { name: "Lakshadweep", iso2: "LD" },
    { name: "Madhya Pradesh", iso2: "MP" },
    { name: "Maharashtra", iso2: "MH" },
    { name: "Manipur", iso2: "MN" },
    { name: "Meghalaya", iso2: "ML" },
    { name: "Mizoram", iso2: "MZ" },
    { name: "Nagaland", iso2: "NL" },
    { name: "Odisha", iso2: "OR" },
    { name: "Puducherry", iso2: "PY" },
    { name: "Punjab", iso2: "PB" },
    { name: "Rajasthan", iso2: "RJ" },
    { name: "Sikkim", iso2: "SK" },
    { name: "Tamil Nadu", iso2: "TN" },
    { name: "Telangana", iso2: "TG" },
    { name: "Tripura", iso2: "TR" },
    { name: "Uttar Pradesh", iso2: "UP" },
    { name: "Uttarakhand", iso2: "UT" },
    { name: "West Bengal", iso2: "WB" }
];

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
            const response = await fetch(`${API_BASE}/states`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: "India" })
            });
            const result = await response.json();
            
            if (result.error) throw new Error(result.msg);

            const data = result.data.states.map(s => ({
                name: s.name,
                iso2: s.state_code || s.name
            }));

            dispatch(setStates(data));
            return data;
        } catch (error) {
            console.error('Error fetching states:', error);
            // Use fallback if API fails
            dispatch(setStates(FALLBACK_STATES));
            return FALLBACK_STATES;
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
            // Find state name from states array (using either iso2 or name as stateCode)
            const state = states.find(s => s.iso2 === stateCode || s.name === stateCode);
            const stateName = state ? state.name : stateCode;

            const response = await fetch(`${API_BASE}/state/cities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    country: "India",
                    state: stateName
                })
            });
            const result = await response.json();

            if (result.error) throw new Error(result.msg);

            const data = result.data.map(cityName => ({ name: cityName }));
            
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

