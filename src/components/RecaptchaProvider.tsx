"use client";

import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import React from "react";

export default function RecaptchaProvider({children}: { children: React.ReactNode }) {
    const reCaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    if (!reCaptchaKey) {
        console.error("A Chave do Site do reCAPTCHA não está definida!");
        return <>{children}</>;
    }
    return (
        <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
            {children}
        </GoogleReCaptchaProvider>
    );
}