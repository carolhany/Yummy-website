

async function getMeals()
{
    $(".inner-loading-screen").fadeIn(300)
    let api = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
   let response = await api.json()
    console.log(response.meals)
    displayMeals(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    clickCard()
    
}

getMeals()
function displayMeals(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
                        <div class="rounded-2 meal position-relative overflow-hidden" id="card" data-id="${arr[i].idMeal}">
                            <img class="img-fluid" src="${arr[i].strMealThumb}">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    document.querySelector("#main-meals").innerHTML = store
}
async function getIdDetails(id)
{
    $(".inner-loading-screen").fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    let response = await api.json()
    console.log(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    displayIdDetails(response.meals[0])
    

}
function displayIdDetails(id)
{
//loop1
let ingredients = ""
for (let i = 0; i <= 20; i++) {
    if (id[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info m-2 p-1">${id[`strMeasure${i}`]} ${id[`strIngredient${i}`]}</li>`
    }
}

//loop2 

let tags = id.strTags?.split(",")
// let tags = meal.strTags.split(",")
if (!tags) 
{
    tags = []
}
// if(tags!=null)
// {
    

// }
let myTag = ""
for (let i = 0; i < tags.length; i++) {
    myTag += `
    <li class="alert alert-danger list-unstyled m-2 p-1">${tags[i]}</li>`
}

let idStore = `
<div class="col-md-4 text-white">
<img src="${id.strMealThumb}" class="img-fluid rounded-2">
<h2>${id.strMeal}</h2>
</div>
<div class="col-md-8 text-white">
    <h2><strong>Instructions</strong></h2>
    <p>${id.strInstructions}</p>
    <h2><strong>Area:${id.strArea}</strong></h2>
    <h2><strong>Category:${id.strCategory} </strong></h2>
    <h2><strong>Recipes</strong></h2>
    <ul class="list-unstyled d-flex  g-3 flex-wrap ">
        ${ingredients}
    </ul>
    <h2><strong>Tags:</strong></h2>

    <ul class="list-unstyled d-flex g-3 flex-wrap">
        
        
        ${myTag}
        
    </ul>
    <a class="btn btn-success text-white" target="_blank" href=${id.strSource}>Source</a>
    <a class="btn btn-danger text-white" target="_blank" href=${id.strYoutube}>Youtube</a>
</div>

`





document.querySelector("#id-Details").innerHTML = idStore
}



function clickCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-home").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}


// function openNav()
// {
//     if($("#myNavBar").width()=="300")
//     {
//         $("#side-nav").animate({width:"0px" },500);
//         $("#myNavBar").width("0px")
//         $("#myTitleHome").css("margin-left","0px");
//     }
//     else
//     {
//         $("#side-nav").animate({width:"300px" },500);
//         $("#myNavBar").width("250px")
//         $("#myTitleHome").css("margin-left","250px");
//     }


// }
function closeSideNav()
{
    $("#side-nav").animate({width:"0px",margin:"-30"},500);
    $(".nav-footer").animate({width:"0px",margin:"-30"},500);
 
   
   
}

// function openNav()
// {
//     document.getElementById("Sidenav").style.width = "250px";
//     document.getElementById("main").style.marginLeft = "250px";
// }


// function openSideNav() {
//     $(".side-nav-menu").animate({
//         left: 0
//     }, 500)


//     $(".open-close-icon").removeClass("fa-align-justify");
//     $(".open-close-icon").addClass("fa-x");


//     for (let i = 0; i < 5; i++) {
//         $(".links li").eq(i).animate({
//             top: 0
//         }, (i + 5) * 100)
//     }
// }

// function closeSideNav() {
//     let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
//     $(".side-nav-menu").animate({
//         left: -boxWidth
//     }, 500)

//     $(".open-close-icon").addClass("fa-align-justify");
//     $(".open-close-icon").removeClass("fa-x");


//     $(".links li").animate({
//         top: 300
//     }, 500)
// }

// closeSideNav()
// $(".side-nav-menu i.open-close-icon").click(() => {
//     if ($(".side-nav-menu").css("left") == "0px") {
//         closeSideNav()
//     } else {
//         openSideNav()
//     }
// })



function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})
////////////////////////////////////////////
//search by name

let searchByName = document.querySelector("#searchbyname")
// searchByName.addEventListener('keyup',getName)

async function getName()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName.value}`);
    let response = await api.json()
    document.getElementById("meals-search").classList.remove("d-none")
    console.log(response.meals)
//    console.log( displaySearchByName(response.meals))
displaySearchByName(response.meals)
$(".inner-loading-screen").fadeOut(300)

    // response.meals ? displaySearchByName(response.meals) : displaySearchByName([])
    searchCard()
    
}

// function displaySearchByName(arr)
// {
//     let store = "";
//     for (let i = 0; i < arr.length; i++) {
//         store += `
//         <div class="col-md-3 dot">
//                         <div class="rounded-2 meal position-relative overflow-hidden" id="card" data-id="${arr[i].idMeal}">
//                             <img class="img-fluid" src="${arr[i].strMealThumb}">
//                             <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
//                                 <h3>${arr[i].strMeal}</h3>
//                             </div>
//                         </div>
                     

