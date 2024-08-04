const mongoose = require('mongoose');
const mongoURI = process.env.srv
const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("connected!!!")
    })
}



module.exports = connectToMongo


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://abhishek_patil:lHQCzoP3pfCgjKg0@cluster0.ry8d81v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
