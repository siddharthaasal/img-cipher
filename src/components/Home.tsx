import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center pb-16">
            <h1 className="text-4xl unica-one-regular mb-2 ">/img.cipher/</h1>
            <h4 className="caption-style text-base italic text-gray-600 mb-6">
                just a little something to keep your pics private
            </h4>
            <div className="flex gap-4 font-mono">
                <Link
                    to="/encode"
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    encrypt
                </Link>
                <Link
                    to="/decode"
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    decrypt
                </Link>
            </div>
        </div>
    );
}