let sungEl = document.getElementById('demo')
let cateList = document.getElementById('category')
let songsEl = document.getElementById('listsongs')
let gradient = document.getElementById('grad')
let data1 = []
let selected=''

function gtData() {
    fetch("package.json")
    .then(response => response.json())
    .then(jsondata => {
        data1.push(jsondata)
        renderlist()
        renderTracks()
    })
        
    }
gtData()


function renderlist() {
    let title 
    sungEl.innerHTML = ""
        for (j=0; j<data1[0].playlists.items.length;j++) {
            title = data1[0].playlists.items[j].name 
            let newestEl = document.createElement('div')
            newestEl.innerHTML = `<div id="${j}-playList"></div>
            <p id="${title}-saveID" href="#">${title}</p>
            `
            sungEl.append(newestEl) 
            document.getElementById(`${title}-saveID`).addEventListener('click', (e) => {
                saveIds(e)
            })
            
        }
    

}


function saveIds(event) {

    let id = event.target.id.slice(0, event.target.id.indexOf('-'))
    selected = id
    renderTracks(selected)
    
    
}

let data3 = []
let data4 = []
let data5 = []
let data6 = []
let data7 = []
let data8 = []
let data9 = []
let info = []


arrayOfDatas = [info, data3, data4, data5, data6, data7, data8, data9]

function renderTracks(selected) {
    songsEl.innerHTML = ""      
    for (d=0; d<arrayOfDatas.length;d++) {
        if (selected==arrayOfDatas[d][0].name){ 
            for (k=0; k<arrayOfDatas[d][0].tracks.items.length; k++) {
                let newEl = document.createElement('div')
                newEl.innerHTML = `<div id="${k}"></div>
                    <div class="song-child">
                        <div class="child">
                            <p>${k+1}</p>
                            <img src="${arrayOfDatas[d][0].tracks.items[k].track.album.images[0].url}">
                            <div class="col"><p style="color:white">${arrayOfDatas[d][0].tracks.items[k].track.album.name}</p>
                            <p>${arrayOfDatas[d][0].tracks.items[k].track.album.artists[0].name}</p></div>
                        </div>
                        <div><p>${arrayOfDatas[d][0].tracks.items[k].track.album.name}</p></div>
                        <div><p>${Math.round(arrayOfDatas[d][0].tracks.items[k].track.duration_ms/60000)}mins</p></div>
                    </div>`
                songsEl.append(newEl)
            }}
    }   rendertitle(selected)
}
function rendertitle(selected) {
    let title 
    grad.innerHTML = ""
    for (j=0; j<data1[0].playlists.items.length;j++) {
        title = data1[0].playlists.items[j].name 
        let ntEl = document.createElement('div')
        ntEl.innerHTML = `<img src="${data1[0].playlists.items[j].images[0].url}"
        <div id="gradchild">

        </div>
        
        `
        grad.append(ntEl) 
        
    }

}


// function padTo2Digits(num) {
//     return num.toString().padStart(2, '0');
//   }
  
//   function convertMsToMinutesSeconds(milliseconds) {

//     const minutes = Math.floor(milliseconds / 60000);
//     const seconds = Math.round((milliseconds % 60000) / 1000);
  
//     return seconds === 60
//       ? `${minutes + 1}:00`
//       : `${minutes}:${padTo2Digits(seconds)}`;

// }
// console.log(convertMsToMinutesSeconds(296900));
// function displaylist() {
//     cateList.innerHTML = ""
//     let newcatEl = document.createElement('div')
//     newcatEl.innerHTML = `<div id="${j}-cat"></div>
//         <div class=>"categoriesAllsong">
//             <div class="categoriesRow">
//                 <div class="box"><img src="${imge}"><h6>${title}</div>
//             </div>
//         </div>`

//     cateList.append(newcatEl)
// }


document.getElementById('play-icon').addEventListener('click',(e)=>{

    let icon = document.getElementById('play-icon')
    if (icon.innerHTML = '&#xe039;') {
        icon.innerHTML = '&#xe036;'
    }
    else{
        icon.innerHTML = '&#xe039;'
    }
})

