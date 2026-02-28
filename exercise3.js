let sortByGroupButton = document.getElementById("sortByGroupBtn");
let sortByIdButton = document.getElementById("sortByIdBtn");
let viewToggleButton = document.getElementById("viewToggleBtn");
let deleteButton = document.getElementById("deleteBtn");
let userGrid = document.getElementById("userGrid");
let deleteIdInput = document.getElementById("deleteIdInput");

let usersList = []

async function retrieveData(){
    try{
        let response = await fetch(`https://69a1e3c02e82ee536fa27de4.mockapi.io/user_api`);

        let data = await response.json();

        usersList = data;

        console.log(usersList);

        render(usersList);

    } catch (error){
        console.log("Error ", error)
    }
}

function render(userList){
    let htmlString = ""
    userList.forEach(user => {
        htmlString += `<article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
        </article>`;

        
    });
    userGrid.innerHTML = htmlString;
}

viewToggleButton.addEventListener("click", () => {
    if(userGrid.classList.contains("grid-view")){
        userGrid.classList.remove("grid-view");
        userGrid.classList.add("list-view");
    }
    else if(userGrid.classList.contains("list-view")){
        userGrid.classList.remove("list-view");
        userGrid.classList.add("grid-view");
    }
});

sortByGroupButton.addEventListener("click", () => {
    usersList.sort((a, b) => Number(a.user_group) - Number(b.user_group));
    render(usersList);
});

sortByIdButton.addEventListener("click", () => {
    usersList.sort((a, b) => Number(a.id) - Number(b.id));
    render(usersList);
});

deleteButton.addEventListener("click", async () => {
    try {
        let idToDelete = deleteIdInput.value;
        
        let response = await fetch(`https://69a1e3c02e82ee536fa27de4.mockapi.io/user_api/${idToDelete}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            usersList = usersList.filter(user => user.id !== idToDelete);
            
            render(usersList);
            
            deleteIdInput.value = "";
            
            console.log(`User ${idToDelete} deleted successfully`);
        } 
        else {
            console.log("Failed to delete");
        }
        
    } catch (error) {
        console.log("Error deleting user:", error);
    }
});

retrieveData();