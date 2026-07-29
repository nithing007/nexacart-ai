/**
 * Invoice Generator Utility for NexaCart AI
 * Renders and triggers download / print for professional e-commerce invoices
 */

export const generateInvoicePDF = (order, paymentDetails = {}) => {
  if (!order) return;

  const invoiceNum = `INV-${order._id ? order._id.substring(order._id.length - 8).toUpperCase() : Date.now()}`;
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : new Date().toLocaleDateString('en-IN');

  const customerName = order.user ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() || 'Valued Customer' : 'Valued Customer';
  const customerEmail = order.user?.email || 'N/A';
  const shippingAddr = order.shippingAddress || 'Address on file';
  const paymentMethod = order.paymentMethod || paymentDetails.paymentMethod || 'UPI QR Payment';
  const transactionId = order.upiTransactionRef || order.paymentResult?.id || paymentDetails.transactionId || paymentDetails.upiTransactionRef || `UTR_${Date.now()}`;

  const itemsHtml = (order.orderItems || []).map((item, idx) => `
    <tr style="border-bottom: 1px solid #f1f5f9;">
      <td style="padding: 12px; font-weight: 600; color: #1e293b;">${idx + 1}</td>
      <td style="padding: 12px; color: #0f172a; font-weight: 500;">${item.name}</td>
      <td style="padding: 12px; text-align: center; color: #475569;">${item.quantity}</td>
      <td style="padding: 12px; text-align: right; color: #475569;">₹${(item.price || 0).toLocaleString('en-IN')}</td>
      <td style="padding: 12px; text-align: right; font-weight: 700; color: #0f172a;">₹${((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const invoiceWindow = window.open('', '_blank');
  
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>NexaCart AI Invoice - ${invoiceNum}</title>
        <meta charset="utf-8" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
          body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 40px;
            color: #0f172a;
            background-color: #ffffff;
          }
          .invoice-card {
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #e2e8f0;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #10b981;
            padding-bottom: 24px;
            margin-bottom: 32px;
          }
          .brand {
            font-size: 26px;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.5px;
          }
          .brand span {
            color: #10b981;
          }
          .badge {
            background-color: #ecfdf5;
            color: #047857;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 9999px;
            border: 1px solid #a7f3d0;
            letter-spacing: 0.5px;
          }
          .meta-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin-bottom: 32px;
            background: #f8fafc;
            padding: 24px;
            border-radius: 16px;
            border: 1px solid #f1f5f9;
          }
          .meta-item h4 {
            font-size: 11px;
            text-transform: uppercase;
            color: #64748b;
            margin: 0 0 6px 0;
            letter-spacing: 0.5px;
          }
          .meta-item p {
            font-size: 14px;
            font-weight: 700;
            color: #0f172a;
            margin: 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 32px;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 12px;
            text-align: left;
          }
          th:nth-child(3) { text-align: center; }
          th:nth-child(4), th:nth-child(5) { text-align: right; }
          .totals-table {
            width: 320px;
            margin-left: auto;
            margin-bottom: 32px;
          }
          .totals-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            font-size: 13px;
            color: #475569;
          }
          .totals-row.grand {
            border-top: 2px solid #e2e8f0;
            padding-top: 14px;
            margin-top: 6px;
            font-size: 18px;
            font-weight: 900;
            color: #0f172a;
          }
          .totals-row.grand .amount {
            color: #059669;
          }
          .footer {
            border-top: 1px solid #e2e8f0;
            padding-top: 24px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
          }
          @media print {
            body { padding: 0; }
            .invoice-card { border: none; box-shadow: none; padding: 20px; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="invoice-card">
          <div class="header">
            <div>
              <div class="brand">NexaCart<span> AI</span></div>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Smart AI-Powered E-Commerce Platform</p>
            </div>
            <div>
              <div class="badge">TAX INVOICE</div>
              <p style="margin: 8px 0 0 0; font-size: 12px; font-weight: 700; color: #475569; text-align: right;">${invoiceNum}</p>
            </div>
          </div>

          <div class="meta-grid">
            <div class="meta-item">
              <h4>Billed To</h4>
              <p>${customerName}</p>
              <p style="font-size: 12px; font-weight: 400; color: #475569; margin-top: 4px;">${customerEmail}</p>
              <p style="font-size: 12px; font-weight: 400; color: #475569; margin-top: 2px;">${shippingAddr}</p>
            </div>
            <div class="meta-item">
              <h4>Payment Details</h4>
              <p>${paymentMethod}</p>
              <p style="font-size: 12px; font-weight: 600; color: #059669; margin-top: 4px;">UTR / Ref: ${transactionId}</p>
              <p style="font-size: 12px; font-weight: 500; color: #64748b; margin-top: 2px;">Date: ${orderDate}</p>
              <p style="font-size: 11px; font-weight: 600; color: #64748b; margin-top: 2px;">Status: ${order.isPaid ? 'PAID & VERIFIED' : 'PAYMENT SUBMITTED'}</p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="width: 40px;">#</th>
                <th>Item Description</th>
                <th style="width: 70px;">Qty</th>
                <th style="width: 120px;">Unit Price</th>
                <th style="width: 130px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <div class="totals-table">
            <div class="totals-row">
              <span>Subtotal</span>
              <span>₹${(order.itemsPrice || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="totals-row">
              <span>GST (18%)</span>
              <span>₹${(order.taxPrice || 0).toLocaleString('en-IN')}</span>
            </div>
            <div class="totals-row">
              <span>Shipping Fee</span>
              <span>${order.shippingPrice === 0 ? 'FREE' : `₹${(order.shippingPrice || 0).toLocaleString('en-IN')}`}</span>
            </div>
            <div class="totals-row grand">
              <span>Grand Total</span>
              <span class="amount">₹${(order.totalPrice || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div class="footer">
            <p style="margin-bottom: 6px; font-weight: 600; color: #64748b;">Thank you for shopping with NexaCart AI!</p>
            <p>This is a computer-generated tax invoice verified via Dynamic UPI Payment System.</p>
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `;

  invoiceWindow.document.open();
  invoiceWindow.document.write(content);
  invoiceWindow.document.close();
};
