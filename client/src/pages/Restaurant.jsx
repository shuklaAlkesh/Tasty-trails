import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ListingHero from '../components/listings/ListingHero'
import { server } from '../constants/config'

import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../redux/restaurantSlice'
import Loader from '../components/specific/Loader'

const Restaurant = () => {
    const [restaurant, setRestaurant] = useState(null)

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.restaurant);

    const params = useParams()
    const restId = params.id

    useEffect(() => {
        const getRestaurantById = async () => {
            dispatch(setLoading(true));
            try {
                const { data } = await axios.get(`${server}/restaurant/${restId}`);
                setRestaurant(data.restaurant);
            } catch (err) {
                toast.error(err?.response?.data?.message || "Something went wrong");
            }
            finally {
                dispatch(setLoading(false)); // Set loading to false after fetching data
            }
        }

        getRestaurantById()
    }, [restId])

    return (
        <AppLayout>
            {!loading && <ListingHero listing={restaurant} />}
            {loading && <Loader />}
        </AppLayout>
    )
}

export default Restaurant
