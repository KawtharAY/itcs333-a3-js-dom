// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener('DOMContentLoaded' , function(){
    let form = document.getElementById('todo-form');
    let input = document.getElementById('todo-input');
    let list = document.getElementById('todo-list');

    let currentFilter = 'all';

    let counter = document.getElementById('counter');


form.addEventListener('submit', e => {
    e.preventDefault();
    let text = input.value.trim();
    let errorMsg = document.getElementById('error-msg');
    if (text === '' ){
        errorMsg.classList.remove('hidden');
        return;
    }
    errorMsg.classList.add('hidden');


    addItem(text);
    input.value = '';

});

function addItem(text) {
    let li = document.createElement('li');
    li.textContent = text;

    let deleteBtn = document.createElement('button');
    deleteBtn.type = 'button'; 
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);
    list.appendChild(li);

    updateCounter();
    applyFilter();
}

list.addEventListener('click', e => {
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('li').remove();
        updateCounter();
        return;
    }

    let li = e.target.closest('li'); 
    li.classList.toggle('completed');
    applyFilter();
    updateCounter();

});

function applyFilter(){
    let items = list.querySelectorAll('li');

    for(let item of items){
        let isCompleted = item.classList.contains('completed');
        if(currentFilter === 'all'){
            item.style.display = '';
        } else if(currentFilter === 'active' && isCompleted){
            item.style.display = 'none';
        } else if(currentFilter === 'completed' && !isCompleted){
            item.style.display = 'none';
        } else {
            item.style.display = '';
        }
    }
}

document.getElementById('filter-all').addEventListener('click', () => {
    currentFilter = 'all';
    applyFilter();
});

document.getElementById('filter-active').addEventListener('click', () => {
    currentFilter = 'active';
    applyFilter();
});

document.getElementById('filter-done').addEventListener('click', () => {
    currentFilter = 'completed';
    applyFilter();
});

function updateCounter(){
    let items = list.querySelectorAll('li');
    let count = 0;

    for(let item of items){
        if(!item.classList.contains('completed')){
            count++;
        }
    }
    counter.textContent = count + " items left";

}


});