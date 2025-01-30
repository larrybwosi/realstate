import { generateMpesaPassword, generateMpesaTimestamp } from "@/utils/mpesa";


export async function getMpesaToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const response = await fetch(
    `${process.env.MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  if (!response.ok) {
    throw new Error(`MPesa auth failed: ${response.statusText}`);
  }

  const { access_token } = await response.json();
  return access_token;
}

/**
 * Checks the status of an M-Pesa payment using the checkout ID
 */
export async function checkMpesaPaymentStatus(checkoutId: string) {
  const accessToken = await getMpesaToken();

  const response = await fetch(
    `${process.env.MPESA_API_URL}/stkpushquery/v1/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: generateMpesaPassword(),
        Timestamp: generateMpesaTimestamp(),
        CheckoutRequestID: checkoutId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to check payment status: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
