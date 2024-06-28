import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Invoice from './Invoice';


const App = () => {
  const invoiceRef = useRef();

  const printDocument = () => {
    html2canvas(invoiceRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('invoice.pdf');
    });
  };

  const sampleData = {
    logo: 'path/to/logo.png',
    sellerDetails: {
      name: 'ABC Corp',
      address: '123 Main St, Anytown, State, 123456',
      pan: 'ABCDE1234F',
      gst: '12ABCDE1234F1Z5'
    },
    billingDetails: {
      name: 'John Doe',
      address: '456 Elm St, Othertown, State, 654321',
      stateCode: '27'
    },
    shippingDetails: {
      name: 'John Doe',
      address: '456 Elm St, Othertown, State, 654321',
      stateCode: '27'
    },
    placeOfSupply: 'State',
    orderDetails: {
      orderNo: 'ORD-123456',
      orderDate: '2023-06-27'
    },
    invoiceDetails: {
      invoiceNo: 'INV-123456',
      invoiceDate: '2023-06-27',
      dueDate: '2023-07-27'
    },
    reverseCharge: 'No',
    items: [
      { description: 'Item 1', unitPrice: 100, quantity: 1, discount: 0 },
      { description: 'Item 2', unitPrice: 200, quantity: 1, discount: 0 }
    ],
    signature: 'path/to/signature.png',
    totalAmount: 300
  };

  return (
    <div>
      <div ref={invoiceRef}>
        <Invoice {...sampleData} />
      </div>
      <button onClick={printDocument}>Download PDF</button>
    </div>
  );
};

export default App;
