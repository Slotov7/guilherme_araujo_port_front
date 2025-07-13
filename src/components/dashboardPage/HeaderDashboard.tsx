import Image from "next/image";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export default function HeaderDashboard(){
    const { logout } = useAuth();
    const router = useRouter();
    return(
        <header className="flex-shrink-0 px-8 py-5 bg-transparent shadow-lg z-50">
            <div className="flex items-center justify-between">
                <a href="/">
                    <Image
                        src="/images/logo.svg"
                        alt="Logo Guilherme Araujo"
                        width={150}
                        height={40}
                        priority
                    />
                </a>
                <div className="flex items-center space-x-0 space-x-reverse">

                    <button  onClick={() => {
                        router.push('/dashboard/cv/upload');
                    }} className="bg-transparent border-0 focus:outline-none flex items-center justify-center mr-10 hover:bg-[#2C2A2A] rounded-full p-2 transition-colors duration-300 cursor-pointer mr-0"
                    >
                        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.80004 6.35C8.36004 6.35 8.81004 5.9 8.81004 5.34C8.81004 4.78 8.36004 4.33 7.80004 4.33C7.24004 4.33 6.79004 4.78 6.79004 5.34C6.79004 5.9 7.24004 6.35 7.80004 6.35Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.83 8.55C9.83 7.47 8.92 6.69 7.8 6.69C6.68 6.69 5.77 7.47 5.77 8.55V9.06C5.77 9.15 5.81 9.24 5.87 9.3C5.93 9.36 6.02 9.4 6.11 9.4H9.49C9.58 9.4 9.67 9.36 9.73 9.3C9.79 9.24 9.83 9.15 9.83 9.06V8.55ZM5.75 11.5C5.75 11.3011 5.82902 11.1103 5.96967 10.9697C6.11032 10.829 6.30109 10.75 6.5 10.75H13.5C13.6989 10.75 13.8897 10.829 14.0303 10.9697C14.171 11.1103 14.25 11.3011 14.25 11.5C14.25 11.6989 14.171 11.8897 14.0303 12.0303C13.8897 12.171 13.6989 12.25 13.5 12.25H6.5C6.30109 12.25 6.11032 12.171 5.96967 12.0303C5.82902 11.8897 5.75 11.6989 5.75 11.5ZM5.75 14.5C5.75 14.3011 5.82902 14.1103 5.96967 13.9697C6.11032 13.829 6.30109 13.75 6.5 13.75H13.5C13.6989 13.75 13.8897 13.829 14.0303 13.9697C14.171 14.1103 14.25 14.3011 14.25 14.5C14.25 14.6989 14.171 14.8897 14.0303 15.0303C13.8897 15.171 13.6989 15.25 13.5 15.25H6.5C6.30109 15.25 6.11032 15.171 5.96967 15.0303C5.82902 14.8897 5.75 14.6989 5.75 14.5Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M2.5 2.5C2.5 1.398 3.398 0.5 4.5 0.5H11.19C11.752 0.5 12.282 0.738 12.655 1.131L12.661 1.138L16.973 5.84C17.332 6.223 17.5 6.724 17.5 7.2V17.5C17.5 18.602 16.602 19.5 15.5 19.5H4.5C3.398 19.5 2.5 18.602 2.5 17.5V2.5ZM11.189 2.5H4.5V17.5H15.5V7.192L11.204 2.507L11.201 2.506L11.189 2.5Z" fill="white"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.1899 0.5C11.4552 0.5 11.7095 0.605357 11.897 0.792893C12.0846 0.98043 12.1899 1.23478 12.1899 1.5V6.2H16.4999C16.6313 6.2 16.7613 6.22587 16.8826 6.27612C17.004 6.32638 17.1142 6.40003 17.207 6.49289C17.2999 6.58575 17.3736 6.69599 17.4238 6.81732C17.4741 6.93864 17.4999 7.06868 17.4999 7.2C17.4999 7.33132 17.4741 7.46136 17.4238 7.58268C17.3736 7.70401 17.2999 7.81425 17.207 7.90711C17.1142 7.99997 17.004 8.07362 16.8826 8.12388C16.7613 8.17413 16.6313 8.2 16.4999 8.2H11.1899C10.9247 8.2 10.6704 8.09464 10.4828 7.90711C10.2953 7.71957 10.1899 7.46522 10.1899 7.2V1.5C10.1899 1.23478 10.2953 0.98043 10.4828 0.792893C10.6704 0.605357 10.9247 0.5 11.1899 0.5Z" fill="white"/>
                        </svg>

                    </button>
                    <button
                        onClick={() => {
                            logout();
                            router.push('/login');
                        }}
                        className="bg-transparent border-0 focus:outline-none flex items-center justify-center mr-10 hover:bg-[#2C2A2A] rounded-full p-2 transition-colors duration-300 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M21 12L13 12"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 15L20.913 12.087V12.087C20.961 12.039 20.961 11.961 20.913 11.913V11.913L18 9"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16 5V4.5C16 3.67157 15.3284 3 14.5 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H14.5C15.3284 21 16 20.3284 16 19.5V19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}