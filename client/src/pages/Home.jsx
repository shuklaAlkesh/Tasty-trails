import EmptyState from "../components/shared/EmptyState";
import AppLayout from "../components/layout/AppLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../constants/config";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/layout/Container";
import Pagination from "../components/specific/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/restaurantSlice";
import Loader from "../components/specific/Loader";

const Home = () => {

    const dispatch = useDispatch(); // Get the dispatch function from Redux
    const { loading } = useSelector((state) => state.restaurant);

    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Initialize with 1
    const limit = 20;
    useEffect(() => {
        const loadRestaurants = async () => {
            dispatch(setLoading(true));
            try {
                const { data } = await axios.get(`${server}/restaurant/get-all?page=${currentPage}&limit=${limit}`) // Fetch with the current page and items per page
                if (data) {
                    setRestaurants(data.restaurants);
                    setTotalPages(Math.ceil(data.totalRestaurants / limit)); // Update total pages based on the total count
                }
            } catch (err) {
                toast.error(err?.response?.data?.message || "Something went wrong");
            }
            finally {
                dispatch(setLoading(false)); // Set loading to false after fetching data
            }
        };

        loadRestaurants();
    }, [currentPage, location.search]);

    return (
        <AppLayout>
            <Container>
                {loading && <Loader />}
                {
                    !loading && (
                        restaurants?.length > 0 ? <>
                            <div
                                className="
                pt-24
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
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)} // Pass the page change handler
                            />
                        </> : (
                            <EmptyState showReset={true} />
                        )
                    )
                }

            </Container>
        </AppLayout>
    );
};

export default Home;