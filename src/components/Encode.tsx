import React, { useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { Toaster, toast } from 'sonner';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Encode = () => {

    const [file, setFile] = useState<File | null>(null);
    const [baseName, setBaseName] = useState<string>("");
    const [toEncrypt, setToEncrypt] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [showPassoword, setShowPassword] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
            setBaseName(nameWithoutExt);
        }
    };

    const handleConvertAndDownload = () => {
        if (!file) return;

        const convertPromise = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                try {
                    let base64String = reader.result?.toString().split(",")[1];
                    if (base64String) {
                        if (toEncrypt) {
                            if (!password) {
                                alert("Please enter a password to encrypt!");
                                return;
                            }
                            base64String = encryptText(base64String, password);
                        }

                        const blob = new Blob([base64String], { type: "text/plain" });
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(blob);
                        link.download = `${baseName}.txt`;
                        link.click();

                        resolve({ name: file.name });
                    }
                } catch (err) {
                    reject("Unexpected Error occured");
                }

            };

            reader.onerror = () => reject("Failed to read file");

            reader.readAsDataURL(file);
        });

        toast.promise(convertPromise, {
            loading: "Encoding image...",
            success: () => `Image converted and downloaded`,
            error: (err) => `Error: ${err}`
        })


    };


    function toggleToEncrypt() {
        setToEncrypt(!toEncrypt);
    }

    function toggleShowPassword() {
        setShowPassword(!showPassoword);
    }

    function encryptText(plainText: string, password: string): string {
        return CryptoJS.AES.encrypt(plainText, password).toString();
    }

    return (
        <>
            <div className="fixed top-4 left-6 z-50">
                <a href="/" className="text-xl md:text-2xl underline font-bold unica-one-regular text-gray-800 hover:opacity-90 transition">
                    img.cipher
                </a>
            </div>

            <div className="min-h-screen flex flex-col items-center justify-center pb-16 space-y-6">
                <Toaster position="bottom-right" />
                <h1 className="text-2xl font-semibold text-gray-800 flex ">Encode an Image</h1>

                <div
                    onClick={() => inputRef.current?.click()}
                    className="cursor-pointer w-full max-w-sm border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition"
                >
                    <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp, image/gif, image/bmp, image/svg+xml" //jpeg also included jpg
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {!file ? (
                        <div className="flex flex-col items-center justify-center text-gray-500 text-center">
                            <FileUploadIcon className="w-6 h-6 mb-2" />
                            <p className="text-sm">Click to upload an image</p>
                            <p className="text-xs text-gray-400 mt-1">JPEG, JPG, PNG, etc.</p>
                        </div>
                    ) : (
                        <div className="text-left text-sm text-gray-700">
                            <p className="font-medium truncate">{file.name}</p>
                            <p className="text-xs text-gray-500 mb-2">
                                {(file.size / 1024).toFixed(1)} KB
                            </p>

                            <label className="block text-xs text-gray-600 mt-4 mb-1">
                                Save as:
                            </label>
                            <div className="flex items-center gap-1">
                                <input
                                    type="text"
                                    className="flex-1 border rounded px-2 py-1 text-sm"
                                    value={baseName}
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => setBaseName(e.target.value)}
                                />
                                <span className="text-sm text-gray-500 select-none">.txt</span>
                            </div>
                        </div>
                    )}
                </div>

                {file && (
                    <>
                        <div className="w-full max-w-sm flex flex-col mb-2">
                            <label htmlFor="encrypt-toggle" className="text-sm text-gray-700 mb-1">
                                <input
                                    type="checkbox"
                                    id="encrypt-toggle"
                                    checked={toEncrypt}
                                    onChange={toggleToEncrypt}
                                    className="mr-2 accent-gray-500"
                                />
                                Encrypt before saving
                            </label>
                        </div>

                        {
                            toEncrypt && (
                                <div className="mb-4 w-full max-w-sm relative">
                                    <input
                                        type={showPassoword ? "text" : "password"}
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full items-start border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-700"
                                    />
                                    <div
                                        onClick={toggleShowPassword}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                                    >
                                        {showPassoword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </div>
                                </div>
                            )
                        }
                        <button
                            onClick={handleConvertAndDownload}
                            className="w-full max-w-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
                        >
                            Convert & Download
                        </button>


                    </>

                )}
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Want to <a href="/decode" className="text-blue-600 hover:underline">decode a file</a> instead?
                </p>
            </div>
        </>

    );
};

export default Encode;
