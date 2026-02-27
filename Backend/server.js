import express from "express"
import { userData } from "./models/DataSchema.js"
import cors from 'cors';
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
// getting-started.js
import mongoose from "mongoose"
main().catch(err => console.log(err));



async function main() {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/GoodPass');

    async function fetchData(){
        const mongoFetchedData = await userData.find()
        return mongoFetchedData
    }



    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


    app.post('/savedata', async (req, res) => {
        const dataBody = req.body;
        const newData = new userData({ website: dataBody.website, username:dataBody.username, password:dataBody.password })
        const savedData = await newData.save()
        res.send(savedData)
        console.log("Data successfully successfully to the database and the saved data is: ", savedData)
    })

    app.post('/editdata', async (req, res) => {
        const dataBody = req.body;
        const toEditData = await userData.findById(dataBody._id);
        toEditData.website = dataBody.website;
        toEditData.username = dataBody.username;
        toEditData.password = dataBody.password;
        const savedData = await toEditData.save()
        res.send(savedData)
        console.log("Data successfully successfully to the database and the saved data is: ", savedData)
    })

    app.delete('/deletedata/:id',async (req,res)=>{
        const userId = req.params.id;
       const deletedElement = await userData.findByIdAndDelete(userId);
       res.send(deletedElement);
        console.log("Element successfully deleted, and the element is: ",deletedElement)
    })

    app.get('/getusers', async (req, res) => {
        const userJsonData =await fetchData();
        res.send(JSON.stringify(userJsonData));
        console.log("The data sent to frontend is: ",userJsonData)
    })


    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}