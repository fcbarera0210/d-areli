/**
 * Configuración centralizada para D'Areli.
 * Número de WhatsApp de Areli para cotizaciones y pedidos.
 */

export const WHATSAPP_NUMBER = "56948835522";

/**
 * Construye la URL de WhatsApp con un mensaje predefinido.
 * Abre WhatsApp (web o app) con el texto listo para enviar.
 */
export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
