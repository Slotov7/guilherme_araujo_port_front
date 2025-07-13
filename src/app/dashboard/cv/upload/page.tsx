"use client";

import { useCv } from '@/hooks/useCv';
import SuccessModal from '@/components/dashboardPage/SuccessModal';
import FailureModal from '@/components/dashboardPage/FailureModal';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormCv from "@/components/forms/FormCv";
import { useRouter } from 'next/navigation';


export default function ManageCvPage() {
    const router = useRouter();
    const {
        selectedFile,
        status,
        message,
        handleFileChange,
        handleSubmit,
        setStatus
    } = useCv();


    return (
        <div>
            <div className="h-screen w-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A]">
                <Header/>
                <div className="flex-1 w-full flex items-center justify-center p-4 bg-gradient-to-b from-[#060606] to-[#2C2A2A] mt-16">

                    <FormCv
                        selectedFile={selectedFile}
                        status={status}
                        message={message}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit} filePreviewUrl={null}
                    />


                </div>

                <Footer/>


                <SuccessModal
                    isOpen={status === 'success'}
                    message={message}
                    onClose={() => {
                        setStatus('idle');
                        router.push('/dashboard');
                    }}
                />

                <FailureModal
                    isOpen={status === 'error'}
                    message={message}
                    onClose={() => {
                        setStatus('idle');
                        router.push('/dashboard');
                    }}
                />
            </div>

        </div>
    );
}