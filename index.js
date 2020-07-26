//add to do ------> add-item
console.log('connect');
//                    select elements step -01 
const clear = document.querySelector('.clear')
console.log(clear);
const dateELement = document.getElementById('date');
console.log(date);
const list = document.getElementById('list');
console.log(list);
var input = document.getElementById("input");
console.log(input);
//variables
let LIST = [],
    id = 0;
//get item from localStorage
// let data = localStorage.getItem("TODO");

// if (data) {
//     LIST = JSON.parse(data);
//     id = LIST.length;
//     loadList(LIST);
// } else {
//     LIST = [];
//     id = 0;
// }

// function loadList(array) {
//     array.forEach(function(item) {
//         addToDo(item.name, item.id, item.done, item.trash)

//     });
// }
clear.addEventListener("click", function() {
        localStorage.clear();
        location.reload();
    })
    //                  declare some classes step -02
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//                   show today date step-03

const Options = { weekday: "long", month: "short", day: "numeric" };
var today = new Date();
dateELement.innerHTML = today.toLocaleDateString("en-US", Options);
// add todo Function


function addToDo(toDo, id, done, trash) {
    if (trash) { return; }
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    var item = `<li class="item" style="display: grid; font-size: 25px;
    border-bottom: 1px solid #98c2c1;
    grid-template-columns: min-content 1fr min-content ;padding-top: 5px;">
    <i class="fa ${DONE}" aria-hidden="true" job="complete" id="${id}"></i>

    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash" aria-hidden="true" job="delete" id="${id}" style="color:#254E58; padding-right: 5px;"></i>
</li> `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);


}
// addToDo("cofee", 0, false, )


//  add an iten to the user list using enter key
document.addEventListener("keyup", function(event) {
    const toDo = input.value;
    if (event.keyCode === 13) {
        if (toDo) {
            addToDo(toDo, id, false, false);
            LIST.push({
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                })
                //add item to localStorage
                // localStorage.setItem("TODO", JSON.stringify(LIST));

            id++;
        }
        input.value = "";

    }
})

//complete TO DO Function
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}
list.addEventListener("click", function(event) {
    const element = event.target; // return clicked element inside the list
    const elementJob = element.attributes.job.value //completed or deleted
    if (elementJob == "complete") {
        completeToDo(element);
    } else if (elementJob == "delete")
        removeToDo(element);
    //add item to localStorage
    // localStorage.setItem("TODO", JSON.stringify(LIST));

})