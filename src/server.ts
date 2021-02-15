import express from "express";

const app = express();
const PORT = 3001


app.get('/', (_:any, res:any) => res.json({message:'Hello World!'}));

app.listen(PORT|3000, () => {
    console.log('Server started on port 3001');
})

