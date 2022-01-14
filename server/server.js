const mongoose = require('mongoose')
const bodyParser = require('body-parser');

var axios = require('axios')
var express = require("express");
const cors = require('cors');
const path = require('path')
var app = express();

const PORT = process.env.PORT || 8080
app.use(bodyParser.json());
app.use(cors());
var API_KEY = "RGAPI-227b63fe-28d8-4483-9b8b-b2554e85e98b"
var DB_KEY = "mongodb+srv://bluerare:manuel09!@vespacluster.4zhfz.mongodb.net/TFTapp?retryWrites=true&w=majority"
var tftSchema = mongoose.Schema({
    id:String,
    accountId:String,
    puuid:String,
    name:String,
    profileIconId:String,
    summonerLevel:String,
    tftTier:String,
    tftRank:String,
    tftLp:String

})

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));

    // Handle React routing, return all requests to React app
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}
var Data = mongoose.model('Data', tftSchema)

mongoose.connect(DB_KEY,function(err) {
    if(err) throw err;

    console.log("Database has successfully connected")

    addingData();
   

})


app.get('/',function(req,res) {
   
})
    
app.get('/tft-tournament',function(req,res) {
    Data.find({},function(err,result){
        if (err) throw (err)
 
        res.send(result)
    })
    
   
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
    
})



function addingData() {
    Data.remove({},function(res,req) {

        

    })
    
    
    var rank
    var tier
    var lp

    //these names are hard coded, which means if the player changes their name, this app is screwed
    nameArray = ["Blakrare", "Lillichubbs","CayTeaLeaf","AmdoSavior","HidefromteaMO","RaiChiu","mikehawkisbiglol","Ponality","Doughs","arrenct"]

    nameArray.map((item) => {
        axios.get("https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/"+item+"?api_key=" + API_KEY).then((res) => {

            axios.get("https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/" + res.data.id + "?api_key=" + API_KEY).then((result) => {
                rank = result.data[0].rank
                tier = result.data[0].tier
                lp = result.data[0].leaguePoints
                
                onSuccess(res,rank,tier,lp)

            }).catch((err) => {
                console.log(err)
            })

        }).catch((err) => {
            console.log(err)
        })
    })
    console.log("Refreshing api Data")

    setTimeout(addingData,900000)
    
}


//this function will store api data into local variables
function onSuccess(res, playerRank,playerTier,playerLp){
    var array = res.data

    var arrayLength = Object.keys(array).length

    for(var i = 0; i <=arrayLength;i++){

        var playerId = array.id
        var playerAccountID = array.accountId
        var playerPuuid = array.puuid
        var playerName = array.name
        var playerIcon = array.profileIconId
        var playerLevel = array.summonerLevel
        
    
       
    }

    assignDataValue(playerId,playerAccountID,playerPuuid,playerName,playerIcon,playerLevel,playerTier,playerRank, playerLp)
}

//will grab local variables in onSuccess and assign them to keys in db schema for upload
function assignDataValue(id, accountId,puuid,name,profileIconId,summonerLevel,summonerTier,summonerRank, summonerLp) {
    var uploadData = new Data()
    uploadData.id = id;
    uploadData.accountId = accountId
    uploadData.puuid = puuid
    uploadData.name = name
    uploadData.profileIconId = profileIconId
    uploadData.summonerLevel = summonerLevel
    uploadData.tftTier = summonerTier
    uploadData.tftRank = summonerRank
    uploadData.tftLp = summonerLp
    
    

    uploadData.save();
   
}