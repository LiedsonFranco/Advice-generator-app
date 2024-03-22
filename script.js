let wait_interval
document.addEventListener('DOMContentLoaded', () => {
    document.getElementsByTagName('button')[0].addEventListener('click', get_advice)
})

function typing_effect(tag, data){
    let index = 0
    tag.innerHTML = ''
    let interval = setInterval(() => {
        tag.innerHTML+= data[index]
        index+=1
        if(index == data.length){
            clearInterval(interval)
        }
    },100)
}

async function get_advice(){
    console.log('click')
    let quote = document.getElementById('quote')
    let heading = document.getElementsByTagName('h1')[0]
    wait_interval = wait_response(quote)
    await fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .then(data => {
        clearInterval(wait_interval)
        console.log(data)
        typing_effect(quote, data.slip.advice)
        heading.innerHTML = 'ADVICE #' + data.slip.id
    })
}
function wait_response(tag){
    clearInterval(wait_interval)
    tag.innerHTML = ''
    return setInterval(() =>
    {
        tag.innerHTML+= '.'
        if(tag.innerHTML.length >= 5){
            tag.innerHTML = ''
        }
    }, 600)
}