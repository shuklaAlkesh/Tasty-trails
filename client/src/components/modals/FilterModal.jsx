import { useState } from "react";

import { useNavigate } from "react-router-dom";
import CountrySelect from "../inputs/CountrySelect";
import CuisineSelect from "../inputs/CuisineSelect";
import Modal from "./Modal";

const FilterModal = ({ isOpen, setIsOpen }) => {

    const navigate = useNavigate();

    const [location, setLocation] = useState(null);
    const [cuisine, setCuisine] = useState(null);
    const [priceRange, setPriceRange] = useState("");

    const onSubmit = async() => {
        // Handle form submission

        // console.log(data);

        navigate(`/filter-result?countryId=${location ? location?.value : ""}&cuisineId=${cuisine ? cuisine?.value : ""}&averageCostForTwo=${priceRange}&name=${""}&latitude=${""}&longitude=${""}&radius=${""}`)
        
        setIsOpen(false);
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
            />
            
            <div className="flex flex-col">
                <input
                    type="number"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    placeholder="Enter average cost for two people"
                    className="p-2 border-2 rounded-lg text-lg"
                />
            </div>
            
            <CuisineSelect
                value={cuisine}
                onChange={(value) => setCuisine(value)}
            />
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            title="Filter Restaurants"
            actionLabel="Apply Filters"
            setIsOpen={setIsOpen}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default FilterModal;
