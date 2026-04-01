import React from "react";

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps>=({
  phone = "919568755984",
  message = "Hey Rajesh, I visited your portfolio and was impressed by your projects. Id love to connect and discuss them further.",
})=>{
  const encodedMessage = encodeURIComponent(message);
  const href = `https://wa.me/${phone}${message ? `?text=${encodedMessage}` : ""}`;
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5 
        w-12 h-12 sm:w-14 sm:h-14 
        flex items-center justify-center 
        bg-[#25D366] hover:bg-[#20bc5a] 
        rounded-full shadow-[0_4px_24px_rgba(37,211,102,0.4)] 
        hover:shadow-[0_8px_32px_rgba(37,211,102,0.55)] 
        hover:scale-105 active:scale-95 
        transition-all duration-200 z-50
      "
    >
      <svg
        width="50"
        height="50"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.5 16.05C27.5 22.4 22.35 27.5 16 27.5c-1.97 0-3.82-.5-5.44-1.38L4.5 27.5l1.41-5.86A11.44 11.44 0 014.5 16.05C4.5 9.7 9.65 4.5 16 4.5c6.35 0 11.5 5.2 11.5 11.55z"
          fill="white"
        />
        <path
          d="M21.8 18.7c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.57-.49-.5-.67-.5-.17 0-.37-.02-.57-.02s-.52.07-.79.37c-.27.3-1.03 1.01-1.03 2.46s1.05 2.85 1.2 3.05c.14.2 2.06 3.15 4.99 4.42.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.76-.72 2-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
          fill="#25D366"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;