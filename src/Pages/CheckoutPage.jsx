import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'credit-card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { customer: formData, items: cartItems });
    navigate('/order-confirmation');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + ((item.newPrice || item.price) * item.quantity), 0);
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 20 : 0;
  const total = subtotal + tax + shipping;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-sm font-medium">Back to Cart</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Customer Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Shipping Address</h3>
                  <input type="text" name="address" placeholder="Street Address"
                    value={formData.address} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    <input type="text" name="zipCode" placeholder="ZIP" value={formData.zipCode} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                  </div>
                  <select name="country" value={formData.country} onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md" required>
                    <option value="IN">Pakistan</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>

                {/* Payment */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Payment Method</h3>
                  {["credit-card", "paypal", "bank-transfer"].map((method) => (
                    <label key={method} className="flex items-center gap-2 mb-2">
                      <input type="radio" name="paymentMethod" value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleChange} />
                      {method.replace("-", " ").toUpperCase()}
                    </label>
                  ))}
                </div>

                {/* Credit Card Details */}
                {formData.paymentMethod === 'credit-card' && (
                  <div className="mb-6">
                    <input type="text" name="cardNumber" placeholder="Card Number"
                      value={formData.cardNumber} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4" required />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" name="expiryDate" placeholder="MM/YY"
                        value={formData.expiryDate} onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                      <input type="text" name="cvv" placeholder="CVV"
                        value={formData.cvv} onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                    </div>
                    <input type="text" name="cardName" placeholder="Name on Card"
                      value={formData.cardName} onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md mt-4" required />
                  </div>
                )}

                <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize || item.selectedDressSize}`} className="py-4 flex">
                    <img src={item.img} alt={item.title} className="w-20 h-20 rounded-md object-cover" />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p>${(item.newPrice || item.price).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      {item.selectedColor && <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>}
                      {(item.selectedSize || item.selectedDressSize) && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize || item.selectedDressSize}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Quentity:</span>
                  <span>{totalQty}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-base border-t pt-4 mt-4">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default CheckoutPage;
