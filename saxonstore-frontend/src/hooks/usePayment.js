export const usePayment = () => {
  const handlePayment = (order, user) => {
    return new Promise((resolve, reject) => {
      const paymentDetails = {
        order_id: "ItemNo12345",
        amount: order.totalAmount.toFixed(2).toString(),
        currency: "LKR",
        first_name: order.delivery.firstName,
        last_name: order.delivery.lastName,
        email: user.email,
        phone: order.delivery.phone,
        address: order.delivery.address,
        city: order.delivery.city,
        country: "Sri Lanka",
      };

      fetch(
        "https://saxonstore-payhere-backend-production.up.railway.app/payment/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentDetails),
        },
      )
        .then(async (response) => {
          if (response.ok) {
            const { hash, merchant_id } = await response.json();

            const payment = {
              sandbox: true,
              merchant_id: merchant_id,
              return_url: "http://localhost:3000/my-account",
              cancel_url: "http://localhost:3000/checkout",
              notify_url:
                "https://saxonstore-payhere-backend-production.up.railway.app/payment/notify",
              order_id: paymentDetails.order_id,
              items: "Item Title",
              amount: paymentDetails.amount,
              currency: paymentDetails.currency,
              first_name: paymentDetails.first_name,
              last_name: paymentDetails.last_name,
              email: paymentDetails.email,
              phone: paymentDetails.phone,
              address: paymentDetails.address,
              city: paymentDetails.city,
              country: paymentDetails.country,
              hash: hash,
            };

            payhere.startPayment(payment);

            window.payhere.onCompleted = () => resolve("PAYMENT_SUCCESS");
            window.payhere.onDismissed = () =>
              reject(new Error("Payment was dismissed"));
            window.payhere.onError = (error) =>
              reject(new Error(`Payment failed: ${error}`));
          } else {
            reject(new Error("Failed to initiate payment"));
          }
        })
        .catch((error) => reject(error));
    });
  };

  return { handlePayment };
};
