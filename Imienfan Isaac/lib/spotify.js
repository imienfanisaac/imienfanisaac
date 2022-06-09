let = data3 = []
let = data4 = []
let = data5 = []
let = data6 = []
let = data7 = []
let = data8 = []
let = data9 = []
let = info = []

function getDt() {
    fetch("anodaplaylist.json")
    .then(response => response.json())
    .then(jsondata => {
        data3.push(jsondata)})


    fetch("danceclassic.json")
    .then(response => response.json())
    .then(jsondata => {
        data4.push(jsondata)})
   
    fetch("feelingmyself.json")
    .then(response => response.json())
    .then(jsondata => {
        data5.push(jsondata)})
    
    fetch("rockparty.json")
    .then(response => response.json())
    .then(jsondata => {
        data6.push(jsondata)})


    fetch("shuffle.json")
    .then(response => response.json())
    .then(jsondata => {
        data7.push(jsondata)})
   
    fetch("throwback.json")
    .then(response => response.json())
    .then(jsondata => {
        data8.push(jsondata)})

    fetch("reggaeparty.json")
    .then(response => response.json())
    .then(jsondata => {
        data9.push(jsondata)})

    fetch("party-playlist-songs.json")
    .then(response => response.json())
    .then(jsondata => {
        info.push(jsondata)})
    
}
getDt()


 arrayOfDatas = [info, data3, data4, data5, data6, data7, data8, data9]

function renderselected() {

}