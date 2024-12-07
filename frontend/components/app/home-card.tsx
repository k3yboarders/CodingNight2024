'use client';

import React from "react";
import { motion } from "framer-motion";

type HomeCardProps = {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactNode;
    endItem?: React.ReactNode;
};

export const HomeCard: React.FC<HomeCardProps> = ({ children, title, icon, endItem }) => {
    return (
        <motion.div
            className="flex flex-col bg-gray-400/10 rounded-lg p-6 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex justify-between items-center mb-3">
                <div className="flex gap-2 items-center">
                    {icon}
                    <h2 className="text-2xl">{title}</h2>
                </div>
                <div>
                    {endItem}
                </div>
            </div>
            {children}
        </motion.div>
    );
};