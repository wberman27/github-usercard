import axios from 'axios'

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

//console.log(axios.get('https://api.github.com/users/wberman27'))

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards');

axios.get('https://api.github.com/users/wberman27') //get my profile github data, append it to cards
.then(res =>{
    cards.appendChild(cardMaker(res.data));
  })

.catch(err =>{
  console.log(err);
})


/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['marilynle', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(n =>{
  axios.get(`https://api.github.com/users/${n}`) //for each name in the array, add that name to the end of the github url
.then(res =>{
    cards.appendChild(cardMaker(res.data));
  })

.catch(err =>{
  console.log(err);
})
})

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker (obj) {
  const card = document.createElement('div') //create all these elements and give them class names
  card.classList.add('card');

  const img = document.createElement('img');
  img.setAttribute(`src`, `${obj['avatar_url']}`)

  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info');

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = obj["name"]; //the name key in the obj will be the textcontent for this h3

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = obj["login"]

  const location = document.createElement('p');
  location.textContent = `Location: ${obj["location"]}`

  const profile = document.createElement('p');
  const address = document.createElement('a');
  profile.textContent = `Profile: `;
  address.setAttribute('href', `https://github.com/${obj['login']}`); 
  address.textContent = `https://github.com/${obj['login']}`;
  profile.appendChild(address); //make the <a> tag a child of profile

  const followers = document.createElement('p');
  followers.textContent = `Followers: ${obj["followers"]}`

  const following = document.createElement('p');
  following.textContent = `Following: ${obj["following"]}`

  const bio = document.createElement('p');
  bio.textContent = `Bio: ${obj["bio"]} `

  

  card.appendChild(img); //card has these two elements as children
  card.appendChild(cardInfo);

  cardInfo.appendChild(name); //cardInfo has all the other elements (except the url under profile) appended as children
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);

  return card;
  
}




/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
