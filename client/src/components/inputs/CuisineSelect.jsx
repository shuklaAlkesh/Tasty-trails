import { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../constants/config';

const CuisineSelect = ({ value, onChange }) => {
    const [getAll, setGetAll] = useState([]);

    useEffect(() => {
        const fetchCuisines = async () => {
            try {
                const { data } = await axios.get(`${server}/cuisines`); // Adjusted endpoint
                // Format the data for react-select
                const formattedData = data.map(cuisine => ({
                    value: cuisine._id,
                    label: cuisine.cuisineName,
                }));
                setGetAll(formattedData);
            } catch (err) {
                toast.error(err?.response?.data?.message || "Something went wrong");
            }
        };

        fetchCuisines();
    }, []);

    return (
        <div>
            <Select
                placeholder="Select cuisine"
                isClearable
                options={getAll}
                value={value}
                onChange={onChange} // No need to wrap the onChange function
                classNamePrefix="react-select" // Prefix for custom classes
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 6,
                    colors: {
                        ...theme.colors,
                        primary: 'black',
                        primary25: '#ffe4e6',
                    },
                })}
                classNames={{
                    control: () => 'p-1 border-2',
                    input: () => 'text-lg',
                    option: () => 'text-lg'
                }}
            />
        </div>
    );
};

export default CuisineSelect;
