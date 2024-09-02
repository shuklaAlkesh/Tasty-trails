"use client";

import React from "react";

import axios from "axios";
import { toast } from "react-hot-toast";
import Container from "../layout/Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { Link } from "react-router-dom";
import ListingCuisine from "./ListingCuisine";


const ListingHero = ({
    listing,
}) => {

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto pt-24">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        imageSrc={listing?.imageUrl}
                    />
                    <div className="flex flex-col gap-2">
                        <div
                            className="
            text-4xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
            justify-between
            align-center
          "
                        >
                            <div>{listing?.name}</div>
                            <div className="font-light text-neutral-500">{`Restaurant Id: ${listing?.restaurantId}`} </div>
                        </div>
                        <div
                            className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
                        >
                            <Link to={listing?.bookUrl} target="_blank">Book Restaurant</Link>
                            <Link to={listing?.photosUrl} target="_blank">See Photos</Link>
                            <Link to={listing?.menuUrl} target="_blank">See Menu</Link>
                        </div>
                    </div>
                    <div
                        className="
                    grid
                    grid-cols-1
                    md:grid-cols-7
                    md:gap-10
                    mt-6
                "
                    >
                        <ListingInfo
                            data={listing}
                        />
                        <div
                            className="
                                order-first //order-first for top order last for bottom
                                mb-10
                                md:order-last
                                md:col-span-3
                            "
                        >
                            <ListingCuisine data={listing} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ListingHero;
