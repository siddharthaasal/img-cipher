import React, { useRef, useState } from "react";
import CryptoJS from "crypto-js";
import { Toaster, toast } from 'sonner';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


const Decode = () => {

    const [file, setFile] = useState<File | null>(null);
    const [baseName, setBaseName] = useState<string>("");
    const [toDecrypt, setToDecrypt] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [showPassoword, setShowPassword] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type.startsWith("text/")) {
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
                let fileContent = reader.result?.toString();
                if (!fileContent) return reject("Empty or unreadable file");

                try {
                    // Decrypt if needed
                    if (toDecrypt) {
                        if (!password) return reject("Please enter a password to decrypt!");
                        const decrypted = decryptText(fileContent, password);
                        if (!decrypted) return reject("Decryption failed. Wrong password or corrupted file.");
                        fileContent = decrypted;
                    }

                    // Convert base64 back to binary
                    const byteCharacters = atob(fileContent);
                    const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
                    const byteArray = new Uint8Array(byteNumbers);

                    const blob = new Blob([byteArray], { type: "image/*" });

                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = `${baseName}_decoded.png`;
                    link.click();

                    resolve(file.name);
                } catch (err) {
                    reject("Unexpected error occurred");
                }
            };

            reader.onerror = () => reject("Failed to read the file");
            reader.readAsText(file);
        });

        toast.promise(convertPromise, {
            loading: "Decoding file...",
            success: () => `Successfully decoded`,
            error: (err) => `Error: ${err}`,
        });
    };



    function toggleToDecrypt() {
        setToDecrypt(!toDecrypt);
    }

    function toggleShowPassword() {
        setShowPassword(!showPassoword);
    }


    function decryptText(cipherText: string, password: string): string | null {
        try {
            const bytes = CryptoJS.AES.decrypt(cipherText, password);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return decrypted || null; // null if wrong password or empty
        } catch {
            return null;
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white  space-y-6 pb-16">
            <Toaster position="bottom-right" />
            <h1 className="text-2xl font-semibold text-gray-800 flex ">Decode an Image</h1>
            {/* <p className="text-xs text-gray-500 mb-2">Upload a base64 `.txt` file to convert it back to an image.</p> */}

            <div
                onClick={() => inputRef.current?.click()}
                className="cursor-pointer w-full max-w-sm border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-gray-400 transition"
            >
                <input
                    type="file"
                    accept="text/.txt"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {!file ? (
                    <div className="flex flex-col items-center justify-center text-gray-500 text-center">
                        <FileUploadIcon className="w-6 h-6 mb-2" />
                        <p className="text-sm">Click to upload your Base64 text file</p>
                        <p className="text-xs text-gray-400 mt-1">TXT</p>
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
                            <span className="text-sm text-gray-500 select-none">_decoded.png</span>
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
                                checked={toDecrypt}
                                onChange={toggleToDecrypt}
                                className="mr-2 accent-gray-500"
                            />
                            Decrypt with password <span className="text-gray-500">(Password protected file)</span>
                        </label>
                    </div>

                    {
                        toDecrypt && (
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
                Want to <a href="/encode" className="text-blue-600 hover:underline">encode a file</a> instead?
            </p>

        </div>
    );
};

export default Decode;
