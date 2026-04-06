"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

const messages = [
  { id: 1, text: "Oi! Tudo bem? 👋", sender: "other", delay: 0 },
  { id: 2, text: "Oi! Tudo ótimo, e você?", sender: "user", delay: 0.5 },
  { id: 3, text: "Bem também! Vamos conversar?", sender: "other", delay: 1 },
  { id: 4, text: "Claro! O que você quer falar?", sender: "user", delay: 1.5 },
]

export function ChatPreview() {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Phone Frame */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateY: -15 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-white rounded-[40px] p-3 shadow-2xl shadow-[#6C5CE7]/20"
        style={{ perspective: "1000px" }}
      >
        {/* Screen */}
        <div className="bg-[#F8F5FF] rounded-4xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#6C5CE7] px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Chatwme</h3>
              <p className="text-white/70 text-xs">Online agora</p>
            </div>
            <div className="ml-auto flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#00CEC9]" />
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 min-h-70">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: message.delay + 0.5 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    message.sender === "user"
                      ? "bg-[#6C5CE7] text-white rounded-br-md"
                      : "bg-white text-[#1A1A2E] rounded-bl-md shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}

            {/* Typing Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex justify-start"
            >
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-[#6B6B8D] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#6B6B8D] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#6B6B8D] rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Input Bar */}
          <div className="px-4 pb-4">
            <div className="bg-white rounded-full px-4 py-3 flex items-center gap-2 shadow-sm">
              <span className="text-[#6B6B8D] text-sm flex-1">Digite uma mensagem...</span>
              <div className="w-8 h-8 rounded-full bg-[#6C5CE7] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -top-6 -right-6 w-16 h-16 bg-[#00CEC9] rounded-2xl flex items-center justify-center shadow-lg shadow-[#00CEC9]/30 rotate-12"
      >
        <span className="text-2xl">💬</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-[#6C5CE7] rounded-xl flex items-center justify-center shadow-lg shadow-[#6C5CE7]/30 -rotate-12"
      >
        <span className="text-xl">✨</span>
      </motion.div>
    </div>
  )
}
