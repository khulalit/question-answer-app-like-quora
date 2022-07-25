let answer = {}
window.addEventListener('load',()=>{
    fetch('/api/questions')
    .then(res=>
        res.json()).then(data=>{
            console.log(data)
            data.forEach(e => {
                let src = 'https://bootdey.com/img/Content/avatar/avatar7.png'
                if(e.cover == 'yes')
                    src = `http://localhost:3000/${e.uid}.jpeg`
                document.getElementById('list').innerHTML += `<li>
                <div class="activity__list__body entry-content" id="content">
                <div class="d-flex flex-row mb-3">
                <img src="${src}" alt="Admin" class="rounded-circle mx-2" width="25" height="25" id="avatar">
                <h6 id="username" >${e.username}, has posted this question.</h6>
                </div>
                    <h5 id="question">
                        ${e.content}
                    </h5>
                    <button class="btn btn-sm btn-rounded btn-outline-secondary ans" id="${e.id}">See All Answer or Post answer</button>
                    
                </div>
                </div>
            </li>`
        });
        
        document.querySelectorAll('.ans').forEach(e=>{
            e.addEventListener('click',()=>{
                window.location = "/pages/seeanswer?qid="+e.id;
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })

    fetch('/userinfo')
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data[0].username === false){
            document.getElementById('curruser').innerText = ""
            // document.getElementById('login').innerText = "Login"
            // document.getElementById('login').href = '/pages/login'
            document.getElementById('logout').style = "display : none"
            // document.getElementById('login').style = "display : none"
        }
        else{
            document.getElementById('curruser').innerText = "Currently logged as "+data[0].username
            // document.getElementById('login').innerText = "Logout"
            // document.getElementById('login').href = '/pages/logout'
            document.getElementById('login').style = "display : none"
            document.getElementById('logout').style = "display : block"
        }
    })
    .catch(err=>{
        console.log(err)
    })  
    
})
function myfunction(e) {
    console.log(e);
    // window.location = "/seeanswer?qid=1"
    console.log(window.location.pathname);
}

