export default function Instructions() {
    return (
        <>
            <div className="fixed top-4 left-4 z-50">
                <a
                    href="/"
                    className="text-lg sm:text-xl md:text-2xl underline font-bold unica-one-regular text-gray-800 hover:opacity-90 transition"
                >
                    img.cipher
                </a>
            </div>
            <div className="max-w-2xl mx-auto px-4 py-6 mt-16 font-mono text-gray-800 leading-relaxed">
                {/* <h1 className=" text-2xl sm:text-2xl font-bold mb-6 mt-8 text-center underline">
                    Technical Instructions
                </h1> */}
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
                        If you find that your encoded cipher text file is too large to open in local text editors, don’t worry — you can always decode it directly back into the image using <strong>img-cipher</strong> on this website.
                    </li>
                </ul>

                <p className="mt-6 text-xs sm:text-sm text-gray-600 text-center">
                    For full technical details and source code, visit our{" "}
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
        </>
    );
}
