import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormLogin from "@/components/forms/FormLogin";
import { Suspense } from "react";

export default function LoginPage(){
    return (
        <div className="h-screen flex flex-col bg-gradient-to-b from-[#060606] to-[#2C2A2A]">
            <Header/>
            <main className="w-full flex-1 flex items-center justify-center overflow-auto p-4">
                <div className="min-h-full flex items-center justify-center p-4 w-full">
                        <FormLogin />
                </div>
            </main>
            <Footer/>
        </div>
    );
}