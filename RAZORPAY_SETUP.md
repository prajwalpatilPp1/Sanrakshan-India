# Razorpay Payment Gateway Setup

## Steps to Enable Donations:

### 1. Create Razorpay Account
1. Go to https://razorpay.com/
2. Click "Sign Up" and create an account
3. Complete KYC verification (required for live payments)

### 2. Get API Keys
1. Login to Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test Keys (for testing)
4. Generate Live Keys (for production)

### 3. Update donation.html
Replace `YOUR_RAZORPAY_KEY_ID` in donation.html with your actual Razorpay Key ID:

```javascript
key: 'rzp_test_XXXXXXXXXXXXX', // For testing
// OR
key: 'rzp_live_XXXXXXXXXXXXX', // For production
```

### 4. Test Mode vs Live Mode
- **Test Mode**: Use test key for development
  - Test cards: https://razorpay.com/docs/payments/payments/test-card-details/
- **Live Mode**: Use live key after KYC approval
  - Real payments will be processed

### 5. Webhook Setup (Optional but Recommended)
1. Go to Settings → Webhooks in Razorpay Dashboard
2. Add your server URL to receive payment notifications
3. Handle payment success/failure on your backend

### 6. Important Notes
- Razorpay charges 2% + GST per transaction
- Minimum amount: ₹10
- Supports UPI, Cards, Net Banking, Wallets
- Automatic 80G certificate generation available

### 7. Current Implementation
The donation form now includes:
- ✅ Name, Email, Phone fields
- ✅ Preset amounts: ₹500, ₹1000, ₹2000, ₹5000
- ✅ Custom amount input
- ✅ Razorpay payment integration
- ✅ Mobile-responsive design

### Need Help?
- Razorpay Docs: https://razorpay.com/docs/
- Support: support@razorpay.com
