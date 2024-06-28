import React from 'react';
import './Invoice.css';
import logo from "./image/logo.png";

const Invoice = ({
  sellerDetails,
  billingDetails,
  shippingDetails,
  placeOfSupply,
  orderDetails,
  invoiceDetails,
  reverseCharge,
  items,
  signature,
  totalAmount
}) => {
  const calculateNetAmount = (item) => {
    return item.unitPrice * item.quantity - item.discount;
  };

  const calculateTax = (netAmount) => {
    return placeOfSupply === shippingDetails.state ? (netAmount * 0.09) * 2 : netAmount * 0.18;
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => {
      const netAmount = calculateNetAmount(item);
      return total + netAmount + calculateTax(netAmount);
    }, 0);
  };

  return (
    <div className="invoice-box">
      <table>
        <tr className="top">
          <td colSpan="2">
            <table>
              <tr>
                <td className="title">
                  <img src={logo} className="logo" alt="Company logo" />
                </td>
                <td>
                  Invoice #: {invoiceDetails.invoiceNo}<br />
                  Created: {invoiceDetails.invoiceDate}<br />
                  Due: {invoiceDetails.dueDate}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="information">
          <td colSpan="2">
            <table>
              <tr>
                <td>
                  {sellerDetails.name}<br />
                  {sellerDetails.address}<br />
                  PAN: {sellerDetails.pan}<br />
                  GSTIN: {sellerDetails.gst}
                </td>
                <td>
                  {billingDetails.name}<br />
                  {billingDetails.address}<br />
                  State Code: {billingDetails.stateCode}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr className="heading">
          <td>Item</td>
          <td>Price</td>
        </tr>
        {items.map((item, index) => (
          <tr className="item" key={index}>
            <td>{item.description}</td>
            <td>{calculateNetAmount(item)}</td>
          </tr>
        ))}
        <tr className="total">
          <td></td>
          <td>Total: {calculateTotalAmount()}</td>
        </tr>
      </table>
      <br />
      For {sellerDetails.name}:<br />
      <img src={signature} className="signature" alt="Signature" /><br />
      Authorised Signatory
    </div>
  );
};

export default Invoice;