//                     </div>
//         `
        
//     }
//     document.querySelector("#search-meals").innerHTML = store
//     $("#area-meals").addClass("d-none")
// }
function searchCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-search").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}


//search by firstLetter
let searchByLetter = document.querySelector("#searchbyletter")
// searchByName.addEventListener('keyup',getName)

async function getByLetter()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter.value}`);
    let response = await api.json()
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")
//    console.log( displaySearchByName(response.meals))
     displaySearchByName(response.meals)
     $(".inner-loading-screen").fadeOut(300)

    // response.meals ? displaySearchByName(response.meals) : displaySearchByName([])
    clickSearchCard()
    
}

function displaySearchByName(arr)
{

    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
                        <div class="rounded-2 meal position-relative overflow-hidden" id="card" data-id="${arr[i].idMeal}">
                            <img class="img-fluid" src="${arr[i].strMealThumb}">
                            <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    $("#category").addClass("d-none")
     $("#meals-search").removeClass("d-none")
   
     $("#search").addClass("d-none")
     $("#area-meals").addClass("d-none")
     $("#ingerdient").addClass("d-none")
    document.querySelector("#search-meals").innerHTML = store
}
function clickSearchCard()
{
    let cardID = Array.from(document.querySelectorAll("#card"))
for (let i = 0; i < cardID.length; i++) {
    cardID[i].addEventListener("click",function(){
      
       
        let id = cardID[i].dataset.id
        console.log(id)
        getIdDetails(id)
     
         document.getElementById("meals-search").classList.add("d-none")
             document.getElementById("id-meals").classList.remove("d-none")
    })
    
}
}

async function getCategory()
{
    $(".inner-loading-screen").fadeIn(300)
    let api=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await api.json()
    console.log(response.categories)
    displayCategory(response.categories)
    $(".inner-loading-screen").fadeOut(300)
    
}

function displayCategory(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3 dot">
        <div class="rounded-2 meal position-relative overflow-hidden " id="catCard" onclick="getCatMeals('${arr[i].strCategory}')">
                            <img class="img-fluid" src="${arr[i].strCategoryThumb}">
                            <div class="meal-layer position-absolute text-center text-black  " name="${arr[i].strCategory}">
                                <h3 >${arr[i].strCategory}</h3>
                                <p>${arr[i].strCategoryDescription}</p>
                            </div>
                        </div>
                     

                    </div>
        `
        
    }
    document.querySelector("#category-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
    
   
}

 async function getCatMeals(CategoryName)
{
    $(".inner-loading-screen").fadeIn(300)
    
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoryName}`);
    let response= await api.json();
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")
    displaySearchByName(response.meals)
    $(".inner-loading-screen").fadeOut(300)
    clickSearchCard()
}


async function getCountry()
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let response= await api.json();
    console.log(response.meals)
  
    displayCountry(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}

function displayCountry(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3">
        <div onclick="getArea('${arr[i].strArea}')"class="text-center d-flex text-white flex-column rounded-2 meal  " id="catCard">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${arr[i].strArea}</h3>
            </div>
        </div>
        `
        
    }
    $("#area").removeClass("d-none")
    document.querySelector("#area-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
    

}

async function getArea(location)
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${location}`);
    let response= await api.json();
    console.log(response.meals)
    document.getElementById("meals-search").classList.remove("d-none")
    $(".inner-loading-screen").fadeOut(300)
    displaySearchByName(response.meals)
    
  
    clickSearchCard()
    
}

 async function getIngred()
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let response =await api.json();
    console.log(response.meals);
    $(".inner-loading-screen").fadeOut(300)
    displayIng(response.meals.slice(0, 20))

}
function displayIng(arr)
{
    let store = "";
    for (let i = 0; i < arr.length; i++) {
        store += `
        <div class="col-md-3">
        <div onclick="getMainIngred('${arr[i].strIngredient}')" class="text-center d-flex text-white flex-column rounded-2 meal position-relative overflow-hidden " id="catCard">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>

            </div>
        </div>
        `
        
    }
  
    document.querySelector("#ingerdient-meals").innerHTML = store
    $("#id-meals").addClass("d-none")
}
async function getMainIngred(mainIng)
{
    $(".inner-loading-screen").fadeIn(300)
    let api= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIng}`);
    let response =await api.json();
    console.log(response.meals);
    document.getElementById("meals-search").classList.remove("d-none")
    $(".inner-loading-screen").fadeOut(300)
    displaySearchByName(response.meals)
    clickSearchCard()
    

}




let submitBtn = document.querySelector("#submitBtn")

//name-contact
let name_contact =  document.querySelector("#name-contact")





// if(nameVaild() && emailValid() )
// {
//     submitBtn.removeAttribute("disabled")
// }
// else
// {
//     submitBtn.setAttribute("disabled", true)
// }

name_contact.addEventListener("keyup", nameVaild)
document.getElementById("nameAlert").classList.replace("d-block","d-none")


