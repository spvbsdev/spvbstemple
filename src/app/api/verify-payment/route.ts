import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { client } from '@/lib/sanity.client';

async function sendWhatsAppConfirmation(phoneNumber: string, amount: number, paymentId: string) {
  try {
    const message = `Thank you for your donation of ₹${amount} to Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust.\n\nPayment ID: ${paymentId}\n\nWe appreciate your support! 🙏`;
    
    // Call WhatsApp Business API
    const response = await fetch(`https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: { body: message }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send WhatsApp message');
    }
  } catch (error) {
    console.error('Error sending WhatsApp confirmation:', error);
    // Don't throw error to prevent payment confirmation failure
  }
}

export async function POST(request: Request) {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      amount,
      projectId,
      donorName,
      donorEmail,
      donorPhone,
    } = await request.json();

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(text)
      .digest('hex');

    if (signature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Record donation in Sanity
    await client.create({
      _type: 'donation',
      amount: amount,
      projectId: projectId,
      donorName: donorName,
      donorEmail: donorEmail,
      donorPhone: donorPhone,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      status: 'completed',
      donatedAt: new Date().toISOString(),
    });

    // If this is a project donation, update the project's raised amount
    if (projectId) {
      const project = await client.fetch(`*[_type == "project" && _id == $projectId][0]`, {
        projectId,
      });

      if (project) {
        await client
          .patch(projectId)
          .set({
            raisedAmount: (project.raisedAmount || 0) + amount,
          })
          .commit();
      }
    }

    // Send WhatsApp confirmation
    if (donorPhone) {
      // Format phone number to include country code if not present
      const formattedPhone = donorPhone.startsWith('+91') ? donorPhone : `+91${donorPhone}`;
      await sendWhatsAppConfirmation(formattedPhone, amount, razorpay_payment_id);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
} 