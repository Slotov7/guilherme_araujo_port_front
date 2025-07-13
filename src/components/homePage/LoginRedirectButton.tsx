"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginRedirectButton() {
    const router = useRouter();

    return (
        <button
            className="bg-transparent border-0 focus:outline-none flex items-center justify-center hover:bg-[#2C2A2A] rounded-full p-2 transition-colors duration-300 cursor-pointer"
            onClick={() => router.push('/login')}
        >
            <Image
                src="/images/userLoginPage.svg"
                alt="Login"
                width={24}
                height={24}
            />
        </button>
    );
}