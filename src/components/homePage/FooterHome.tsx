import {marope, spaceGrotesk} from '@/app/fonts';
import LoginRedirectButton from "@/components/homePage/LoginRedirectButton";

export default function FooterHome() {
    return (
        <footer className={`${marope.className} bg-[#060606] p-4 text-white mt-auto flex items-center justify-between`}>
            <div className="flex-1"></div>
            <span className="flex-1 text-center">© 2025 Guilherme Araujo - Todos os direitos reservados.</span>
        </footer>
    );
}