var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/max',{ useNewUrlParser: true },{ 
    useUnifiedTopology: true } )

const conn=mongoose.connection

conn.on('connected',()=>{
    console.log('db connects successfully!')
})

//url
const addurl= mongoose.Schema({
    address:{type:Array,require:true},
   
})

const UrlModel = mongoose.model('link',addurl)

exports.UrlModel=UrlModel