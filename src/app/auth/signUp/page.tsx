"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import TextBox from "@/components/TextBox";
import Button from "@/components/Button";

const SignUpPage = () => {
    const emailRef = useRef("");
    const passRef = useRef("");
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const name = emailRef.current.split("@")[0].toUpperCase();
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailRef.current,
                    name,
                    password: passRef.current,
                }),
            });

            if (response.ok) {
                // Redirect to the desired page after successful registration
                router.push("/dashboard");
            } else {
                // Handle error response
                console.error("Error signing up:", response.statusText);
            }
        } catch (error) {
            console.error("Error signing up:", error);
        }
    };

    return (
        <div className="max-w-md w-full space-y-4">
            <div className="w-full max-w-lg">
                <div className="flex flex-col justify-center bg-white rounded-lg p-8 gap-[24px] shadow-2xl">
                    <h3 className="text-lg font-bold text-left">Register</h3>
                    <TextBox
                        id="txt1"
                        placeholder="Email"
                        onChange={(e) => (emailRef.current = e.target.value)}
                    />
                    <TextBox
                        id="txt2"
                        placeholder="Password"
                        type="password"
                        onChange={(e) => (passRef.current = e.target.value)}
                    />
                    <Button onClick={handleSignUp} className="mt-10">
                        Register
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
