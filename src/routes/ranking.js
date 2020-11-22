const router = require('express').Router()
const request = require('request')
const cheerio = require('cheerio')
router.get('/' ,async (req,res)=>{
    try{
    const result = await new Promise((resolve,reject)=>{
            request('https://www.toornament.com/en_GB/tournaments/3901889153454383104/stages/3901905298990751744/groups/4040019137900511232/',(res,err,html)=>{
                const $ = cheerio.load(html)
                const data = []
                const row = ['Played' , 'Wins' , 'Draws' , 'Losses','Forfeits' , 'Score For', 'Score Against', 'Score Difference','Points' ]
                $('.ranking .ranking-container').each((i , elm)=>{
                    const name = $('.ranking-item .name' , elm).text()
                    const board = {}
                    const score = $('.ranking-item .metric' , elm).map((i ,elm)=>{
                        return $(elm).text().replace(/\s\s+/g, ' ');
                    }).get()
                    score.forEach((item,i)=>board[row[i]]=item)
                    data.push({name , scoreBoard:board})
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