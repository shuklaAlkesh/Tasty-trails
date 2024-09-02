import { useState } from 'react';
import FilterModal from '../modals/FilterModal';

const Filter = () => {
    const [openFilterModal, setOpenFilterModal] = useState(false);
    // const filterModal = useFilterModal()


    return (
        <>
            <div
                onClick={() => { setOpenFilterModal(true) }}
                className="
                        md:block
                        font-semibold
                        py-3
                        px-4
                        lg:ml-2
                        rounded-md
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                        text-lg
                        border
                        border-neutral-300
                    "
            >
                Filters
            </div>
            {openFilterModal && <FilterModal isOpen={openFilterModal} setIsOpen={setOpenFilterModal} />}
        </>
    );
}

export default Filter;