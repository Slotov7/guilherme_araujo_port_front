import {marope} from "@/app/fonts";

export default function Footer (){
    return(
        <footer className={`${marope.className} bottom-0 left-0 w-full bg-[#060606] text-center p-4 text-white z-50 max-sm:text-center max-sm:text-sm`}>
            © 2025 Guilherme Araujo - Todos os direitos reservados.
        </footer>
    )
}