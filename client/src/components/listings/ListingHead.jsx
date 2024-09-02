const ListingHead = ({
    imageSrc,
}) => {

    return (
        <>
            <div
                className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
            >
                <img
                    src={imageSrc}
                    className="object-cover w-full"
                    alt="Image"
                />
                {/* <div
                    className="
            absolute
            top-5
            right-5
          "
                >
                    <HeartButton listingId={id} currentUser={currentUser} />
                </div> */}
            </div>
        </>
    );
};

export default ListingHead;
