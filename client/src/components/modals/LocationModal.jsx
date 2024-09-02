import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const LocationModal = ({ isOpen, setIsOpen }) => {

    const navigate = useNavigate();

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [radius, setRadius] = useState("");

    const onSubmit = async() => {
        // Handle form submission

        // console.log(data);

        if(latitude && longitude && radius){
            navigate(`/filter-result?countryId=${""}&cuisineId=${""}&averageCostForTwo=${""}&name=${""}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`)
            setIsOpen(false);
        }
        
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <input
                    type="number"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="Latitude"
                    className="p-2 border-2 rounded-lg text-lg"
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="Longitude"
                    className="p-2 border-2 rounded-lg text-lg"
                />
            </div>
            <div className="flex flex-col">
                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Radius"
                    className="p-2 border-2 rounded-lg text-lg"
                />
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            title="Search Restaurants"
            actionLabel="Search By Location"
            setIsOpen={setIsOpen}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default LocationModal;
