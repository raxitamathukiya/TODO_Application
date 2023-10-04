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
