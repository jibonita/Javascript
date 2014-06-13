var state = 0;

window.onload = function() {

    document.getElementById('add').addEventListener('click', addItem);
    document.getElementById('delete').addEventListener('click', deleteItem);
    document.getElementById('show-hide').addEventListener('click', showHideToDo);
}

function addItem() {
    var d = document.createDocumentFragment();
    //create li tag and put the input fields there
    var li = document.createElement('li');

    //create input element + checkbox
    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    li.appendChild(input);
    input = document.createElement('input');
    input.setAttribute('type', 'text');
    li.appendChild(input);

    d.appendChild(li);

    //attach it to the DOM, inside the 'todo-list' div
    document.getElementById('todo-list').appendChild(d);
}

function deleteItem() {
    //select type=checkbox elements
    var checked = document.querySelectorAll('input[type="checkbox"]');

    for (var i in checked) {
        if (checked[i].checked) {
            var parent = checked[i].parentNode;
            //remove the LI with the content inside from the DOM
            parent.parentNode.removeChild(parent);
        }
    };
}


function showHideToDo(ev) {
    var todoEl = document.getElementById('todo-list');
    if (state == 1) {
        // Show
        todoEl.style.display = 'block';
        ev.target.innerHTML = 'Hide';
        state = 0;
    } else {
        // Hide
        todoEl.style.display = 'none';
        ev.target.innerHTML = 'Show';
        state = 1;
    }
}