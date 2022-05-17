var heroListContainer = document.getElementById('favorite-hero-list-container')

/** Loop over all fav heroes */
for (var i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i)
  let heroObj = localStorage.getItem(key)
  let herobox = favHeroInfo(JSON.parse(heroObj))
  heroListContainer.prepend(herobox)
}


/** Function returns hero Box that can use to append anywhere */
function favHeroInfo(hero) {
  let { id, name, powerstats, biography, appearance, image } = hero

  let heroBox = document.createElement('div')
  heroBox.setAttribute('class', 'mb-4 card col-md-8 mx-auto col-lg-6')
  heroBox.setAttribute('title', 'Click to know more about the hero')

  let row = document.createElement('div')
  row.setAttribute('class', 'row')

  let imageContainer = document.createElement('div')
  imageContainer.setAttribute('class', 'col-6 col-md-4 col-lg-3')

  let photo = document.createElement('img')
  photo.setAttribute('style', 'width: 100%; height: 100%;')
  photo.setAttribute('src', `${image.url}`)
  photo.setAttribute('alt', `${name}`)

  let profileBox = document.createElement('div')
  profileBox.setAttribute('class', 'p-1 col-6 col-md-8 col-lg-9')
  profileBox.setAttribute('style', 'font-size: 80%;')
  

  let heroName = document.createElement('p')
  heroName.innerText = `Name : ${name}`
  // heroName.setAttribute('style', 'font-size: 80%;')

  let height = document.createElement('p')
  height.innerText = `Height( cms ): ${appearance.height[1]}`
  // height.setAttribute('style', 'font-size: 0.9em;')

  let strength = document.createElement('p')
  strength.innerText = `Strength : ${powerstats.strength}`
  // strength.setAttribute('style', 'font-size: 0.9em;')

  let speed = document.createElement('p')
  speed.innerText = `Speed : ${powerstats.speed}`
  // speed.setAttribute('style', 'font-size: 0.9em;')

  let power = document.createElement('p')
  power.innerText = `Power : ${powerstats.power}`
  // power.setAttribute('style', 'font-size: 0.9em;')

  let removeToFavBtn = document.createElement('button')
  removeToFavBtn.innerText = 'Remove From Favorite'
  removeToFavBtn.setAttribute('class', 'btn btn-danger')
  removeToFavBtn.setAttribute('style', 'font-size:80%')

  /** Profile - box Appending Child */

  profileBox.appendChild(heroName)
  profileBox.appendChild(height)
  profileBox.appendChild(strength)
  profileBox.appendChild(speed)
  profileBox.appendChild(power)
  profileBox.appendChild(removeToFavBtn)

  /** End appending profile - box */

  /** image - container */

  imageContainer.appendChild(photo)

  /**End image - container */

  /** Building row */

  row.appendChild(imageContainer)
  row.appendChild(profileBox)

  /** End Building row */

  /** Hero - box */
  heroBox.appendChild(row)

  /** End hero - box */

  /** Remove hero from favourite list */
  removeToFavBtn.addEventListener('click', function (e) {
    e.stopPropagation()
    localStorage.removeItem(id)
    this.parentNode.parentNode.parentElement.remove()
  })

  /** Click on hero redirect to single hero page */
  heroBox.addEventListener('click', function () {
    window.location.href = `./hero.html?heroId=${id}`
  })


  /** Give Hover Effect on hero box */
  heroBox.addEventListener('mouseover',function () {
    this.setAttribute('class','bg-light mb-4 card col-md-8 col-lg-6 mx-auto')
    this.setAttribute('style','cursor:pointer')
  })

  heroBox.addEventListener('mouseout',function () {
    this.setAttribute('class','mb-4 card col-md-8 col-lg-6 mx-auto')
  })
/** End of hero Effect */
  return heroBox
}
