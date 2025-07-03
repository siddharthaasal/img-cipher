import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function Instructions({ onClose }: { onClose: () => void }) {
    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-60 backdrop-blur-sm
                       transition-opacity duration-300 animate-fade-in"
            onClick={onClose} // click anywhere on backdrop
        >
            <div
                className="relative bg-[#FAFBF9] rounded-lg max-w-2xl w-full mx-4 p-6 font-mono text-gray-800 
                           overflow-y-auto max-h-[90vh] shadow-xl transition-transform duration-300 transform animate-slide-up"
                onClick={(e) => e.stopPropagation()} // prevent backdrop close on modal click
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="cursor-pointer absolute top-4 right-4 text-gray-500 hover:text-black transition"
                    aria-label="Close instructions"
                >
                    <CloseIcon />
                </button>

                {/* Optional Branding Link */}
                {/* <div className="absolute top-2 left-2">
                    <a
                        href="/"
                        className="text-lg sm:text-xl md:text-2xl underline font-bold unica-one-regular text-gray-800 hover:opacity-90 transition"
                    >
                        img.cipher
                    </a>
                </div> */}

                {/* Content */}
                <div className="mt-8">
                    <p className="mb-4 text-sm sm:text-base">
                        <strong>img-cipher</strong> provides a way to encode images into secure, compact cipher strings and decode them back into visual data.
                        This allows you to safely transmit or store images as text.
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                        <li>
                            The cipher is <em>lossless</em>, preserving the exact pixel values without compression artifacts.
                        </li>
                        <li>
                            Processing occurs fully on the client side — no images or data are sent to the server, ensuring user privacy.
                        </li>
                        <li className="text-red-600">
                            Warning: Very large images (e.g., above <strong>10 MB</strong>) may cause slower encoding/decoding or large cipher strings that are hard to handle in some text editors.
                        </li>
                        <li>
                            If your encoded text file is too large to open locally, decode it back into an image using <strong>img-cipher</strong> here.
                        </li>
                    </ul>

                    <p className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
                        For full technical details and source code, visit our{' '}
                        <a
                            href="https://github.com/siddharthaasal/img-cipher"
                            className="underline hover:text-gray-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub repository
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
