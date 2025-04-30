import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Bank account details
const BANK_ACCOUNT = {
  account_number: '3757020206123',
  ifsc: 'SBIN0021921',
  beneficiary_name: 'Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust',
  bank_name: 'State Bank of India',
  branch_name: 'Atmakur'
};

export async function POST(request: Request) {
  try {
    const { amount, projectId } = await request.json();

    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        projectId: projectId || 'general_donation',
      },
      payment_capture: 1,
      // Link to the specific bank account
      transfers: [{
        account: BANK_ACCOUNT.account_number,
        amount: amount * 100,
        currency: 'INR',
        notes: {
          branch: BANK_ACCOUNT.branch_name,
          ifsc: BANK_ACCOUNT.ifsc
        }
      }]
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 