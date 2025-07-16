"use client";

import Image from "next/image";
import { useMinWidth } from "@/hooks/useMinWidth";

export default function ResponsiveImage() {
    const showImage = useMinWidth(1800);

    if (!showImage) return null;

    return (
        <div className="absolute bottom-0 ml-[520px] w-full w-1/2 justify-center pointer-events-none">
            <Image
                src="/images/boneco.png"
                alt="Avatar de desenvolvedor"
                width={500}
                height={700}
                className="h-auto"
            />
        </div>
    );
}