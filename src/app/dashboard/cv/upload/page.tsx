"use client";


import SuccessModal from '@/components/dashboardPage/SuccessModal';
import FailureModal from '@/components/dashboardPage/FailureModal';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { useRouter } from 'next/navigation';


export default function ManageCvPage() {
    const router = useRouter();
    // const {
    //     selectedFile,
    //     status,
    //     message,
    //     handleFileChange,
    //     handleSubmit,
    //     setStatus
    // } = useCv();


    return (
        <div>
            <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A]">
                <Header/>
                <div className="flex-1 w-full flex items-center justify-center p-4 bg-gradient-to-b from-[#060606] to-[#2C2A2A] mt-16">
                    <h1 className="text-white text-4xl font-bold mb-8">Em Breve...</h1>
                </div>

                <Footer/>

                {/*<SuccessModal*/}
                {/*    isOpen={status === 'success'}*/}
                {/*    message={message}*/}
                {/*    onClose={() => {*/}
                {/*        setStatus('idle');*/}
                {/*        router.push('/dashboard');*/}
                {/*    }}*/}
                {/*/>*/}

                {/*<FailureModal*/}
                {/*    isOpen={status === 'error'}*/}
                {/*    message={message}*/}
                {/*    onClose={() => {*/}
                {/*        setStatus('idle');*/}
                {/*        router.push('/dashboard');*/}
                {/*    }}*/}
                {/*/>*/}
            </div>

        </div>
    );
}