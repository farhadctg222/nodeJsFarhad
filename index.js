const express = require('express')
const bodyParser = require('body-parser')
const passwor = "A48ktoDi2VaiNDek"

const {MongoClient } = require('mongodb');
const uri = "mongodb+srv://organicUser:A48ktoDi2VaiNDek@addnewuser.kllk4y5.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true});
const ObjectId = require('mongodb').ObjectId
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.get('/',(req,res)=>{
  res.sendFile(__dirname +"/index.html")
})



client.connect(err=>{
  const productCollection = client.db('organicdb').collection('produc')
  console.log('mongodb connect')

app.post('/addStudent',(req,res)=>{
  const sss = req.body
  productCollection.insertOne(sss)
  .then(res=>{
    console.log(res.ops,'successfully done')
  })
  res.redirect('/')
  
})

app.patch('/update/:id',(req,res)=>{
  productCollection.updateOne({_id: ObjectId(req.params.id)},
  {
    $set:{studentName:req.body.studentName,address: req.body.address,city:req.body.city}
  })
  .then(result=>{
    res.send(result.modifiedCount>0)
  })
})


  app.get('/StudentInfo',(req,res)=>{
     productCollection.find({})
     .toArray((err,documents)=>{
      res.send(documents)
     })
  })
  app.delete('/delete/:id',(req,res)=>{
    productCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then(result=>{
      res.send(result)
    })
  })
  app.get('/StudentInfo/:id',(req,res)=>{
    productCollection.find({_id: ObjectId(req.params.id)})
     .toArray((err,document)=>{
      res.send(document[0])
     })
     
    
  
   })
 

})
    
 


app.listen(3000)