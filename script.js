//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
let intialLoad=true;
let count= 5;
// const apiKey='Ef_Q2eQA1uVRmtOUcYWj7C2G649eS-gricOM8Vem84Q';
const apiKey='jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('image-container');
const loader=document.getElementById('loader');
let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photosArray=[];






//check if all images were loaded
 function imageLoaded(){
   
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log("ready", ready);
        intialLoad=false;
        count=30;
    }
 }





//helper fn to set attributes
//key is src,alt,href
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key]);  
    }
}










//displayPhoths()=> user sees photos!

//response.json=photosArray
//then loop for each photo edit the img
//get photos from unsplash api
//create elements 

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
console.log('total images', totalImages);
photosArray.forEach((photo)=>{
//create element
//create anchor to link unsplash
const item=document.createElement('a');
// item.setAttribute('href',photo.links.html);
// item.setAttribute('target','_blank');
//create img for photo

setAttributes(item,{
href:photo.links.html,
target:'_blank',
});

const img=document.createElement("img");

//img.setAttribute('src',photo.urls.regular);
// img.setAttribute('alt',photo.alt_description);
// img.setAttribute('title',photo.alt_description);

setAttributes(img,{
src:photo.urls.regular,
alt:photo.alt_description,
title:photo.alt_description,
});
//check when each image is finished loaded
img.addEventListener('load',imageLoaded);



//put img inside anchor, then put both inside container
item.appendChild(img);
imageContainer.appendChild(item);

});
}



async function getPhotos(){
    try{
        const response =await fetch(apiUrl);
        photosArray=await response.json();
        //console.log( photosArray);
        displayPhotos();

    }catch(error){
        //catch error here
    }
}

//check if scrolling near bottom of page to load more pages
window.addEventListener('scroll',()=>{
console.log('scrolled');
if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready){
    ready=false;
    getPhotos();
    console.log("LOAD MORE");
}
});



//window.scrollY : distance from top of page user has scrolled

//window.innerHeight : total height of browser window (constant unless browesr window resized)

//document.body.offsetHeight : height of everything in body, including what is not the view (stays consistent)

//load more when user scrolls to a point, before end of content, 1000px less (can be any value) => we need to subtract from offsetHeight to trigger event before bottom is reached




getPhotos();

