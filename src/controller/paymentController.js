const paymentModel = require("../models/payment");
const paymentValidation = require("../utils/paymentValidation");
const payServer = require("../utils/paymentServer");
const orderModel = require("../models/order");

// data to be given
// {
//   "method": "upi",
//   "order":12,
//   "code": "9259888898@"
// }

const paymentMethodValidation = {
  upi: paymentValidation.upi,
  paytm: paymentValidation.paytm,
  creditCard: paymentValidation.creditCard,
  debitCard: paymentValidation.debitCard,
};

module.exports.payment = async (req, res, next) => {
  let server_hash = "";
  let server_data;
  let status = 0;
  let amount;
  try {
    data = await orderModel.getOrderByOrderIdAndUserId(
      req.body.order,
      req.user.id
    );
    amount = data[0][0].total_price;
    console.log(amount);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "payment failed !!" });
  }
  const valid = await paymentMethodValidation[req.body.method](req.body.code);
  if (valid) {
    try {
      server_data = await payServer.paymentServer(
        req.body.method,
        req.body.code,
        amount
      );
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "payment failed !!" });
    }
    server_hash = server_data[0];
    status = server_data[1];
    try {
      await paymentModel.paymentStatus([
        server_hash,
        req.body.method,
        amount,
        parseInt(req.body.order),
        parseInt(status),
        parseInt(req.user.id),
      ]);
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "payment failed !!" });
    }
    res.status(200).json({ message: "payment done !!" });
  } else {
    res.status(400).json({ message: "payment failed !! code invalid" });
  }
};

module.exports.getAllPayment = (req, res, next) => {
  paymentModel
    .getAllPaymentStatus()
    .then(([rows, metadata]) => {
      console.log(rows);
      res.status(200).send(JSON.stringify(rows));
    })
    .catch((err) =>
      res.status(400).send({
        message: err,
      })
    );
};
