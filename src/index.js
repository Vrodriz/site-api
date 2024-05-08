const express = require('express')
const mongoose = require('mongoose');


const app = express()
const port = 3000
app.use(express.json())


const Clothes = mongoose.model('Clothes', { 
    title: String, 
    size: String,
    image_url: String,
    image_model: String

});

app.get('/', async (req, res) => {
  const clothes = await Clothes.find()
  return res.send(clothes)
})

app.delete('/:id', async (req, res) => {  
    const clothes = await Clothes.findByIdAndDelete(req.params.id)
    return res.send(clothes)
})

app.patch('/:id', async (req, res) => { 
    const clothes = await Clothes.findByIdAndUpdate(req.params.id,{ 
      title: req.body.title,
      size: req.body.size,
      image_url: req.body.image_url,
      image_model: req.body.image_model
    })
    return res.send(clothes)
})


app.post('/', async (req, res) => {   
    const clothes = new Clothes({   
        title: req.body.title,
        size: req.body.size,
        image_url: req.body.image_url,
        image_model: req.body.image_model
    })

    await clothes.save()
    return res.send(clothes)
    

})

app.listen(port, () => {
  mongoose.connect('mongodb+srv://ViniciusFernandes:UAamgtMqC78nKvFl@site-api.xrkf8jc.mongodb.net/?retryWrites=true&w=majority&appName=Site-api');
  console.log(`App running`)
})
