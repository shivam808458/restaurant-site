let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  document.getElementById("cart").innerHTML += `<p>${item} - ₹${price}</p>`;
  document.getElementById("total").innerText = total;
}

document.getElementById("payment-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: total * 100 }) // Razorpay uses paise
  });

  const order = await response.json();

  const options = {
    key: "YOUR_RAZORPAY_KEY", // Replace with your real key
    amount: order.amount,
    currency: "INR",
    name: "Indian Rasoi",
    order_id: order.id,
    handler: function (res) {
      alert("Payment successful! Payment ID: " + res.razorpay_payment_id);
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
});
