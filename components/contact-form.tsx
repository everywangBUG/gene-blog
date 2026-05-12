"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    })

    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-sky-500/50">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

        <div className="relative">
          <h3 className="text-2xl font-bold mb-6">欢迎联系我，交流学习和生活</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                placeholder="你的姓名"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-sky-500 focus:ring-sky-500/20"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="你的邮箱"
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-sky-500 focus:ring-sky-500/20"
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="你想说的话"
                rows={5}
                required
                className="bg-zinc-900/50 border-zinc-700 focus:border-sky-500 focus:ring-sky-500/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-cyan-500 hover:to-sky-500 border-0"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>努力加载中...</>
              ) : (
                <>
                  发送信息 <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}
