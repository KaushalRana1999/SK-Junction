import React from 'react';

const textualStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#18181b',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  lineHeight: '1.8',
  color: '#a1a1aa'
};

const ReturnPolicy = () => {
  return (
    <div style={textualStyle}>
      <h2
        style={{
          color: '#fff',
          marginBottom: '20px',
          borderBottom:
            '1px solid rgba(255,255,255,0.1)',
          paddingBottom: '15px'
        }}
      >
        Return & Refund Policy
      </h2>

      <p style={{ marginBottom: '20px' }}>
        At Zyntra, we proudly stand behind
        the quality of our merchandise.
        If for any reason you are
        completely dissatisfied with your
        purchase, you may securely
        initiate a return within 30 days
        of receiving your order.
      </p>

      <h4
        style={{
          color: '#f97316',
          marginTop: '25px',
          marginBottom: '10px'
        }}
      >
        1. Eligibility for Returns
      </h4>

      <p style={{ marginBottom: '15px' }}>
        To be eligible for a return, the
        item must be completely unused,
        housed in the same condition that
        it was received, and maintained
        within its original factory
        packaging. Receipts or proof of
        purchase are strictly required.
      </p>

      <h4
        style={{
          color: '#f97316',
          marginTop: '25px',
          marginBottom: '10px'
        }}
      >
        2. Refund Processing
      </h4>

      <p style={{ marginBottom: '15px' }}>
        Once your return is physically
        received and internally
        inspected, an email notification
        will be sent informing you of the
        approval status. Approved refunds
        will be processed to your
        original Razorpay payment method
        within 5–7 business days.
      </p>

      <h4
        style={{
          color: '#f97316',
          marginTop: '25px',
          marginBottom: '10px'
        }}
      >
        3. Exempted Products
      </h4>

      <p style={{ marginBottom: '15px' }}>
        Certain categories such as
        perishable items, custom
        software, digital media, or
        physically damaged/tampered items
        are restricted and may not
        qualify for standard refund
        processing.
      </p>

      <h4
        style={{
          color: '#f97316',
          marginTop: '25px',
          marginBottom: '10px'
        }}
      >
        4. Shipping Transit Costs
      </h4>

      <p>
        Customers remain responsible for
        covering outbound shipping costs
        associated with returning an
        item. Restocking fees may
        conditionally apply depending on
        product category and inspection
        outcome.
      </p>
    </div>
  );
};

export default ReturnPolicy;