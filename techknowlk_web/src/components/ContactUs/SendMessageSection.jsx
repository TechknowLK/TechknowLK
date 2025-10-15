import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Label} from "../Label ";
import {Input} from "../Input";
import Button01 from "../Button01";


export default function SendMessageSection() {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            console.log("Form Data:", data);

            // Your backend URL (if using different ports)
            const base_url = import.meta.env.VITE_API_URL || "http://localhost:3001";

            console.log(`Base URL: ${base_url}`);

            const res = await fetch(`${base_url}/send-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: `
                    Service: ${data.service}
                    Phone: ${data.phone}
                    --------------------
                    ${data.message}
                `,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                console.error("Error Response:", result);
                alert(`Failed to send message: ${result.error || "Unknown error"}`);
                return;
            }

            alert("Message sent successfully!");
            reset();
        } catch (err) {
            console.error("Error sending message:", err);
            alert("Failed to send message. Please try again later.");
        }
    };

    return (
        <section className="bg-white border border-gray-200 rounded-2xl p-4 md:p-8 shadow-lg w-full mx-auto">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-[#626262]">
                Send us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col justify-center">
                {/* Full Name */}
                <div>
                    <Label htmlFor="name" required>
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        placeholder="Enter your full name"
                        {...register("name", {required: "Full name is required"})}
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email" required>
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        {...register("email", {required: "Email is required"})}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <Label htmlFor="phone" required>
                        Phone Number
                    </Label>
                    <Input
                        id="phone"
                        placeholder="+94 77 123 4567"
                        {...register("phone", {minLength: 10})}
                    />
                    {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Service Interest */}
                <div>
                    <Label htmlFor="service" required>
                        Service Interest
                    </Label>
                    <select
                        id="service"
                        {...register("service", {required: "Please select a service"})}
                        className="mt-2 w-full py-4 border border-gray-300 rounded-md px-3 text-sm focus:ring-2 focus:ring-[#34A7D5] focus:outline-none"
                    >
                        <option value="">Select a service</option>
                        <option value="electrical">Eelectrical & Networking</option>
                        <option value="software">Software Solutions</option>
                        <option value="iot">IoT & Automation</option>
                        <option value="consulting">IT Support & Consulting</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.service && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.service.message}
                        </p>
                    )}
                </div>

                {/* Message */}
                <div>
                    <Label htmlFor="message" required>
                        Message
                    </Label>
                    <textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        {...register("message", {required: "Message is required"})}
                        className="mt-2 w-full min-h-[150px] border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-[#34A7D5] focus:outline-none resize-none"
                    ></textarea>
                    {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <Button01 type="submit" label={isSubmitting ? "Sending..." : "Send Message"} disabled={isSubmitting}/>
            </form>
        </section>
    );
}
