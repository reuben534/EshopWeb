export function processCheckout(req, res) {
  const { name, email } = req.body;

  return res.json({
    success: true,
    orderNumber: `EH-${Math.floor(100000 + Math.random() * 900000)}`,
    message: `Thanks ${name || 'customer'}! Your order has been placed.`,
    email: email || 'noreply@electrohub.dev'
  });
}
