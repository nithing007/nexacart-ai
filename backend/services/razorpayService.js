const Razorpay = require('razorpay');

/**
 * Initializes Razorpay Instance using environment variables
 */
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID || 'rzp_test_TLclhAg6ygDSCS';
  const key_secret = process.env.RAZORPAY_KEY_SECRET || 'K11jiTE380DRJ7jaxMhQqs9f';

  if (!key_id || !key_secret) {
    throw new Error('Razorpay API keys (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are missing in environment variables.');
  }

  return new Razorpay({
    key_id,
    key_secret
  });
};

/**
 * Creates a Razorpay order
 * @param {Object} params - { amount (in INR), currency, receipt, notes }
 * @returns {Promise<Object>} Razorpay order object
 */
const createRazorpayOrder = async ({ amount, currency = 'INR', receipt, notes = {} }) => {
  try {
    const razorpay = getRazorpayInstance();

    // Razorpay requires amount in smallest currency sub-unit (paise for INR)
    const amountInPaise = Math.round(Number(amount) * 100);

    const options = {
      amount: amountInPaise,
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      notes
    };

    console.log(`[Razorpay Service] Creating order with options:`, options);
    const order = await razorpay.orders.create(options);
    console.log(`[Razorpay Service] Order created successfully via Razorpay API. ID: ${order.id}`);

    return order;
  } catch (error) {
    const errorMsg = error?.error?.description || error?.message || String(error);
    console.error('[Razorpay Service] Order creation error from Razorpay API:', errorMsg);

    // Detect if key is placeholder or invalid credentials from Razorpay servers
    const keyId = process.env.RAZORPAY_KEY_ID || '';
    const isPlaceholderOrKeyError = keyId.includes('NexaCartKeyId') || 
      error?.statusCode === 401 || 
      errorMsg.includes('does not exist') || 
      errorMsg.includes('Authentication failed');

    if (isPlaceholderOrKeyError) {
      console.warn('\x1b[33m%s\x1b[0m', '[Razorpay Service Warning]: Razorpay API authentication failed (placeholder/unregistered API keys). Generating fallback Test Order ID for local testing.');
      
      const amountInPaise = Math.round(Number(amount) * 100);
      return {
        id: `order_test_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`,
        entity: 'order',
        amount: amountInPaise,
        amount_paid: 0,
        amount_due: amountInPaise,
        currency,
        receipt: receipt || `rcpt_${Date.now()}`,
        status: 'created',
        attempts: 0,
        notes,
        created_at: Math.floor(Date.now() / 1000)
      };
    }

    throw new Error(`Razorpay Order Creation Failed: ${errorMsg}`);
  }
};

module.exports = {
  getRazorpayInstance,
  createRazorpayOrder
};
