import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from "react";
import Instructions from "./Instructions";

export default function Footer() {

    const [showInstructions, setShowInstructions] = useState<boolean>(false);

    return (
        <footer className="fixed bottom-2 left-2 right-2 text-xs text-gray-600 font-mono select-none           
                flex flex-col md:flex-col justify-center items-center
                px-4 py-2
                max-w-screen-md mx-auto
                pointer-events-auto
                z-50
                gap-4 
                ">
            {/* Top Group: Links */}
            <div className="flex flex-wrap justify-center gap-7 mb-2 md:mb-0">
                <div
                    className="flex items-center gap-1.5 cursor-pointer hover:text-gray-400 transition-colors"
                    onClick={() => setShowInstructions(true)}
                >

                    <ArticleIcon fontSize="small" />
                    instructions
                </div>

                <a
                    href="https://github.com/siddharthaasal/img-cipher"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 cursor-pointer hover:text-gray-400 transition-colors"
                >
                    <GitHubIcon fontSize="small" />
                    github
                </a>

                <a
                    href="mailto:siddharthaasal.@gmail.com"
                    className="flex items-center gap-1.5 cursor-pointer hover:text-gray-400 transition-colors"
                >
                    <MailIcon fontSize="small" />
                    contact
                </a>
            </div>

            {/* Bottom Group: Version & Copyright */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
                <div className=" sm:inline">© 2025 Siddharth Aasal</div>
                {/* <div className="flex items-center gap-1">v1.0.0</div> */}
            </div>

            {
                showInstructions &&
                <Instructions onClose={() => setShowInstructions(false)} />
            }
        </footer>
    );
}
