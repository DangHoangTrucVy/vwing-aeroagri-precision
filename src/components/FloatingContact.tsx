import { Phone, Music2, X, MessageCircle } from "lucide-react";
import { useState } from "react";

const contacts = [
  {
    label: "Gọi điện",
    icon: Phone,
    className: "bg-green-600 hover:bg-green-700",
    href: "tel:0965782358",
  },
  {
    label: "Zalo",
    icon: null,
    className: "bg-blue-600 hover:bg-blue-700",
    href: "https://zalo.me/0965782358",
  },
  {
    label: "TikTok",
    icon: Music2,
    className: "bg-slate-900 hover:bg-black",
    href: "https://www.tiktok.com/@vivian_zy97?_r=1&_t=ZS-9AdZd9m4dMO",
  },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-1000 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col items-end gap-3">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("https://") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={item.label}
                title={item.label}
                className={`flex h-12 w-12 items-center justify-center
                  rounded-full text-white shadow-lg transition
                  hover:scale-110 ${item.className}`}
              >
                {item.label === "Zalo" ? (
                  <span className="text-xl font-extrabold tracking-tight">
                    Zalo
                  </span>
                ) : (
                  item.icon && <item.icon size={22} />
                )}
              </a>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Thu gọn liên hệ" : "Mở liên hệ"}
        className="flex h-12 w-12 items-center justify-center
          rounded-full bg-white text-slate-800 shadow-xl
          ring-1 ring-slate-200 transition hover:scale-105"
      >
        {open ? <X size={22} /> : <Phone size={22} />}
      </button>
    </div>
  );
}
