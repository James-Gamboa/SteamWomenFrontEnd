import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <a
        href="https://wa.me/5215512345678"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: "#8B5CF6",
          color: "#FFFFFF",
        }}
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  )
}
