let key = location.search.split('=')[1]
let title = document.querySelector('title')
let heroContainer = document.querySelector('#hero-container')

var xhrRequest = new XMLHttpRequest()
xhrRequest.open(
  'get',
  `https://www.superheroapi.com/api.php/1628132770683309/${key}`,
  true
)
xhrRequest.send()

xhrRequest.onload = function () {
  var resJSON = JSON.parse(xhrRequest.response)
  title.innerHTML = resJSON.name
  let herobox = heroInfo(resJSON)
  heroContainer.appendChild(herobox)
}


/** Display Hero card */
function heroInfo(hero) {
  let { id, name, powerstats, biography, appearance,work,connections, image } = hero

  let heroBox = document.createElement('div')
  heroBox.setAttribute('class', 'card col-lg-8 mx-auto col-md-6 border-0')

  let photo = document.createElement('img')
  photo.setAttribute('src', `${image.url}`)
  photo.setAttribute('alt', `${name}`)
  photo.setAttribute('class', 'card-img-top w-50 mx-auto d-inline-block')

  let cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body fs-4')

  let heroName = document.createElement('p')
  heroName.setAttribute('class', 'card-text')
  heroName.innerText = `Name : ${name}`

  let height = document.createElement('p')
  height.setAttribute('class', 'card-text')
  height.innerText = `Height( cms ): ${appearance.height[1]}`

  let heightFt = document.createElement('p')
  heightFt.setAttribute('class', 'card-text')
  heightFt.innerText = `Height : ${appearance.height[0]} feet`

  let weight = document.createElement('p')
  weight.setAttribute('class', 'card-text')
  weight.innerText = `Weight : ${appearance.weight[1]}`

  let gender = document.createElement('p')
  gender.setAttribute('class', 'card-text')
  gender.innerText = `Gender : ${appearance.gender}`

  let race = document.createElement('p')
  race.setAttribute('class', 'card-text')
  race.innerText = `Race : ${appearance.race}`

  let strength = document.createElement('p')
  strength.setAttribute('class', 'card-text')
  strength.innerText = `Strength : ${powerstats.strength}`

  let speed = document.createElement('p')
  speed.setAttribute('class', 'card-text')
  speed.innerText = `Speed : ${powerstats.speed}`

  let intelligence = document.createElement('p')
  intelligence.setAttribute('class', 'card-text')
  intelligence.innerText = `Intelligence : ${powerstats.intelligence}`

  let durability = document.createElement('p')
  durability.setAttribute('class', 'card-text')
  durability.innerText = `Durability : ${powerstats.durability}`

  let power = document.createElement('p')
  power.setAttribute('class', 'card-text')
  power.innerText = `Power : ${powerstats.power}`

  let occupation = document.createElement('p')
  occupation.setAttribute('class', 'card-text')
  occupation.innerText = `Occupation : ${work.occupation}`

  let base = document.createElement('p')
  base.setAttribute('class', 'card-text')
  base.innerText = `Place : ${work.base}`

  let relatives = document.createElement('p')
  relatives.setAttribute('class', 'card-text')
  relatives.innerText = `Relatives : ${connections.relatives}`

  let publisher = document.createElement('p')
  publisher.setAttribute('class', 'card-text')
  publisher.innerText = `Publisher : ${biography.publisher}`

  let alignment = document.createElement('p')
  alignment.setAttribute('class', 'card-text')
  alignment.innerText = `Alignment : ${biography.alignment}`

  let addToFavBtn = document.createElement('a')
  addToFavBtn.innerHTML = 'Add To Favorite'
  addToFavBtn.setAttribute('class', 'btn btn-info text-light my-2 bg-info')
  addToFavBtn.setAttribute('style', 'width:100%;')
  addToFavBtn.setAttribute('href', '')

  let backBtn = document.createElement('a')
  backBtn.innerHTML = 'Search for other super hero'
  backBtn.setAttribute('class', 'btn btn-info text-light bg-info')
  backBtn.setAttribute('style', 'width:100%;')
  backBtn.setAttribute('href', './index.html')

  /** Card Body - box Appending Child */

  cardBody.appendChild(heroName)
  cardBody.appendChild(height)
  cardBody.appendChild(heightFt)
  cardBody.appendChild(weight)
  cardBody.appendChild(gender)
  cardBody.appendChild(race)
  cardBody.appendChild(strength)
  cardBody.appendChild(intelligence)
  cardBody.appendChild(speed)
  cardBody.appendChild(durability)
  cardBody.appendChild(power)
  cardBody.appendChild(occupation)
  cardBody.appendChild(base)
  cardBody.appendChild(relatives)
  cardBody.appendChild(publisher)
  cardBody.appendChild(alignment)
  cardBody.appendChild(addToFavBtn)
  cardBody.appendChild(backBtn)

  /** End appending profile - box */

  /** hero box - container - append photo & card body */

  heroBox.appendChild(photo)
  heroBox.appendChild(cardBody)

  /**End hero box - container - append photo & card body */

  addToFavBtn.addEventListener('click', function (e) {
    e.preventDefault()
    let obj = {
      id: hero.id,
      name: hero.name,
      powerstats: hero.powerstats,
      appearance: hero.appearance,
      biography: hero.biography,
      image: hero.image,
    }
    let json = JSON.stringify(obj)
    localStorage.setItem(id, json)
    this.setAttribute('class', 'btn btn-info text-light my-2 bg-success')
    this.innerHTML = 'Added To Favorite'
  })

  /** Hover Events */

  addToFavBtn.addEventListener('mouseover', function () {
    this.setAttribute('class', 'btn btn-info text-light my-2 bg-secondary')
  })

  addToFavBtn.addEventListener('mouseout', function () {
    this.setAttribute('class', 'btn btn-info text-light my-2 bg-info')
  })

  backBtn.addEventListener('mouseover', function () {
    this.setAttribute('class', 'btn btn-info text-light bg-secondary')
  })

  backBtn.addEventListener('mouseout', function () {
    this.setAttribute('class', 'btn btn-info text-light bg-info')
  })

  return heroBox
}
