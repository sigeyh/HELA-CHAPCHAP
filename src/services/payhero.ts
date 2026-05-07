// Payhero STK Push integration
const PAYHERO_API_KEY = import.meta.env.VITE_PAYHERO_API_KEY as string;
const PAYHERO_CHANNEL_ID = Number(import.meta.env.VITE_PAYHERO_MERCHANT_ID); // Channel ID from dashboard
const LIPWA_LINK = 'https://lipwa.link/6902';

// Route through Vite proxy to avoid CORS (see vite.config.ts)
const PAYHERO_API_URL = '/api/payhero/payments';

interface STKPushResponse {
  success: boolean;
  message?: string;
  data?: {
    transaction_id?: string;
    checkout_url?: string;
    status?: string;
  };
  error?: string;
}

/**
 * Generates a short, human-readable reference like "HELA-K3X7P"
 */
export const generateReference = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const suffix = Array.from({ length: 5 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
  return `HELA-${suffix}`;
};

/**
 * Normalises phone to 254XXXXXXXXX format
 */
const formatPhone = (phone: string): string => {
  let p = phone.replace(/\s/g, '');
  if (p.startsWith('0')) p = '254' + p.substring(1);
  if (!p.startsWith('254')) p = '254' + p;
  return p;
};

/**
 * Returns the correct Authorization header.
 * Trying raw API key as some versions of Payhero don't use 'Basic' or 'Bearer'.
 */
const getAuthHeader = (): string => {
  return PAYHERO_API_KEY;
};

export { LIPWA_LINK };

/**
 * Builds a Lipwa URL with autofill query params.
 */
export const buildLipwaUrl = (
  phone: string,
  amount: number,
  name: string,
  reference: string
): string => {
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || firstName;
  const formattedPhone = formatPhone(phone);

  const params = new URLSearchParams({
    // Shorthand params for lipwa.link
    a: String(amount),
    p: formattedPhone,
    r: reference,
    n: name,
    auto: '1',
    submit: '1',
    // Full params
    amount: String(amount),
    phone: formattedPhone,
    reference: reference,
    name: name,
    first_name: firstName,
    last_name: lastName,
    customer_name: name,
    customer_phone: formattedPhone,
    account: reference,
  });
  
  return `${LIPWA_LINK}?${params.toString()}`;
};

/**
 * Initiates an M-Pesa STK Push via Payhero API v2.
 * - Sends the push directly to the user's phone (no Lipwa page needed).
 * - Falls back to autofilled Lipwa link if the API call fails.
 */
export const initiateLipwa = async (
  phone: string,
  amount: number,
  name: string = '',
  reference?: string
): Promise<STKPushResponse & { reference: string }> => {
  const ref = reference || generateReference();
  const formattedPhone = formatPhone(phone);

  try {
    // Payhero v2 STK Push payload — uses channel_id, not till_number
    const payload = {
      amount,
      phone_number: formattedPhone,
      channel_id: PAYHERO_CHANNEL_ID,
      till_number: String(PAYHERO_CHANNEL_ID),
      merchant_id: String(PAYHERO_CHANNEL_ID),
      external_reference: ref,
      reference: ref,
      provider: 'm-pesa',
      callback_url: 'https://example.com',
    };

    console.log('[Payhero] Initiating STK Push:', { phone: formattedPhone, amount, ref, channel_id: PAYHERO_CHANNEL_ID });

    const response = await fetch(PAYHERO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthHeader(),
        'x-api-key': PAYHERO_API_KEY,
        'Merchant-ID': String(PAYHERO_CHANNEL_ID),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    console.log('[Payhero] Response:', response.status, data);

    if (response.ok) {
      // STK Push sent — user will get M-Pesa prompt on their phone
      return {
        success: true,
        message: 'M-Pesa prompt sent to your phone',
        reference: ref,
        data: {
          checkout_url: buildLipwaUrl(phone, amount, name, ref), // Fallback if needed
          transaction_id: data.reference,
        },
      };
    }

    // API failed — use autofilled Lipwa link
    console.warn('[Payhero] API failed, falling back to Lipwa link:', data);
    return {
      success: false,
      reference: ref,
      error: data.message || `Payhero error ${response.status}`,
      data: {
        checkout_url: buildLipwaUrl(phone, amount, name, ref),
      },
    };
  } catch (error: any) {
    console.error('[Payhero] Network error:', error);
    return {
      success: false,
      reference: ref,
      error: error.message || 'Network error. Please try again.',
      data: {
        checkout_url: buildLipwaUrl(phone, amount, name, ref),
      },
    };
  }
};

export const initiateSTKPush = initiateLipwa;

export const checkPaymentStatus = async (transactionId: string): Promise<STKPushResponse> => {
  try {
    const response = await fetch(`/api/payhero/transaction-status?reference=${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': getAuthHeader(),
        'x-api-key': PAYHERO_API_KEY,
        'Merchant-ID': String(PAYHERO_CHANNEL_ID),
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    const data = await response.json();
    return {
      success: data.status === 'SUCCESS',
      message: data.message,
      data: { status: data.status },
    };
  } catch (error: any) {
    console.error('Payment Status Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to check payment status',
    };
  }
};
