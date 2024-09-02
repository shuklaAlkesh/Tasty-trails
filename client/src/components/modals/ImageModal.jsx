import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { server } from '../../constants/config';
import { setCuisine, setLoading, setRestaurants } from '../../redux/restaurantSlice';
import Loader from '../specific/Loader';

const ImageModal = ({ onClose }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.restaurant);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = async () => {
        if (!image) {
            toast.error("Please upload an image before submitting.");
            return;
        }
    
        const formData = new FormData();
        formData.append('image', image);
    
        try {
            dispatch(setLoading(true));
            const { data } = await axios.post(`${server}/restaurant/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            if (data.restaurants.length === 0 || !data.cuisine) {
                toast.error("Cuisine not found");
                navigate("/"); // Or wherever you want to redirect if no results
            } else {
                dispatch(setRestaurants(data.restaurants));
                dispatch(setCuisine(data.cuisine));
                navigate("/image-result");
                toast.success("Image uploaded successfully!");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            dispatch(setLoading(false));
            onClose();
        }
    };

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center max-w-xl w-full">
                        <h2 className="text-2xl font-bold mb-6">Upload an Image</h2>
                        <div
                            className="relative cursor-pointer hover:opacity-80 transition border-dashed border-2 border-neutral-300 p-16 flex flex-col justify-center items-center gap-6 text-neutral-600 w-full"
                            onClick={() => document.getElementById('file-input').click()}
                        >
                            <TbPhotoPlus size={80} />
                            <div className="font-semibold text-xl">
                                Click to upload
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            {image && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="preview"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex mt-6 gap-6 w-full items-center justify-center">
                            <button
                                onClick={onClose}
                                className="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600">
                                Cancel
                            </button>
                            <button
                                onClick={handleImageUpload}
                                className="bg-black text-white px-8 py-3 rounded hover:bg-slate-900"
                                disabled={!image}>
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageModal;
