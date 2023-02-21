// Ссылка на урок:  https://www.youtube.com/watch?v=6A51fI5QoUM&ab_channel=GloAcademy

let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

let todoList = []; // создем пустой массив, в который будем вносить каждое новое дело
if(localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages(); 
}

// Создаем возможность отслеживать событие во время клика (во время добавления нового дела)
addButton.addEventListener('click', function(){
    if(!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    todoList.push(newTodo); 
    displayMessages();  
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

function displayMessages(){
    let displayMessage = '';
    if(todoList.length === 0) todo.innerHTML = '';
    todoList.forEach(function(item, index){
        displayMessage += `
        <li>
            <input type='checkbox' id ='item_${index}' ${item.checked ? 'checked' : ''}>
            <label for='item_${index}' class=''${item.important ? 'important' : ''}>${item.todo}</label>
        </li>
        `;
        todo.innerHTML = displayMessage;
        
    })
};

// Создаем возможность отслеживать галочки (checked) и сохранение их в localstorage

//Даный блок кода не сокращенный. Далее следующии блок кода с todo.addEventListener имеет сокращенный вид. Но они оба аналоги. Поэтому выбирать какой вариант можно по желанию
// todo.addEventListener('change', function(event){
//     let idInput = event.target.getAttribute('id');
//     let forLabel = todo.querySelector('[for=' + idInput + ']');
//     let valueLabel = forLabel.innerHTML;
//     console.log('valueLabel: ', valueLabel);
// });

//нижняя одна строка под номером 48 равна верхнему всему блоку
// let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;  

todo.addEventListener('change', function(event){    
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;   
    todoList.forEach(function(item) {
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

todo.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    todoList.forEach(function(item, index){
        if(item.todo === event.target.innerHTML) {
            if(event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1);           
            } else {
                item.important = !item.important;
            };            
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});