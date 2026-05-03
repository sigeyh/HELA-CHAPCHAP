// Payhero STK Push integration
const PAYHERO_API_KEY = import.meta.env.VITE_PAYHERO_API_KEY as string;
const PAYHERO_MERCHANT_ID = import.meta.env.VITE_PAYHERO_MERCHANT_ID as string;
const PAYHERO_TILL_NUMBER = import.meta.env.VITE_PAYHERO_TILL_NUMBER as string;
const PAYHERO_TILL_NAME = 'HAKIKA R PROVISION';
const LIPWA_LINK = 'https://short.payhero.co.ke/s/cNQKbWqAMQbmh72LRmLXmk';

// Use Vite proxy to avoid CORS issues
const PAYHERO_BASE_URL = '/api/payhero';

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

interface InitiateSTKPushParams {
  phone: string;
  amount: number;
  reference?: string;
  description?: string;
}

export const initiateSTKPush = async (
  phone: string, 
  amount: number,
  reference?: string,
  description?: string
): Promise<STKPushResponse> => {
  try {
    // Format phone number (remove any spaces and ensure it starts with 254)
    let formattedPhone = phone.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const payload = {
      phone_number: formattedPhone,
      amount: amount,
      reference: reference || `HAKIKARPROVISION-${Date.now()}`,
      description: description || `${PAYHERO_TILL_NAME} Service Fee`,
      till_number: PAYHERO_TILL_NUMBER,
    };

    const response = await fetch(`${PAYHERO_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYHERO_API_KEY}`,
        'Merchant-ID': PAYHERO_MERCHANT_ID,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'STK Push initiated successfully',
      data: {
        transaction_id: data.transaction_id,
        checkout_url: data.checkout_url,
        status: data.status,
      },
    };
  } catch (error: any) {
    console.error('Payhero STK Push Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to initiate STK Push. Please try again.',
    };
  }
};

// Check payment status
export const checkPaymentStatus = async (transactionId: string): Promise<STKPushResponse> => {
  try {
    const response = await fetch(`${PAYHERO_BASE_URL}/payments/${transactionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${PAYHERO_API_KEY}`,
        'Merchant-ID': PAYHERO_MERCHANT_ID,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }

    const data = await response.json();
    
    return {
      success: data.status === 'completed',
      message: data.message,
      data: {
        status: data.status,
      },
    };
  } catch (error: any) {
    console.error('Payment Status Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to check payment status',
    };
  }
};

export { LIPWA_LINK };

export const initiateLipwa = async (
  phone: string,
  amount: number
): Promise<STKPushResponse> => {
  try {
    let formattedPhone = phone.replace(/\s/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    const payload = {
      phone_number: formattedPhone,
      amount: amount,
      reference: `HAKIKARPROVISION-${Date.now()}`,
      description: `${PAYHERO_TILL_NAME} Service Fee`,
      till_number: PAYHERO_TILL_NUMBER,
    };

    const response = await fetch(`${PAYHERO_BASE_URL}/lipwa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PAYHERO_API_KEY}`,
        'Merchant-ID': PAYHERO_MERCHANT_ID,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      message: 'Lipwa initiated successfully',
      data: {
        checkout_url: data.checkout_url || LIPWA_LINK,
        transaction_id: data.transaction_id,
      },
    };
  } catch (error: any) {
    console.error('Payhero Lipwa Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to initiate Lipwa. Please try again.',
    };
  }
};