function nameVaild(){
  

    let checkName = name_contact.value;
    let patternName = /^[A-Za-z]+$/

    if(patternName.test(checkName))
    {
        
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
       
       //return patternName.test(checkName)
        
    }
    else
    {
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
        // return patternName.test(checkName)
    
    }

}
//email-contact
let email_contact =  document.querySelector("#email-contact")
email_contact.addEventListener("keyup", emailValid)

function emailValid()
{
    let checkEmail = email_contact.value;
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


    if(patternEmail.test(checkEmail))
    {
        
        document.getElementById("emailAlert").classList.replace("d-block","d-none")
        
        // return patternEmail.test(checkEmail)
        
        
    }
    else
    {
        document.getElementById("emailAlert").classList.replace("d-none","d-block")
        // return patternEmail.test(checkEmail)
        
    
    }
}


// if (nameVaild() == true && emailValid() == true) {
//     submitBtn.removeAttribute("disabled")
// } else {
//     submitBtn.setAttribute("disabled", true)
// }

//phone-contact

let phone_contact =  document.querySelector("#phone-contact")
phone_contact.addEventListener("keyup",phoneValid )
function phoneValid(){
    let checkPhone = phone_contact.value;
    let patternPhone = /^01[0125][0-9]{8}$/


    if(patternPhone.test(checkPhone))
    {
        
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        
    }
    else
    {
        document.getElementById("phoneAlert").classList.replace("d-none","d-block")
    
    }

}

//age-contact
let age_contact =  document.querySelector("#age-contact")
age_contact.addEventListener("keyup", ageValid)
function ageValid()
{
    let checkAge = age_contact.value;
    let patternAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/


    if(checkAge.test(patternAge))
    {
        
        document.getElementById("ageAlert").classList.replace("d-block","d-none")
        
    }
    else
    {
        document.getElementById("ageAlert").classList.replace("d-none","d-block")
    
    }
}

//password-contact
let password_contact =  document.querySelector("#password-contact")
password_contact.addEventListener("keyup",passwordValid )

function passwordValid()
{

    let checkPassword = password_contact.value;
    let patternPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/


    if(patternPassword.test(checkPassword))
    {
        
        document.getElementById("passwordAlert").classList.replace("d-block","d-none")
        
        
    }
    else
    {
        document.getElementById("passwordAlert").classList.replace("d-none","d-block")
    
    }
}

//repassword
let repassword_contact =  document.querySelector("#repassword-contact")
repassword_contact.addEventListener("keyup", repasswordValid)
function repasswordValid()
{
    if(password_contact.value == repassword_contact.value)
    {
        
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
        
        
    }
    else
    {
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
    
    }
}


// if(checkAlert == true)
// {
    
//     // submitBtn.removeAttribute("disabled")
//     $('#submitBtn').prop('disabled', false); 
    
// }
// else
// {
//     // submitBtn.setAttribute("disabled", true)
//     $('#submitBtn').prop('disabled', true); 
    
// }


function displaySearch()
{
    $("#meals-home").addClass("d-none")
    $("#search").removeClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
  
   
}
function displayCategoryNavBar()
{
    
    $("#meals-home").addClass("d-none")
    $("#category").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getCategory()
   
}
function displayArea()
{
    
    $("#meals-home").addClass("d-none")
    $("#area").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getCountry()
}


function displayIngredients()
{
    $("#meals-home").addClass("d-none")
    $("#ingerdient").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#contact-us").addClass("d-none")
    $("#id-meals").addClass("d-none")
    getIngred()
}

function displayContactUs()
{
    $("#meals-home").addClass("d-none")
    $("#contact-us").removeClass("d-none")
    $("#search").addClass("d-none")
    $("#category").addClass("d-none")
    $("#area").addClass("d-none")
    $("#ingerdient").addClass("d-none")
    $("#id-meals").addClass("d-none")
 
}
//loadingScreen
// $(".loadingScreen").fadeIn(500)
// $(document).ready(

//     () => {
//         $(".loadingScreen").fadeOut(500)
//     }

// )

name_contact.addEventListener('keyup', displayBtn);
email_contact.addEventListener('keyup', displayBtn);
phone_contact.addEventListener('keyup', displayBtn);
age_contact.addEventListener('keyup', displayBtn);
password_contact.addEventListener('keyup', displayBtn);
repassword_contact.addEventListener('keyup', displayBtn);

function displayBtn(){

    let checkName = name_contact.value;
    let patternName = /^[A-Za-z]+$/
    let checkEmail = email_contact.value;
    let patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    let checkPhone = phone_contact.value;
    let patternPhone = /^01[0125][0-9]{8}$/
    let checkAge = age_contact.value;
    let patternAge = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|100)$/
    let checkPassword = password_contact.value;
    let patternPassword = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/

    if(patternName.test(checkName) && patternEmail.test(checkEmail) && patternAge.test(checkAge) && patternPhone.test(checkPhone) && patternPassword.test(checkPassword) && password_contact.value == repassword_contact.value)
    {
        submitBtn.removeAttribute('disabled');  
        
    }

}