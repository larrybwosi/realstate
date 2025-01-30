// lib/mpesa-utils.ts

/**
 * Generates the M-Pesa API password using the shortcode, passkey, and timestamp
 */
export function generateMpesaPassword(): string {
  const timestamp = generateMpesaTimestamp();
  const password = Buffer.from(
    `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");
  return password;
}

/**
 * Generates the M-Pesa API timestamp in the required format
 */
export function generateMpesaTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[-:.]/g, "")
    .slice(0, -5);
}


/**
 * Validates an M-Pesa phone number format (2547XXXXXXXX)
 */
export function validateMpesaPhoneNumber(phoneNumber: string): boolean {
  return /^2547\d{8}$/.test(phoneNumber);
}

/**
 * Formats a phone number to the M-Pesa format (2547XXXXXXXX)
 */
export function formatMpesaPhoneNumber(phoneNumber: string): string {
  // Remove any non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  // Convert to 254 format if it starts with 0 or 7
  if (cleaned.startsWith("0")) {
    return `254${cleaned.slice(1)}`;
  } else if (cleaned.startsWith("7")) {
    return `254${cleaned}`;
  }

  // Return as-is if already in 254 format
  return cleaned;
}

// Environment validation at startup
function validateEnv() {
  const requiredEnvVars = [
    "MPESA_CONSUMER_KEY",
    "MPESA_CONSUMER_SECRET",
    "MPESA_SHORTCODE",
    "MPESA_PASSKEY",
    "MPESA_API_URL"
  ];

  const missing = requiredEnvVars.filter(v => !process.env[v]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
// validateEnv()