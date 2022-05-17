var input = document.getElementById('input')
var heroListContainer = document.getElementById('hero-list-container')
input.addEventListener('keyup', () => {
  // console.log(input.value);
  if (input.value != '') {
    var xhrRequest = new XMLHttpRequest()

    xhrRequest.onload = function () {
      var resJSON = JSON.parse(xhrRequest.response)
      if (resJSON.response === 'success') {
        var results = resJSON.results
        heroListContainer.innerText = '';
        for (let result of results) {
          let herobox = heroInfo(result)          
          heroListContainer.prepend(herobox)
        }
      } else {
        let errorMsg = JSON.parse(this.response).error
        heroListContainer.innerHTML = errorMsg
      }
    }
    xhrRequest.onerror = function () {
      console.log('Something Went Wrong')
    }
    xhrRequest.open(
      'get',
      `https://www.superheroapi.com/api.php/1628132770683309/search/${input.value}`,
      true
    )

    xhrRequest.send()
  }
})

function heroInfo(hero) {
  let { id, name, bio, appearance, work, connections, image } = hero


  let heroBox = document.createElement('div')
  heroBox.setAttribute('class', 'mb-4 card col-md-8 col-lg-6 mx-auto')
  heroBox.setAttribute('title', 'Click to know more about the hero')

  let row = document.createElement('div')
  row.setAttribute('class', 'row')

  let imageContainer = document.createElement('div')
  imageContainer.setAttribute('class', 'col-6 col-md-4')

  let photo = document.createElement('img')
  photo.setAttribute('style', 'width: 100%; height: 100%;')
  photo.setAttribute('src', `${image.url}`)
  photo.setAttribute('alt', `${name}`)

  let profileBox = document.createElement('div')
  profileBox.setAttribute('class', 'p-1 col-6 col-md-8')
  profileBox.setAttribute('style', 'font-size: 12px;')

  let heroName = document.createElement('p')
  heroName.innerText = `Name : ${name}`

  let height = document.createElement('p')
  height.innerText = `Height( cms ): ${appearance.height[1]}`

  let occupation = document.createElement('p')
  occupation.innerText = `Occupation : ${work.occupation}`

  let based = document.createElement('p')
  based.innerText = `Based : ${work.base}`

  let addToFavBtn = document.createElement('button')
  addToFavBtn.innerHTML = 'Add To Fav List'
  addToFavBtn.setAttribute('class', 'btn btn-info text-light')

  /** Profile - box Appending Child */

  profileBox.appendChild(heroName)
  profileBox.appendChild(height)
  profileBox.appendChild(occupation)
  profileBox.appendChild(based)
  profileBox.appendChild(addToFavBtn)

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

  addToFavBtn.addEventListener('click',function (e) {
    e.stopPropagation()
    let obj = {
      id:hero.id,
      name:hero.name,
      powerstats:hero.powerstats,
      appearance:hero.appearance,
      biography:hero.biography,
      image:hero.image
    }
    let json = JSON.stringify(obj)
    localStorage.setItem(id,json)
    this.setAttribute('class', 'btn btn-success')
    this.innerText = "Added To Fav List"
  })

  heroBox.addEventListener('click',function(e){
    window.location.href = `./hero.html?heroId=${hero.id}`;
  })

  heroBox.addEventListener('mouseover',function () {
    this.setAttribute('class','mb-4 card col-md-8 col-lg-6 mx-auto bg-light')
    this.setAttribute('style','cursor:pointer;')
  })

  heroBox.addEventListener('mouseout',function () {
    this.setAttribute('class','mb-4 card col-md-8 col-lg-6 mx-auto')
  })

  return heroBox
}
