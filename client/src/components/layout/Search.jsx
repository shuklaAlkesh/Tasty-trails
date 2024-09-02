import { useState } from 'react';
import LocationModal from '../modals/LocationModal';
import Button from '../shared/Button';
import { FaLocationDot } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import ImageModal from '../modals/ImageModal';

const Search = () => {
    const [openFilterModal, setOpenFilterModal] = useState(false);
    const [openImageModal, setOpenImageModal] = useState(false);

    return (
        <>
            <div className='min-w-96 flex flex-col lg:flex-row items-center gap-5 pl-5 pr-5'>
                <Button
                    outline
                    label="Location"
                    icon={FaLocationDot}
                    onClick={() => setOpenFilterModal(true)}
                />
                <Button
                    label="Image"
                    icon={FaImage}
                    onClick={() => setOpenImageModal(true)}
                />
            </div>
            {openFilterModal && (
                <LocationModal 
                    isOpen={openFilterModal} 
                    setIsOpen={setOpenFilterModal} 
                />
            )}
            {openImageModal && (
                <ImageModal 
                    onClose={() => setOpenImageModal(false)} 
                />
            )}
        </>
    );
}

export default Search;
