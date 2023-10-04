let form=document.querySelector('form')
let task_name=document.getElementById('taskName')
let task_status=document.getElementById('taskStatus')
let tododata=document.getElementById('tododata')

form.addEventListener('submit',async(e)=>{
e.preventDefault()
let obj={
    Task_name:task_name.value,
    Task_status:task_status.value
}
try {
    let res=await fetch('https://api-todo-3dmm.onrender.com/todo/create',{
        method:"POST",
        mode:"cors",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(obj)
      })
      let data= await res.json()
      alert("New Data Added")
      window.location.reload();

    
} catch (error) {
    console.log(error)
}



})

fetchdata()
async function fetchdata(){
    try {
        let res=await fetch('https://api-todo-3dmm.onrender.com/todo/get',{
        method:"GET",
        mode:"cors",
        headers:{
            'Content-type':'application/json'
        },

      })
      let data= await res.json()
      console.log(data)
      
      display(data)
    } catch (error) {
        console.log(error)
    }

}

function display(data){
    data.forEach(element => {
        let div=document.createElement('div')
        let name=document.createElement('p')
        name.innerText=`TaskName:${element.Task_name}`
        let status=document.createElement('p')
        status.innerText=`TaskStatus:${element.Task_status}`
        let edit=document.createElement('button')
        edit.innerText="Edit"
        edit.addEventListener('click', () => editTask(element._id, element.Task_name, element.Task_status));
        let del=document.createElement('button')
        del.innerText="DELETE"
        del.addEventListener('click',async()=>{
            try {
                let res=await fetch(`https://api-todo-3dmm.onrender.com/todo/delete/${element._id}`,{
                    method:"DELETE",
                    mode:"cors",
                    headers:{
                        'Content-type':'application/json'
                    }
                  })
                  let data= await res.json()
                  alert('Data Deleted')
                  window.location.reload() 
            } catch (error) {
                console.log(error)
            }
        })
        div.append(name,status,edit,del)
        tododata.append(div)

    });
}
async function editTask(id, taskName, taskStatus) {
    const newTaskName = prompt('Enter updated Task Name:', taskName);
    const newTaskStatus = prompt('Enter updated Task Status (Complete/Incomplete):', taskStatus);

    if (newTaskName !== null && newTaskStatus !== null) {
        const updatedTaskData = {
            Task_name: newTaskName,
            Task_status: newTaskStatus
        };

        try {
            const response = await fetch(`https://api-todo-3dmm.onrender.com/todo/update/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTaskData)
            });

            if (response.ok) {
                alert('Task Updated');
                window.location.reload();
            } else {
                alert('Failed to update the task.');
            }
        } catch (error) {
            console.log(error);
        }
    }
}