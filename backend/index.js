let express=require("express")
let path=require("path")
const shortid=require("shortid")
let Razorpay=require("razorpay")
let app=express()
let cors=require("cors")

app.use(express.json()); // Allows parsing of JSON data
app.use(cors())
var razarpay = new Razorpay({
    key_id: 'rzp_test_aGs9hkOcUXTL4t',
    key_secret: '0f4sky3s5xCPq4HXhFsm94V3',
   
  });
  let  amount=100;
  
  app.post("/api/data", (req, res) => {
    const receivedData = req.body;
    console.log("Received Data:", receivedData);
    amount=receivedData;
    res.json({ message: "Data received successfully", data: receivedData });
});

app.post("/webhook", express.json(), (req, res) => {
  const event = req.body;
  console.log("Webhook event received:", event);

  if (event.event === "payment.captured") {
    console.log("Payment successful:", event.payload.payment.entity.id);
  }

  res.status(200).json({ status: "Webhook received" });
});

 app.post('/razorpay', async(req,res)=>{
  const { amount } = req.body; // Get amount from request body
  console.log("Received amount:", amount);
  if (!amount) return res.status(400).json({ error: "Amount is required" });
    const  payment_capture=1
    const currency="INR"

const options={amount:(amount*100)
    ,currency,receipt:shortid.generate()
    ,payment_capture}


     try {
        let response= await razarpay.orders.create(options)
        console.log(response,"respmsee")
      res.json({
        id:response.id,
        currency:response.currency,
        amount:response.amount
      })
     } catch (error) {
        console.log(error)
     }
 })
app.listen(1337,(vvv)=>{
    console.log("listening on 1337",vvv)
})