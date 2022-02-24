console.log("welcome to notes app");
shownotes();
// if user add a note , add it to a local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt');
    let addtitle = document.getElementById('addtitle');
    let notes = localStorage.getItem("notes");
    console.log(addtxt,addtitle);
    if (notes == null) {
        notesobj = [];


    } else {
        notesobj = JSON.parse(notes);
    }
    let myobj = {
        title: addtitle.value,
        text: addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtitle.value = "";
    console.log(notesobj);
    shownotes();
});

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html +=   `<div class="card notecard my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index} .  ${element.title} </h5>
            <p class="card-text"> ${element.text} </p>
            <button id="${index}" onclick="deletenote(this.id)"  class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;
    });
    let noteselm = document.getElementById('notes');
    if(notesobj.length != 0){
        noteselm.innerHTML = html;
    }else{
        noteselm.innerHTML = `Nothing to show ! use "Add a note section to add note"`
    }


}
function deletenote(index){
 //   console.log("i am deleting ",index);
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj = [];

    }else{
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem( "notes", JSON.stringify(notesobj));
    shownotes();
}

let search = document.getElementById('searchtxt');
 search.addEventListener("input", function(){
     let inputval = search.value.toLowerCase();
    console.log('input event fired!', inputval);
     let notecards = document.getElementsByClassName('notecard');
     Array.from(notecards).forEach(function(element){
         let cardtxt = element.getElementsByTagName("p")[0].innerText;
         if(cardtxt.includes(inputval)){
             element.style.display = "block";

         }
         else{
             element.style.display = "none";
         }
     })
    
 })