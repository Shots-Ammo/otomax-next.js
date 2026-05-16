"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Phone,
    Mail,
    MapPin,
    CheckCircle2,
    User,
    Settings,
    ArrowRight,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
    { name: "Afghanistan", code: "+93", flag: "🇦🇫" },
    { name: "Albania", code: "+355", flag: "🇦🇱" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "Andorra", code: "+376", flag: "🇦🇩" },
    { name: "Angola", code: "+244", flag: "🇦🇴" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" },
    { name: "Armenia", code: "+374", flag: "🇦🇲" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "Austria", code: "+43", flag: "🇦🇹" },
    { name: "Azerbaijan", code: "+994", flag: "🇦🇿" },
    { name: "Bahamas", code: "+1", flag: "🇧🇸" },
    { name: "Bahrain", code: "+973", flag: "🇧🇭" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { name: "Barbados", code: "+1", flag: "🇧🇧" },
    { name: "Belarus", code: "+375", flag: "🇧🇾" },
    { name: "Belgium", code: "+32", flag: "🇧🇪" },
    { name: "Belize", code: "+501", flag: "🇧🇿" },
    { name: "Benin", code: "+229", flag: "🇧🇯" },
    { name: "Bhutan", code: "+975", flag: "🇧🇹" },
    { name: "Bolivia", code: "+591", flag: "🇧🇴" },
    { name: "Bosnia and Herzegovina", code: "+387", flag: "🇧🇦" },
    { name: "Botswana", code: "+267", flag: "🇧🇼" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "Brunei", code: "+673", flag: "🇧🇳" },
    { name: "Bulgaria", code: "+359", flag: "🇧🇬" },
    { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
    { name: "Burundi", code: "+257", flag: "🇧🇮" },
    { name: "Cambodia", code: "+855", flag: "🇰🇭" },
    { name: "Cameroon", code: "+237", flag: "🇨🇲" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Cape Verde", code: "+238", flag: "🇨🇻" },
    { name: "Central African Republic", code: "+236", flag: "🇨🇫" },
    { name: "Chad", code: "+235", flag: "🇹🇩" },
    { name: "Chile", code: "+56", flag: "🇨🇱" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Colombia", code: "+57", flag: "🇨🇴" },
    { name: "Comoros", code: "+269", flag: "🇰🇲" },
    { name: "Congo", code: "+242", flag: "🇨🇬" },
    { name: "Costa Rica", code: "+506", flag: "🇨🇷" },
    { name: "Croatia", code: "+385", flag: "🇭🇷" },
    { name: "Cuba", code: "+53", flag: "🇨🇺" },
    { name: "Cyprus", code: "+357", flag: "🇨🇾" },
    { name: "Czech Republic", code: "+420", flag: "🇨🇿" },
    { name: "Denmark", code: "+45", flag: "🇩🇰" },
    { name: "Djibouti", code: "+253", flag: "🇩🇯" },
    { name: "Dominica", code: "+1", flag: "🇩🇲" },
    { name: "Dominican Republic", code: "+1", flag: "🇩🇴" },
    { name: "Ecuador", code: "+593", flag: "🇪🇨" },
    { name: "Egypt", code: "+20", flag: "🇪🇬" },
    { name: "El Salvador", code: "+503", flag: "🇸🇻" },
    { name: "Equatorial Guinea", code: "+240", flag: "🇬🇶" },
    { name: "Eritrea", code: "+291", flag: "🇪🇷" },
    { name: "Estonia", code: "+372", flag: "🇪🇪" },
    { name: "Ethiopia", code: "+251", flag: "🇪🇹" },
    { name: "Fiji", code: "+679", flag: "🇫🇯" },
    { name: "Finland", code: "+358", flag: "🇫🇮" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Gabon", code: "+241", flag: "🇬🇦" },
    { name: "Gambia", code: "+220", flag: "🇬🇲" },
    { name: "Georgia", code: "+995", flag: "🇬🇪" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Greece", code: "+30", flag: "🇬🇷" },
    { name: "Grenada", code: "+1", flag: "🇬🇩" },
    { name: "Guatemala", code: "+502", flag: "🇬🇹" },
    { name: "Guinea", code: "+224", flag: "🇬🇳" },
    { name: "Guinea-Bissau", code: "+245", flag: "🇬🇼" },
    { name: "Guyana", code: "+592", flag: "🇬🇾" },
    { name: "Haiti", code: "+509", flag: "🇭🇹" },
    { name: "Honduras", code: "+504", flag: "🇭🇳" },
    { name: "Hungary", code: "+36", flag: "🇭🇺" },
    { name: "Iceland", code: "+354", flag: "🇮🇸" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Indonesia", code: "+62", flag: "🇮🇩" },
    { name: "Iran", code: "+98", flag: "🇮🇷" },
    { name: "Iraq", code: "+964", flag: "🇮🇶" },
    { name: "Ireland", code: "+353", flag: "🇮🇪" },
    { name: "Israel", code: "+972", flag: "🇮🇱" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    { name: "Jamaica", code: "+1", flag: "🇯🇲" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "Jordan", code: "+962", flag: "🇯🇴" },
    { name: "Kazakhstan", code: "+7", flag: "🇰🇿" },
    { name: "Kenya", code: "+254", flag: "🇰🇪" },
    { name: "Kiribati", code: "+686", flag: "🇰🇮" },
    { name: "Korea, North", code: "+850", flag: "🇰🇵" },
    { name: "Korea, South", code: "+82", flag: "🇰🇷" },
    { name: "Kuwait", code: "+965", flag: "🇰🇼" },
    { name: "Kyrgyzstan", code: "+996", flag: "🇰🇬" },
    { name: "Laos", code: "+856", flag: "🇱🇦" },
    { name: "Latvia", code: "+371", flag: "🇱🇻" },
    { name: "Lebanon", code: "+961", flag: "🇱🇧" },
    { name: "Lesotho", code: "+266", flag: "🇱🇸" },
    { name: "Liberia", code: "+231", flag: "🇱🇷" },
    { name: "Libya", code: "+218", flag: "🇱🇾" },
    { name: "Liechtenstein", code: "+423", flag: "🇱🇮" },
    { name: "Lithuania", code: "+370", flag: "🇱🇹" },
    { name: "Luxembourg", code: "+352", flag: "🇱🇺" },
    { name: "Macedonia", code: "+389", flag: "🇲🇰" },
    { name: "Madagascar", code: "+261", flag: "🇲🇬" },
    { name: "Malawi", code: "+265", flag: "🇲🇼" },
    { name: "Malaysia", code: "+60", flag: "🇲🇾" },
    { name: "Maldives", code: "+960", flag: "🇲🇻" },
    { name: "Mali", code: "+223", flag: "🇲🇱" },
    { name: "Malta", code: "+356", flag: "🇲🇹" },
    { name: "Marshall Islands", code: "+692", flag: "🇲🇭" },
    { name: "Mauritania", code: "+222", flag: "🇲🇷" },
    { name: "Mauritius", code: "+230", flag: "🇲🇺" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Micronesia", code: "+691", flag: "🇫🇲" },
    { name: "Moldova", code: "+373", flag: "🇲🇩" },
    { name: "Monaco", code: "+377", flag: "🇲🇨" },
    { name: "Mongolia", code: "+976", flag: "🇲🇳" },
    { name: "Montenegro", code: "+382", flag: "🇲🇪" },
    { name: "Morocco", code: "+212", flag: "🇲🇦" },
    { name: "Mozambique", code: "+258", flag: "🇲🇿" },
    { name: "Myanmar", code: "+95", flag: "🇲🇲" },
    { name: "Namibia", code: "+264", flag: "🇳🇦" },
    { name: "Nauru", code: "+674", flag: "🇳🇷" },
    { name: "Nepal", code: "+977", flag: "🇳🇵" },
    { name: "Netherlands", code: "+31", flag: "🇳🇱" },
    { name: "New Zealand", code: "+64", flag: "🇳🇿" },
    { name: "Nicaragua", code: "+505", flag: "🇳🇮" },
    { name: "Niger", code: "+227", flag: "🇳🇪" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "Norway", code: "+47", flag: "🇳🇴" },
    { name: "Oman", code: "+968", flag: "🇴🇲" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "Palau", code: "+680", flag: "🇵🇼" },
    { name: "Panama", code: "+507", flag: "🇵🇦" },
    { name: "Papua New Guinea", code: "+675", flag: "🇵🇬" },
    { name: "Paraguay", code: "+595", flag: "🇵🇾" },
    { name: "Peru", code: "+51", flag: "🇵🇪" },
    { name: "Philippines", code: "+63", flag: "🇵🇭" },
    { name: "Poland", code: "+48", flag: "🇵🇱" },
    { name: "Portugal", code: "+351", flag: "🇵🇹" },
    { name: "Qatar", code: "+974", flag: "🇶🇦" },
    { name: "Romania", code: "+40", flag: "🇷🇴" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "Rwanda", code: "+250", flag: "🇷🇼" },
    { name: "Saint Kitts and Nevis", code: "+1", flag: "🇰🇳" },
    { name: "Saint Lucia", code: "+1", flag: "🇱🇨" },
    { name: "Saint Vincent", code: "+1", flag: "🇻🇨" },
    { name: "Samoa", code: "+685", flag: "🇼🇸" },
    { name: "San Marino", code: "+378", flag: "🇸🇲" },
    { name: "Sao Tome and Principe", code: "+239", flag: "🇸🇹" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "Senegal", code: "+221", flag: "🇸🇳" },
    { name: "Serbia", code: "+381", flag: "🇷🇸" },
    { name: "Seychelles", code: "+248", flag: "🇸🇨" },
    { name: "Sierra Leone", code: "+232", flag: "🇸🇱" },
    { name: "Singapore", code: "+65", flag: "🇸🇬" },
    { name: "Slovakia", code: "+421", flag: "🇸🇰" },
    { name: "Slovenia", code: "+386", flag: "🇸🇮" },
    { name: "Solomon Islands", code: "+677", flag: "🇸🇧" },
    { name: "Somalia", code: "+252", flag: "🇸🇴" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "South Sudan", code: "+211", flag: "🇸🇸" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "Sri Lanka", code: "+94", flag: "🇱🇰" },
    { name: "Sudan", code: "+249", flag: "🇸🇩" },
    { name: "Suriname", code: "+597", flag: "🇸🇷" },
    { name: "Swaziland", code: "+268", flag: "🇸🇿" },
    { name: "Sweden", code: "+46", flag: "🇸🇪" },
    { name: "Switzerland", code: "+41", flag: "🇨🇭" },
    { name: "Syria", code: "+963", flag: "🇸🇾" },
    { name: "Taiwan", code: "+886", flag: "🇹🇼" },
    { name: "Tajikistan", code: "+992", flag: "🇹🇯" },
    { name: "Tanzania", code: "+255", flag: "🇹🇿" },
    { name: "Thailand", code: "+66", flag: "🇹🇭" },
    { name: "Togo", code: "+228", flag: "🇹🇬" },
    { name: "Tonga", code: "+676", flag: "🇹🇴" },
    { name: "Trinidad and Tobago", code: "+1", flag: "🇹🇹" },
    { name: "Tunisia", code: "+216", flag: "🇹🇳" },
    { name: "Turkey", code: "+90", flag: "🇹🇷" },
    { name: "Turkmenistan", code: "+993", flag: "🇹🇲" },
    { name: "Tuvalu", code: "+688", flag: "🇹🇻" },
    { name: "Uganda", code: "+256", flag: "🇺🇬" },
    { name: "Ukraine", code: "+380", flag: "🇺🇦" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "Uruguay", code: "+598", flag: "🇺🇾" },
    { name: "Uzbekistan", code: "+998", flag: "🇺🇿" },
    { name: "Vanuatu", code: "+678", flag: "🇻🇺" },
    { name: "Vatican City", code: "+379", flag: "🇻🇦" },
    { name: "Venezuela", code: "+58", flag: "🇻🇪" },
    { name: "Vietnam", code: "+84", flag: "🇻🇳" },
    { name: "Yemen", code: "+967", flag: "🇾🇪" },
    { name: "Zambia", code: "+260", flag: "🇿🇲" },
    { name: "Zimbabwe", code: "+263", flag: "🇿🇼" },
].sort((a, b) => a.name.localeCompare(b.name));

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        countryCode: "+966",
        phone: "",
        email: "",
        service: "AI Agent",
        message: "",
        formName: "AI Agent Form",
    });
    const [progress, setProgress] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fields = Object.values(formData);
        const filledFields = fields.filter((field) => field.trim() !== "").length;
        setProgress((filledFields / fields.length) * 100);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // Only allow numbers
            const onlyNums = value.replace(/[^0-9]/g, "");
            setFormData((prev) => ({ ...prev, [name]: onlyNums }));
            return;
        }

        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("https://n8n.srv1587679.hstgr.cloud/webhook/main-contact-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        } catch (error) {
            console.error("Form submission failed:", error);
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden bg-white">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-200/50 blur-[120px]" />
            </div>

            <div className="container relative z-10 px-4 mx-auto">
                <div className="grid gap-16 lg:grid-cols-2 items-center">

                    {/* Left Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight">
                            One Step Away <br />
                            <span className="text-violet-600">
                                From Transformation
                            </span>
                        </h2>

                        <p className="text-slate-600 text-lg mb-12 max-w-lg">
                            Whether you want a free consultation or partnership info — our team is ready to accelerate your journey.
                        </p>
                    </motion.div>

                    {/* Right Side: Form Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 relative overflow-hidden">

                            {/* Progress Bar */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                                <motion.div
                                    className="h-full bg-violet-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <label className="text-sm font-semibold text-slate-700 mb-2 block">Full Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="e.g. Mohammed Al-Otaibi"
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number</label>
                                                    <div className="flex gap-2">
                                                        <div className="relative w-32 shrink-0">
                                                            <select
                                                                name="countryCode"
                                                                value={formData.countryCode}
                                                                onChange={handleChange}
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-3 pr-8 text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all cursor-pointer text-sm"
                                                            >
                                                                {countries.map((c) => (
                                                                    <option key={c.code + c.name} value={c.code}>
                                                                        {c.flag} {c.code}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>
                                                        <div className="relative flex-1">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                            <input
                                                                type="tel"
                                                                name="phone"
                                                                required
                                                                value={formData.phone}
                                                                onChange={handleChange}
                                                                placeholder="5X XXX XXXX"
                                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="relative">
                                                    <label className="text-sm font-semibold text-slate-700 mb-2 block">Email</label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="email@company.com"
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <label className="text-sm font-semibold text-slate-700 mb-2 block">Service Type</label>
                                                <div className="relative">
                                                    <Settings className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                                    <select
                                                        name="service"
                                                        value={formData.service}
                                                        onChange={handleChange}
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-10 text-slate-900 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all cursor-pointer"
                                                    >
                                                        <option value="">Choose a service...</option>
                                                        <option value="agent">AI Chat Agent</option>
                                                        <option value="crm">CRM System</option>

                                                        <option value="website">Website Development</option>
                                                        <option value="partnership">Partnership Program</option>
                                                        <option value="consultation">Free Consultation</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <label className="text-sm font-semibold text-slate-700 mb-2 block">What is on your mind?</label>
                                                <div className="relative">
                                                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                                                    <textarea
                                                        name="message"
                                                        rows={4}
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        placeholder="Tell us more about your business and what you need..."
                                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all resize-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-200 flex items-center justify-center gap-2 group transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    Send Your Request
                                                </>
                                            )}
                                        </motion.button>

                                        <p className="text-center text-xs text-slate-500 font-medium">
                                            ✓ Our team typically responds within 2 business hours
                                        </p>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                            className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner"
                                        >
                                            <CheckCircle2 className="w-12 h-12" />
                                        </motion.div>
                                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Submitted Successfully!</h3>
                                        <p className="text-slate-600 max-w-xs mb-8">
                                            Thank you for reaching out. Our team has received your request and will contact you shortly.
                                        </p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                setFormData({ name: "", countryCode: "+966", phone: "", email: "", service: "", message: "", formName: "AI Agent Form" });
                                            }}
                                            className="text-violet-600 font-bold flex items-center gap-2 hover:text-violet-700 transition-colors"
                                        >
                                            Send another message
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;