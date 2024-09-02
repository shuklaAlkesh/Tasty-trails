import { useNavigate } from "react-router-dom";
import Button from "../shared/Button";
import { HiStar } from "react-icons/hi2";
const ListingCard = ({
    data
}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/restaurant/${data?.restaurantId}`)}
            className="col-span-1 cursor-pointer group border-blue-"
        >
            <div className="flex flex-col gap-2 w-full">
                <div
                    className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
                >
                    <img
                        className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
                        src={data.imageUrl}
                        alt="Listing"
                    />
                    {/* <div
                        className="
            absolute
            top-3
            right-3
          "
                    >
                        <HeartButton
                            listingId={data?._id}
                            currentUser={currentUser}
                        />
                    </div> */}
                </div>
                <div className="font-semibold text-lg">
                    {data?.name}
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="font-light text-lg">
                        {data?.location?.country_id?.countryName}
                    </div>
                    <div className="font-light text-neutral-500">
                        {data?.location?.city}
                    </div>
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-light">Avg. Cost for Two: </div>
                    <div className="font-semibold">{data?.currency} {data?.average_cost_for_two}</div>
                </div>
                {/* {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )} */}
            </div>
        </div>
    );
};
export default ListingCard;
