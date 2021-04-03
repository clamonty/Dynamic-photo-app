const ACCESS_KEY = 'G8WVILx9f-GxVyaOkRkgNISqZhZvv_x7Z02UkK8k-_s';


// Header Generation
let xhr1 = new XMLHttpRequest();
xhr1.open("GET",`https://api.unsplash.com/photos/random?client_id=G8WVILx9f-GxVyaOkRkgNISqZhZvv_x7Z02UkK8k-_s`, true )
xhr1.onload = function() {
  if (this.status == 200) {
    let bgPhoto = JSON.parse(this.responseText);
    console.log(bgPhoto);
    let bgCtn = document.querySelector('#header');
    let photoLink = document.querySelector('.daily-photo-link');
    let licenseLink = document.querySelector('.license-link');
    bgCtn.style.backgroundImage = `url("${bgPhoto.urls.full}")`;
    photoLink.innerHTML = `
      <p class="text-light d-inline-block"><a href="${bgPhoto.links.html}" class="daily-photo-link">Photo of the Day</a> by <a href="${bgPhoto.user.links.html}" class="daily-photo-user">${bgPhoto.user.name}</a></p>
    `;

  }
}
xhr1.send();

function getImages(searchQuery = 'Canada') {
  let xhr2 = new XMLHttpRequest();
  xhr2.open("GET", `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=20&client_id=G8WVILx9f-GxVyaOkRkgNISqZhZvv_x7Z02UkK8k-_s`, true);
  xhr2.onload = function() {
    if (this.status == 200) {
      let pictures = JSON.parse(this.responseText);
      console.log(pictures);
      let imgGrid = document.querySelector('.img-grid');
      imgGrid.innerHTML = '';
      for (let result of pictures.results) {
        imgGrid.innerHTML += `
          <div class="col-md img-col m-3 container" style="min-width: 25%; background-image: url('${result.urls.full}'); background-repeat: no-repeat; background-size: cover; background-position: center; min-height: 277.3px">
            <div class="img-dark-overlay d-flex hide">
                <div class="row">
                  <div class="col img-top-row mt-2 mr-2">
                    <button class="btn btn-small bg-light"><i class="fas fa-heart text-secondary"></i></button>
                    <button class="btn btn-small bg-light ml-2"><i class="fas fa-plus text-secondary"></i></button>          
                  </div>
                </div>
                <div class="row">
                  <div class="col img-bottom-row mb-2 ml-2">
                    <div class="user-hover">
                      <a href="${result.user.links.html}"><img class="img-fluid rounded-circle mr-2 d-inline-block" src="${result.user.profile_image.small}"></a>
                      <button class="btn btn-small bg-light"><i class="fas fa-arrow-down text-secondary"></i></button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        `;
      }

      const columns = Array.from(document.getElementsByClassName('img-col'));
      columns.forEach(column => {
        column.addEventListener('mouseenter', (e) => {
          e.target.firstChild.nextSibling.classList.remove('hide');
          e.target.firstChild.nextSibling.classList.add('show');
        });
        column.addEventListener('mouseleave', (e) => {
          e.target.firstChild.nextSibling.classList.remove('show');
          e.target.firstChild.nextSibling.classList.add('hide');
        });
      });
    }
  }
  xhr2.send();
}

getImages();

let searchForms = Array.from(document.getElementsByClassName('search-form'));
console.log(searchForms);
searchForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    getImages(form.firstChild.nextSibling.value);
  });
});
