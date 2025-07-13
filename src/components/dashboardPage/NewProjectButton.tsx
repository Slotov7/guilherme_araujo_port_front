"use client";

import {useRouter} from "next/navigation";

export default function NewProjectButton(){
    const router = useRouter();
    return(
        <button
            type="button"
            onClick={() => {
                router.push('/dashboard/projects/new');
            }}
            className="flex items-center justify-center bg-[#20359C] border-0 text-white text-lg sm:text-2xl py-4 px-8 rounded-lg transition-all duration-300 disabled:bg-gray-500 cursor-pointer hover:bg-gradient-to-r hover:from-[#20359C] hover:to-[#1F4E79] shadow-lg"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 512 512"
                fill="white"
                className="mr-3"
            >
                <title>project-new</title>
                <g transform="translate(64,34.346667)">
                    <path d="M192,0 L384,110.851252 L384,242.986 L341.333,242.986 L341.333,157.655 L213.333,231.555 L213.333,431.088 L192,443.405007 L0,332.553755 L0,110.851252 L192,0 Z M341.333333,264.32 L341.333,328.32 L405.333333,328.32 L405.333333,370.986667 L341.333,370.986 L341.333333,434.986667 L298.666667,434.986667 L298.666,370.986 L234.666667,370.986667 L234.666667,328.32 L298.666,328.32 L298.666667,264.32 L341.333333,264.32 Z M42.666,157.654 L42.6666667,307.920144 L170.666,381.82 L170.666,231.555 L42.666,157.654 Z M192,49.267223 L66.1333333,121.936377 L192,194.605531 L317.866667,121.936377 L192,49.267223 Z"></path>
                </g>
            </svg>
            Adicionar projeto
        </button>
    )
}