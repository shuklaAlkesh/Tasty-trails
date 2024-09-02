import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/layout/AppLayout';
import Container from '../components/layout/Container';
import ListingCard from '../components/listings/ListingCard';

const SearchResult = () => {
    const {restaurants, cuisine} = useSelector(state => state.restaurant)

    return (
        <AppLayout>
            <div className='flex flex-col pt-24'>
                <div className='max-w-[2520px]
          mx-auto
          xl:px-20 
          md:px-10
          sm:px-2
          px-4 text-3xl font-bold'>{restaurants.length ? `Restaurants having ${cuisine}` : `No Restaurants have ${cuisine}`}</div>
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
            </div>
        </AppLayout>
    )
}

export default SearchResult