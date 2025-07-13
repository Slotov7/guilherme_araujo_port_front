// "use client";
//
// import {useCv} from "@/hooks/useCv";
// import Image from "next/image";
//
//
// interface BotaoDownloadCVProps {
//     className?: string;
//     width?: number;
//     height?: number;
// }
//
// export default function ButtonDownloadCV({className, height, width}: BotaoDownloadCVProps) {
//     const { handleDownloadCv } = useCv();
//
//     return (
//         <button
//             onClick={handleDownloadCv}
//             className={className}
//         >
//             <Image src="/images/cv.svg" alt="CV" width={width} height={height} />
//             <span>Veja meu CV</span>
//         </button>
//     );
// }