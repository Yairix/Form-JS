function Pessoa(name, age, color, pet) {
    this.name = name
    this.age = age
    this.color = color
    this.pet = pet
}

function compareOlder(people) {
    let moreAge;  
    let olderPerson;

    for (let person of people) {
        if (typeof moreAge == 'undefined') {
            moreAge = person.age
            olderPerson = person
        } else {
            if (person.age > moreAge) {
                moreAge = person.age
                olderPerson = person
            }
        }
    }

    return olderPerson
}
//Comparação de cores

function compareColorFav(people) {                               

    let colors = {};
    
    for (let person of people) {  
        if (typeof colors[person.color] === 'undefined') {
            colors[person.color] = [ person ]
        } else {
            colors[person.color].push(person)
        }
    }

    return colors
}
 //Comparação de pet


function comparePetFav(people) {                               

    let pets = {};
    
    for (let person of people) {  
        if (typeof pets[person.pet] === 'undefined') {
            pets[person.pet] = [ person ]
        } else {
            pets[person.pet].push(person)
        }
    }

    return pets;
}; 

function listResgistry(records) {

    let intro = document.createElement("div");
    intro.innerHTML += "<h3>Registros obtidos:</h3>"
    let lista = document.createElement('ul')

    records.forEach( registry => {
        let item = document.createElement('li')
        item.textContent = `${registry.name} possui ${registry.age} anos`
        lista.appendChild(item)
    } )

    intro.appendChild(lista)

    addResult(intro)
}


document.querySelector('form').addEventListener('submit', (e) => {
    addRegistry(e)
    cleanResults()
    listResgistry(records)
    
    let moreOlder = compareOlder(records)
    let answerAge = document.createElement("p")
    answerAge.textContent = `A pessoa com mais idade é ${moreOlder.name} com ${moreOlder.age} anos`
    addResult(answerAge)


    let colorFavorito = compareColorFav(records)                   
    Object.keys(colorFavorito).forEach(color => {
        let colorChoice = document.createElement("h3")
        colorChoice.textContent = `Pessoas que gostam da cor ${color}: `
        addResult(colorChoice)
        
        let listColor = document.createElement('ul')
        colorFavorito[color].forEach( person => {
            let name = document.createElement('li')
            name.textContent = person.name
            listColor.appendChild(name)
        })
        addResult(listColor)
    })

   
    let petFav = comparePetFav(records);
                    
    Object.keys(petFav).forEach(pet => {
        let petChoice = document.createElement("h3")
        petChoice.textContent = `Pessoas que gostam de ${pet}: `
        addResult(petChoice)
        
        let listPet = document.createElement('ul')
        petFav[pet].forEach( person => {
            let name = document.createElement('li')
            name.textContent = person.name
            listPet.appendChild(name)
        })
        addResult(listPet)
    })
 
})

let records = []

function addRegistry(event) {
    event.preventDefault()

    let form = event.target
    let data = new FormData(form)

    let name = data.get('name')
    let age = Number(data.get('age'))
    let colorFavorito = data.get('color').toLowerCase()
    colorFavorito = colorFavorito[0].toUpperCase() + colorFavorito.slice(1)

    let petFav = data.get("pet").toLowerCase()
    petFav = petFav[0].toUpperCase() + petFav.slice(1)

    form.querySelectorAll('input[type=text]').forEach( cada => cada.value = "")

    let registry = new Pessoa(name, age, colorFavorito, petFav)

    records.push(registry)

}

function cleanResults() {
    document.querySelector("#results").innerHTML = ""
}  

function addResult(elemento) {
    document.querySelector("#results").appendChild(elemento)
}