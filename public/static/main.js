let answer = {}
window.addEventListener('load',()=>{
    fetch('/api/questions')
    .then(res=>
        res.json()).then(data=>{
            console.log(data)
            data.forEach(e => {
               
                document.getElementById('list').innerHTML += `<li>
                <div class="activity__list__body entry-content" id="content">
                    <h6 id="username">${e.username}, has posted this question.</h6>
                    <h5 id="question">
                        ${e.content}
                    </h5>
                    <button class="btn btn-sm btn-rounded btn-info ans" id="${e.id}">See All Answer or Post answer</button>
                    
                </div>
                </div>
            </li>`
        });
        
        document.querySelectorAll('.ans').forEach(e=>{
            e.addEventListener('click',()=>{
                window.location = "/seeanswer?qid="+e.id;
            })
        })
    })
    .catch(err=>{
        console.log(err)
    })

    fetch('/userinfo')
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data)
        data.forEach(e => {
            document.getElementById('username').innerText = e.username;
        });
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

