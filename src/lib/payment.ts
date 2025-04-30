declare global {
  interface Window {
    Razorpay: any;
  }
}

export interface PaymentOptions {
  amount: number;
  projectId?: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
}

export const initializePayment = async (options: PaymentOptions) => {
  try {
    // First, create an order on your server
    const orderResponse = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: options.amount,
        projectId: options.projectId,
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderData.id) {
      throw new Error('Failed to create order');
    }

    // Load Razorpay SDK
    await loadRazorpayScript();

    // Initialize Razorpay payment
    const razorpay = new window.Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: options.amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Sri Veera Brahmendra Swamy Temple',
      description: options.projectId ? 'Temple Development Project Donation' : 'Temple Donation',
      order_id: orderData.id,
      prefill: {
        name: options.donorName,
        email: options.donorEmail,
        contact: options.donorPhone,
      },
      theme: {
        color: '#9F2420', // temple-primary color
      },
      handler: async function (response: any) {
        // Verify payment on server
        const verificationResponse = await fetch('/api/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            amount: options.amount,
            projectId: options.projectId,
            donorName: options.donorName,
            donorEmail: options.donorEmail,
            donorPhone: options.donorPhone,
          }),
        });

        const verificationData = await verificationResponse.json();

        if (verificationData.success) {
          // Show success message or redirect to thank you page
          window.location.href = `/thank-you?payment_id=${response.razorpay_payment_id}`;
        } else {
          throw new Error('Payment verification failed');
        }
      },
    });

    razorpay.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    throw error;
  }
};

const loadRazorpayScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
}; 