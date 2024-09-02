import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useLocation } from 'react-router-dom';
import ListingCard from '../components/listings/ListingCard';
import Container from '../components/layout/Container';
import axios from 'axios';
import { server } from '../constants/config';
import Pagination from '../components/specific/Pagination';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../redux/restaurantSlice';
import toast from 'react-hot-toast';
import Loader from '../components/specific/Loader';
import EmptyState from '../components/shared/EmptyState';

const FilterResult = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.restaurant);


    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const countryId = searchParams.get('countryId');
        const cuisineId = searchParams.get('cuisineId');
        const averageCostForTwo = searchParams.get('averageCostForTwo');
        const name = searchParams.get('name');
        const latitude = searchParams.get('latitude');
        const longitude = searchParams.get('longitude');
        const radius = searchParams.get('radius');

        const limit = 20

        const fetchResults = async () => {

            if (latitude && longitude && radius) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await axios.get(`${server}/restaurant/getWithInRadius?latitude=${latitude}&longitude=${longitude}&radius=${radius}&page=${currentPage}&limit=${limit}`)
                    setRestaurants(data.restaurants)
                }
                catch (err) {
                    toast.error(err?.response?.data?.message || "Something went wrong");
                }
                finally {
                    dispatch(setLoading(false)); // Set loading to false after fetching data
                }
            }
            if (countryId || cuisineId || averageCostForTwo || name) {
                try {
                    dispatch(setLoading(true));
                    const { data } = await axios.get(`${server}/restaurant/with-filter?countryId=${countryId}&cuisineId=${cuisineId}&averageCostForTwo=${averageCostForTwo}&name=${name}&page=${currentPage}&limit=${limit}`)
                    if (data) {
                        setRestaurants(data.restaurants);
                        setTotalPages(Math.ceil(data.totalRestaurants / limit)); // Update total pages based on the total count
                    }
                }

                catch (err) {
                    toast.error(err?.response?.data?.message || "Something went wrong");
                }
                finally {
                    dispatch(setLoading(false)); // Set loading to false after fetching data
                }
            }
        };

        fetchResults();
    }, [currentPage, location.search]);

    return (
        <AppLayout>
            {loading && <Loader />}
            {!loading && (
                restaurants?.length > 0 ? (
                    <div className='flex flex-col pt-24'>
                        <div className='max-w-[2520px]
          mx-auto
          xl:px-20 
          md:px-10
          sm:px-2
          px-4 text-3xl font-bold'>Filtered Results</div>
                        <Container>
                            <div
                                className="
                pt-5
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-5
                gap-8
              "
                            >
                                {restaurants?.map((listing) => (
                                    <ListingCard
                                        key={listing?._id}
                                        data={listing}
                                    />
                                ))}
                            </div>
                        </Container>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)} // Pass the page change handler
                        />
                    </div>
                ) : (
                    <EmptyState showReset={true} />
                )
            )}
        </AppLayout>
    )
}

export default FilterResult