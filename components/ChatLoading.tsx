"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export const ChatLoading = () => {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-[#F8F5FF]">
      {/* Logo animado */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-[#6C5CE7] to-[#A29BFE] shadow-lg"
          animate={{
            boxShadow: [
              "0 10px 40px rgba(108, 92, 231, 0.3)",
              "0 10px 60px rgba(108, 92, 231, 0.5)",
              "0 10px 40px rgba(108, 92, 231, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageCircle className="h-10 w-10 text-white" />
        </motion.div>
        
        {/* Pulsos saindo do logo */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-2xl border-2 border-[#6C5CE7]"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>

      {/* Texto de carregamento */}
      <motion.h2
        className="mb-2 text-xl font-semibold text-[#1A1A2E]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Carregando conversa
      </motion.h2>

      {/* Dots animados */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-[#6C5CE7]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Skeleton das mensagens */}
      <motion.div
        className="mt-12 w-full max-w-md px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Mensagem recebida skeleton */}
        <div className="mb-4 flex items-end gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#E0D8F0]" />
          <div className="flex flex-col gap-2">
            <motion.div
              className="h-10 w-48 rounded-2xl rounded-bl-md bg-[#E0D8F0]"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="h-6 w-32 rounded-2xl rounded-bl-md bg-[#E0D8F0]"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </div>
        </div>

        {/* Mensagem enviada skeleton */}
        <div className="mb-4 flex justify-end">
          <div className="flex flex-col items-end gap-2">
            <motion.div
              className="h-10 w-44 rounded-2xl rounded-br-md bg-linear-to-r from-[#6C5CE7]/30 to-[#A29BFE]/30"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            />
          </div>
        </div>

        {/* Mensagem recebida skeleton */}
        <div className="mb-4 flex items-end gap-2">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#E0D8F0]" />
          <div className="flex flex-col gap-2">
            <motion.div
              className="h-16 w-56 rounded-2xl rounded-bl-md bg-[#E0D8F0]"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>

        {/* Mensagem enviada skeleton */}
        <div className="flex justify-end">
          <div className="flex flex-col items-end gap-2">
            <motion.div
              className="h-8 w-36 rounded-2xl rounded-br-md bg-linear-to-r from-[#6C5CE7]/30 to-[#A29BFE]/30"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="h-10 w-52 rounded-2xl rounded-br-md bg-linear-to-r from-[#6C5CE7]/30 to-[#A29BFE]/30"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
    )
}