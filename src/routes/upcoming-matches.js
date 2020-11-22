const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')
router.get('/' ,  async (req,res)=>{
 try{
    const result =  await new Promise((resolve,reject)=>{
        request('https://iac.leagueoflegends.com/en/regional-qualifiers/upcoming-matches',(res,err,html)=>{
            const $ = cheerio.load(html)
            const data = []
            $('.upcoming_matches').each((i , elm)=>{
                const opponents = $('.MatchesOpponents',elm).text().replace(/\s\s+/g, ' ');
                const date = $('.MatchesDate',elm).text().trim().replace(/\s\s+/g, ' ');
                data.push({date , opponents})
            })
           if(data.length===0) reject()
            return resolve(data)
        })
    })
    res.json({code:200 , message:'Your data has been retrieved', result})
 }
 catch(err){
     console.log(err)
    res.json({code:400 , message:'Sorry master we couldn\'t fetch the data'})
 }
   
})
module.exports = router