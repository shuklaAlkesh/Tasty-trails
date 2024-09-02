import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { MdRoomService } from "react-icons/md";

const ListingInfo = ({
    data
}) => {

    return (
        <div className="col-span-4 flex flex-col gap-8 ">
            <div className="flex flex-col font-bold text-lg">
                <div className="flex flex-row items-center gap-4">
                    <FaLocationDot />
                    <div>Location</div>
                </div>
                <div className="flex 
                        flex-row 
                        items-center 
                        gap-4 
                        font-light
                        text-neutral-500"
                >
                    <div>{`Country: ${data?.location?.country_id?.countryName}`} </div>
                    <div>{`State: ${data?.location?.city}`} </div>
                </div>
                <div className="font-light text-neutral-500">{`Address: ${data?.location?.address}`} </div>
                <div className="flex 
                        flex-row 
                        items-center 
                        gap-4 
                        font-light
                        text-neutral-500">
                    <div>{`Latitude: ${data?.location?.latitude}`} </div>
                    <div>{`Longitude: ${data?.location?.longitude}`} </div>
                </div>
            </div>
            <hr />
            <div className="flex flex-col font-bold text-lg">
                <div className="flex flex-row items-center gap-4">
                    <MdRoomService />
                    <div>Services Available</div>
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>Switch to Order Menu:</div>
                    {data?.switch_to_order_menu && <FaCircleCheck className="fill-emerald-500"/>}
                    {!data?.switch_to_order_menu && <ImCross className="fill-red-500"/>}
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>Has Table Booking:</div>
                    {data?.has_table_booking && <FaCircleCheck className="fill-emerald-500"/>}
                    {!data?.has_table_booking && <ImCross className="fill-red-500"/>}
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>Has Online Delivery:</div>
                    {data?.has_online_delivery && <FaCircleCheck className="fill-emerald-500"/>}
                    {!data?.has_online_delivery && <ImCross className="fill-red-500"/>}
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>Is Delivering Now:</div>
                    {data?.is_delivering_now && <FaCircleCheck className="fill-emerald-500"/>}
                    {!data?.is_delivering_now && <ImCross className="fill-red-500"/>}
                </div>
            </div>
            <hr />
        </div>
    );
};

export default ListingInfo;
