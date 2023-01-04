const express = require('express');
const app = express();
app.use(express.static(__dirname));

app.get('/home',(req,res)=>{
  res.sendFile(__dirname + '/home.html');
})

app.get('/products',(req,res)=>{
  res.sendFile(__dirname + '/products.html');
})

app.get('/about',(req,res)=>{
  res.sendFile(__dirname + '/about.html');
})

app.get('/contact',(req,res)=>{
  res.sendFile(__dirname + '/contact.html');
})

app.get('/survey',(req,res)=>{
  res.sendFile(__dirname + '/survey.html');
})

app.get('/login',(req,res)=>{
  res.sendFile(__dirname + '/login.html')
})

app.get('/signup',(req,res)=>{
  res.sendFile(__dirname + '/signup.html')
})

app.get('/cart',(req,res)=>{
  res.sendFile(__dirname + '/cart.html')
})

app.get('/checkout',(req,res)=>{
  res.sendFile(__dirname + '/checkoutPage.html')
})

app.get('/brand_DC-Shoes',(req,res)=>{
  res.sendFile(__dirname + '/shoesByBrand/brand_DC-Shoes.html')
})

//const port = process.env.PORT;
const port = 8080;
app.listen(port, '0.0.0.0', () => console.log(`listening to port ${port}`));