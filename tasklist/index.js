lucide.createIcons();

const optionsBtn = document.querySelectorAll(".options-button");

optionsBtn.forEach(function(button) {
    button.addEventListener("click", function() {
        const menu = this.parentNode.querySelector(".options-menu");
        
        if (menu.style.display === "flex") {
            menu.style.display = "none";
        } 
        else {
            // esconde todos os menus de opção
            optionsBtn.forEach(function(button) {
                const menu = button.parentNode.childNodes[3];
                console.log(menu.innerHTML);
        
                menu.style.display = "none";
            })
            
            // mostra o menu correspondente
            menu.style.display = "flex";
        }
    });
});


let tasklist = []

const taskList = document.querySelector("#tasklist-list");
const addTaskBtn = document.querySelector("#add-task-button");


addTaskBtn.addEventListener("click", function() {
    
});



const createTask = () => {
    
    return (
    `<div class="task-create">
        <textarea class="input-text" placeholder="Task description..." maxlength="500" rows="3"></textarea>
        <div class="buttons">
            <button class="button" id="create-task-button">Criar</button>
            <button class="button" id="cancel-task-button">Cancelar</button>
        </div>
    </div>`
    );
}
