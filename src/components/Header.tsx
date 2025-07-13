import Image from "next/image";

export default function  Header(){
    return(
        <header className="fixed top-0 left-0 w-full bg-[#060606] px-8 py-5 shadow-lg z-50">
            <a href="/">
                <Image
                    src="/images/logo.svg"
                    alt="Logo Guilherme Araujo"
                    width={150}
                    height={40}
                    priority
                />
            </a>
        </header>
    )
}