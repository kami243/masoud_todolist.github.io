

//get todos from Localstorage
let todos1 = localStorage.getItem("todos");

//try parse or null
try{
    todos1= JSON.parse(todos1);
    todos1= todos1.length ? todos1 : null ;
}
//  if todos == null
catch(error) {
    todos1= null; 
}
//console.log(todos1)      bara fahm bishtar



if(!todos1) {      //  true halat default>>>> if(!false) => true  bashad ya   null        default  >>> if (! null nabashad ) >>> pas null bashad 
    todos1=[
        {content :"خرید کتاب", status:true},
        {content : "پرداخت قبض آب و برق", status:true},
        {content:"خریدن گل برای همسر", status:true}
    ]
    localStorage.setItem("todos" , JSON.stringify(todos1));
}


// func to creat or update todos list in ui
function creatTodos (todos1){
    let todolist = document.querySelector("#todos-list");
    todolist.innerHTML= "" ;

    //creat list tag for each todo 
    todos1.forEach((todo , index)  => {
        let li = document.createElement("li");
        li.className="list-group-item"
        let content = document.createElement("span");
        content.textContent= todo.content 
        content.style.textDecoration= todo.status ? "initial" : "line-through";
        let deletBtn = document.createElement("img");
        deletBtn.src ="media/delete.png";
        deletBtn.alt= "delete icon";
        deletBtn.className="float-start";
         
        //append content and deletBtn to li
        li.append(content);
        li.append(deletBtn);
         
        // append content and deletBtn to li
        todolist.append(li);
        
        deletBtn.addEventListener("click" , ev =>{
           todos1.splice(index , 1)
           localStorage.setItem("todos" , JSON.stringify(todos1));
           creatTodos(todos1);

        })
        
            content.addEventListener("click" , ev =>{
            todos1[index].status=!todos1[index].status;
            localStorage.setItem("todos" , JSON.stringify(todos1));
            creatTodos(todos1);
 
         })
        

     });

   }

 creatTodos(todos1)

// action and search

let actions = document.querySelector("#actions");
let formWapper =document.querySelector("#form-wrapper");

Array.from(actions.children).forEach(action =>{
    //add todo
    if (action.dataset.action=="add"){
        action.addEventListener("click" , ev=>{
            formWapper.innerHTML = `
                <form id="add" >
					<input class="form-control" name="add" placeholder="Add todo .."  >
				</form> 
            `
            creatTodos(todos1);
            let add1 = document.querySelector("#add");
            add1.addEventListener("submit" , ev =>{
                ev.preventDefault();
                if(add1.add.value){
                    todos1.push({ content:add1.add.value , status:true})
                    localStorage.setItem("todos" , JSON.stringify(todos1));
                    add1.add.value="";
                     creatTodos(todos1);
                }

            })

        })
    }
    // search todo
    else if(action.dataset.action=="search"){
        action.addEventListener("click" , ev =>{
            formWapper.innerHTML= `
                <form id="search" >
					<input class="form-control" name="search" placeholder="Search todo .."  >
				</form> 
            `
            let search1 = document.querySelector("#search");
            search1.addEventListener("keyup" , ev =>{
                ev.preventDefault();
                if(search1.search.value){
                    let filterd_todos1 = todos1.filter(
                        todo => todo.content.toLowerCase().includes(search1.search.value.toLowerCase()))
                        creatTodos(filterd_todos1)
                    
                }
               
                else {
                    creatTodos(todos1);
                }

            })
            
        })
    }
})





