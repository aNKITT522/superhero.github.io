let res = 0;
// let res2 =0;
//generate a time stamp on every loading
const tss = Date.now();
// console.log(tss);


// Generate MD5 digest by tss+private key + public key
const textToHash = tss + "df2eefb907a9afc5fdda8999d7bc556076e8ea58" + "e15b92c51249c56e943234373783b485";
const md5Digest = CryptoJS.MD5(textToHash).toString();
// console.log(md5Digest);




// making the url ---for creators and charactors
let n =1; // for creators url
let urlArray=[]; // storing all the creators url in the array
for(let n=1;n<5;n++){
    // let url1 = `https://gateway.marvel.com:443/v1/public/characters?&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;
     let url1 =`http://gateway.marvel.com/v1/public/comics?creators=${n}&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;
    urlArray.push(url1);
    console.log(url1);
    
}
// console.log(urlArray);
//let url =  `https://gateway.marvel.com:443/v1/public/characters?&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;

// let url1 =`http://gateway.marvel.com/v1/public/comics?characters=${n}&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;

// let url2 =`http://gateway.marvel.com/v1/public/comics?creators=32&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;


// fetching every url -->
let comicsArray = [];

const fetchAllHero = async () =>{
    
    try{
        for(let j =0;j<urlArray.length;j++){
        let url = urlArray[j];
        // console.log(`it is urlArray ${j} content`);
       
        const response = await fetch (url);
        res = await response.json();
        // console.log(res.data.results.length);
        // if(res.status =="Ok"){
        //     console.log("yes");
        // }
       
            for(i=0 ; i<res.data.results.length ; i++){
              let {id,title,prices,images,characters} = res.data.results[i];
                let memb = {};
             memb.id = id;
             memb.title = title;
             memb.prices= "$ "+prices[0].price ;
             memb.images = (images[0].path)+"/portrait_uncanny"+'.'+(images[0].extension);
             memb.characters = (characters.collectionURI) + (`?ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`);
             
            //  memb.character_name = data2.data.results[0].name;
             comicsArray.push(memb);
            }
            // console.log(comicsArray);
        }

        // const charactrURL = `https://gateway.marvel.com:443/v1/public/characters?&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;
        // const charctrURI = (res.data.results[0].characters.collectionURI) + (`?ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`);
        // const resp2 = await fetch(charctrURI);
        //  res2 =await resp2.json();
        // console.log("data2 is =" + res2.data);
        


        comicsArray.forEach(function(obj) {
            for (var key in obj) {
              if (obj.hasOwnProperty(key)) {
                console.log(comicsArray.indexOf(obj) + key + ': ' + obj[key]);
              }
            }
            console.log('---');
          });
        }
        catch{
            console.log(Error);
    }
}

const  fetchHero = async () =>{
    // const response = await fetch (url1);
    // res = await response.json();
  let searchInputValue = document.getElementById("search-input").value;
  console.log(searchInputValue);
  for(let i =0;i<comicsArray.length;i++){
    if(comicsArray[i]["title"] === searchInputValue){
        alert(`The price of the comic is ${comicsArray[i].prices} dollars`);
        // const characterImg = await collectionsURI(comicsArray[i]);
        const container = document.createElement('container');
        container.id = "dispalyImage";
        const imageDiv =document.createElement('div');
        imageDiv.className="image-div";
         let imageUrl = `${comicsArray[i].images}`;  // Replace with the actual image URL
        //  let imageUrl = characterImg;  // Replace with the actual image URL
         let img = document.createElement('img');
         img.src = imageUrl;
         img.alt="image not found";

         let favButton = document.createElement("button");
         favButton.innerHTML = `<i class="fa-solid fa-heartbeat"></i>`;
         favButton.setAttribute("id","favButton");
         favButton.addEventListener("click", (e) => addFav(e));

         let infoButton = document.createElement("button");
         infoButton.innerHTML = `<i class="fa-solid  fa-info"></i>`;
         infoButton.setAttribute("id","infoButton");
         
         infoButton.addEventListener("click", (e) => showInfo(e));

         // Append the image element to a container in the DOM
        // let container = document.getElementById('image-container');  // Replace 'image-container' with the ID of your container element
         container.appendChild(img);
         container.appendChild(favButton);
         container.appendChild(infoButton);
         document.body.append(container);

        break;
    }                                   
  }
}

// let fav= [];

// function addFav(){
//     let searchInputValue = document.getElementById("searchInput").value;
            
// }
function showSuggestions() {
    var input = document.getElementById("search-input");
    var filter = input.value.toLowerCase();
    var suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";

    // Filter objects array based on user input
    var filteredObjects = comicsArray.filter(function(obj) {
      return obj.title.toLowerCase().indexOf(filter) > -1;
    });

    // Display suggestions in the suggestion box
    filteredObjects.forEach(function(obj) {
      var listItem = document.createElement("li");
      listItem.textContent = obj.title; 
      listItem.onclick = function() {
        input.value = obj.title;
        suggestionsList.innerHTML = ""; // Clear suggestions after selection
      };
      suggestionsList.appendChild(listItem);
    });
}
// abedc4476801911c003a6b388cf0042c

let res2 =0;
const collectionsURI = async (chr) =>{
  const charctrURI = chr.characters;
  
        const resp2 = await fetch(charctrURI);
          res2 = await resp2.json();
        //  console.log('response 2 =' + res2);
        let wiki = res2.data.results[0];
         let dataa = (res2.data.results[0].thumbnail.path) +"/portrait_uncanny"+"." + (res2.data.results[0].thumbnail.extension);
        console.log("data2 is =" + dataa);
        return dataa;
}