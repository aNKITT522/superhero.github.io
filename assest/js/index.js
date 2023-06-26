const tss = Date.now();
// Generate MD5 digest by tss+private key + public key
const textToHash = tss + "df2eefb907a9afc5fdda8999d7bc556076e8ea58" + "e15b92c51249c56e943234373783b485";
const md5Digest = CryptoJS.MD5(textToHash).toString();


// making the url ---for creators and charactors
let n =1; // for creators url
let urlArray=[]; // storing all the creators url in the array
for(let n=1;n<60;n++){
    // let url1 = `https://gateway.marvel.com:443/v1/public/characters?&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;
     let url1 =`http://gateway.marvel.com/v1/public/comics?creators=${n}&ts=${tss}&apikey=e15b92c51249c56e943234373783b485&hash=${md5Digest}`;
    urlArray.push(url1);
    console.log(url1);
    
}

// fetching every url -->
let comicsArray = [];

const fetchAllHero = async () =>{
    
    try{
        for(let j =0;j<urlArray.length;j++){
        let url = urlArray[j];
        // console.log(`it is urlArray ${j} content`);
       
        const response = await fetch (url);
        res = await response.json();
       
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


// fetch Super Hero using SuperHero Api
const  fetchComics = async()=> {
    //get search input
    let name = document.getElementById('search-input').value;
    // let url = `https://superheroapi.com/api.php/6054796184647336/`


    let superHeroList = document.getElementById('display-superhero-comics');

    
    // remove the previous searched element's div
    if (superHeroList.childElementCount != 0) {
        let childs = superHeroList.childElementCount;                
        for (let j = 0; j < childs; j++) {
            superHeroList.children[0].remove();
        }
    }


    // if name is empty display random Super Heros

    if(name.length != 0){
        
        let superHero =[];

        for(let i =0;i<comicsArray.length;i++){
            if(comicsArray[i]["title"] === name){
                 superHero[0] = comicsArray[i];
            }}

        // send searched elements to display superhero flex 
        for (let sh of superHero) {

            superHeroList.innerHTML =
                `<div id="superhero-box">
                    <div id="superhero-image">
                        <a href="">
                            <img src="${sh.images}" alt="superhero image">
                        </a>
                    </div>
                    <div>
                        <a href="" >

                            Name : ${sh.title}
                            <br>
                            Price : ${sh.prices}
                            <br>
                        </a>` + 
                        `<span> <a href="" ></a> </span>
                        </div>
                    </div>` + superHeroList.innerHTML;
        }
    

    } 
}
   


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

