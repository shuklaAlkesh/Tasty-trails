import { useRef } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

const ImageUpload = ({ value, onChange }) => {
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(file)
    };

    return (
        <div
            onClick={handleClick}
            className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
        >
            <TbPhotoPlus
                size={50}
            />
            <div className="font-semibold text-lg">
                Click to upload
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />
            {value && (
                <div className="absolute inset-0 w-full h-full">
                    <img
                        style={{ objectFit: 'cover' }}
                        src={value}
                        alt="uploaded"
                    />
                </div>
            )}
        </div>
    );
}

export default ImageUpload;
