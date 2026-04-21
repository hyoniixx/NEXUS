import React from 'react'
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";



export function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-6">
                {/* Logo Animation */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-gold via-primary to-challenger flex items-center justify-center shadow-2xl"
                    >
                        <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>

                    {/* Glow Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-gold via-primary to-challenger blur-xl opacity-50"
                    />
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center"
                >
                    <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-gold via-primary to-challenger bg-clip-text text-transparent">
                        NEXUS
                    </h1>
                    <p className="text-muted-foreground text-lg">로딩 중...</p>
                </motion.div>

                {/* Loading Dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-2"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                            }}
                            className="w-3 h-3 rounded-full bg-primary"
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
export default Loading