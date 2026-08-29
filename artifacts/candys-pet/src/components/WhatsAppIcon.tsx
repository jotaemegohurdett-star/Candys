import { FaWhatsapp } from 'react-icons/fa';

type WhatsAppIconProps = {
  className?: string;
};

export function WhatsAppIcon({ className = 'h-5 w-5' }: WhatsAppIconProps) {
  return <FaWhatsapp className={className} aria-hidden="true" focusable="false" />;
}