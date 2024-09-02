import { GiKnifeFork } from "react-icons/gi";
import { HiStar } from "react-icons/hi2";
import { ImPriceTag } from "react-icons/im";

const ListingCuisine = ({
    data
}) => {

    if(!data){
        return <p>Loading</p>
    }

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col font-bold text-lg">
                <div className="flex flex-row items-center gap-4">
                    <GiKnifeFork />
                    <div>Cuisines Available</div>
                </div>
                <div className="flex flex-col gap-2 font-semibold text-neutral-600">
                        {data?.cuisines.length > 0 && data?.cuisines.map(cus => (
                            <li key={cus?._id}>{cus.cuisineName} </li>
                        ))}
                </div>
            </div>
            <hr />
            <div className="flex flex-col font-bold text-lg">
                <div className="flex flex-row items-center gap-4">
                    <HiStar className="fill-yellow-500"/>
                    <div>Rating Details</div>
                </div>
                <div className="font-light text-neutral-500">{`Rating Text: ${data?.rating?.rating_text}`} </div>
                <div className="font-light text-neutral-500">{`Aggregate Rating: ${data?.rating?.aggregate_rating}/5`} </div>
                <div className="font-light text-neutral-500">{`People Voted: ${data?.rating?.votes}`} </div>
            </div>
            <hr />

            <div className="flex flex-col font-bold text-lg">
                <div className="flex flex-row items-center gap-4">
                    <ImPriceTag/>
                    <div>Price Range</div>
                </div>
                <div className="font-light text-neutral-500">{`Price Range: ${data?.price_range}`} </div>
                <div className="font-light text-neutral-500">{`Avg. Cost for Two:  ${data?.currency} ${data?.average_cost_for_two}`} </div>
            </div>
            <hr />
        </div>
    );
};

export default ListingCuisine;
