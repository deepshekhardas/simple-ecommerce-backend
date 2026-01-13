const PDFDocument = require('pdfkit');

const generateInvoice = (order, stream) => {
    const doc = new PDFDocument({ margin: 50 });

    doc.pipe(stream);

    // Header
    doc.fillColor('#444444')
        .fontSize(20)
        .text('INVOICE', 50, 57)
        .fontSize(10)
        .text('Simple Ecommerce Ltd.', 200, 50, { align: 'right' })
        .text('123 Tech Street', 200, 65, { align: 'right' })
        .text('New York, NY, 10025', 200, 80, { align: 'right' })
        .moveDown();

    // Invoice Details
    doc.fillColor('#000000')
        .fontSize(12)
        .text(`Invoice Number: INV-${order._id}`, 50, 200)
        .text(`Invoice Date: ${new Date().toLocaleDateString()}`, 50, 215)
        .text(`Balance Due: $0.00`, 50, 230) // Assuming paid
        .moveDown();

    // Billing Address
    doc.text(`Bill To:`, 300, 200)
        .font('Helvetica-Bold')
        .text(order.user.name, 300, 215)
        .font('Helvetica')
        .text(order.billingAddress.line1, 300, 230)
        .text(`${order.billingAddress.city}, ${order.billingAddress.state}, ${order.billingAddress.postalCode}`, 300, 245)
        .moveDown();

    // Table Header
    const invoiceTableTop = 330;
    doc.font('Helvetica-Bold');
    generateTableRow(doc, invoiceTableTop, 'Item', 'Quantity', 'Unit Price', 'Line Total');
    generateHr(doc, invoiceTableTop + 20);

    // Table Rows
    let i = 0;
    doc.font('Helvetica');
    for (i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        const position = invoiceTableTop + (i + 1) * 30;
        generateTableRow(
            doc,
            position,
            item.name,
            item.quantity,
            `$${item.price.toFixed(2)}`,
            `$${(item.price * item.quantity).toFixed(2)}`
        );
        generateHr(doc, position + 20);
    }

    // Totals
    const subtotalPosition = invoiceTableTop + (i + 1) * 30 + 20;
    doc.font('Helvetica-Bold');
    generateTableRow(doc, subtotalPosition, '', '', 'Subtotal', `$${order.subtotal.toFixed(2)}`);
    generateTableRow(doc, subtotalPosition + 25, '', '', 'Tax', `$${order.tax.toFixed(2)}`);
    generateTableRow(doc, subtotalPosition + 50, '', '', 'Grand Total', `$${order.total.toFixed(2)}`);

    // Footer
    doc.fontSize(10)
        .text('Payment is due within 15 days. Thank you for your business.', 50, 700, { align: 'center', width: 500 });

    doc.end();
};

function generateTableRow(doc, y, item, quantity, unitCost, lineTotal) {
    doc.fontSize(10)
        .text(item, 50, y)
        .text(quantity, 280, y, { width: 90, align: 'right' })
        .text(unitCost, 370, y, { width: 90, align: 'right' })
        .text(lineTotal, 0, y, { align: 'right' });
}

function generateHr(doc, y) {
    doc.strokeColor('#aaaaaa')
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
}

module.exports = {
    generateInvoice
};
