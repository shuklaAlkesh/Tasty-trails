import React, { useEffect, useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // State to track the window size dynamically
    const [windowSize, setWindowSize] = useState(5); // Default number of pages to show

    // Handle window resizing to adjust the number of visible pages
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) { // Small screens (e.g., < 640px)
                setWindowSize(3);
            } else if (window.innerWidth < 1024) { // Medium screens (e.g., < 1024px)
                setWindowSize(5);
            } else { // Large screens (e.g., >= 1024px)
                setWindowSize(7);
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Set initial window size
        handleResize();

        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate the start and end page numbers based on window size
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(windowSize / 2), totalPages - windowSize + 1));
    const endPage = Math.min(totalPages, startPage + windowSize - 1);

    // Function to generate page numbers
    const generatePages = () => {
        let pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const pages = generatePages();

    return (
        <div className="flex justify-center mt-8 mb-4 px-4">
            <nav className="flex flex-wrap items-center space-x-2">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className={`px-3 py-1 md:px-4 md:py-2 border rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700'}`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {startPage > 1 && (
                    <>
                        <button
                            onClick={() => onPageChange(1)}
                            className="px-3 py-1 md:px-4 md:py-2 border rounded bg-white text-black hover:bg-gray-100"
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="px-3 py-1 md:px-4 md:py-2 border rounded bg-white text-black">...</span>}
                    </>
                )}
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 md:px-4 md:py-2 border rounded ${currentPage === page ? 'bg-black text-white font-semibold' : 'bg-white text-black hover:bg-gray-100'}`}
                    >
                        {page}
                    </button>
                ))}
                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-3 py-1 md:px-4 md:py-2 border rounded bg-white text-black">...</span>}
                        <button
                            onClick={() => onPageChange(totalPages)}
                            className="px-3 py-1 md:px-4 md:py-2 border rounded bg-white text-black hover:bg-gray-100"
                        >
                            {totalPages}
                        </button>
                    </>
                )}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className={`px-3 py-1 md:px-4 md:py-2 border rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-700'}`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
