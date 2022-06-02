let profilePage = document.querySelector("#profilePage")

let gitHubUrl = 'https://api.github.com/users/thediegobryan'
let gitHubRepoUrl = 'https://api.github.com/users/thediegobryan/repos'

//Function for gathering header data
function buildProfile(profileData){
    // console.log(profileData)
    let profileBox = document.createElement("div");
    profilePage.appendChild(profileBox);

    //IMG
    let profileIMG = document.createElement("img")
    profileIMG.src = profileData.avatar_url;
    profileIMG.classList.add('profile-pic')
    profileBox.appendChild(profileIMG)
    //Username
    let profileName = document.createElement("h1");
    profileName.innerText = profileData.name;
    profileBox.appendChild(profileName);
    //Location
    let profileLocation = document.createElement("div");
    let boldprofileLocation = document.createElement("b");
    boldprofileLocation.innerText = "Location: "
    profileLocation.appendChild(boldprofileLocation);
    profileLocation.appendChild(document.createTextNode(profileData.location))
    profileBox.appendChild(profileLocation);
    //Github URL:
    let profileUrl = document.createElement("div");
    let boldprofileUrl = document.createElement("b");
    boldprofileUrl.innerText = "GitHub URL: "
    profileUrl.appendChild(boldprofileUrl);
    let anchorprofileUrl = document.createElement("a");
    anchorprofileUrl.href = profileData.html_url
    anchorprofileUrl.target = 'blank'
    anchorprofileUrl.innerText = profileData.login
    profileUrl.appendChild(anchorprofileUrl) ;
    profileBox.appendChild(profileUrl);
    //Github Username:
    let profileUsername = document.createElement("div");
    let boldprofileUsername = document.createElement("b");
    boldprofileUsername.innerText = "GitHub Username: "
    profileUsername.appendChild(boldprofileUsername);
    profileUsername.appendChild(document.createTextNode(profileData.login))
    profileBox.appendChild(profileUsername);
}

//Function for RepoList
function buildRepoList(repoData){
    console.log(repoData.html_url)
    let ulElemenent = document.createElement("ul")
    ulElemenent.classList.add("list-group")
    profilePage.appendChild(ulElemenent);
    let liTitle = document.createElement("li")
    liTitle.classList.add("list-group-item", "text-bg-light", "p-3")
    liTitle.innerText = "GitHub Repos";
    ulElemenent.appendChild(liTitle)
    for(repo of repoData){
        console.log(repo.html_url)
        let liElement = document.createElement("li")
        liElement.classList.add("list-group-item")
        let anchorRepoUrl = document.createElement("a");
        anchorRepoUrl.href = repo.html_url;
        anchorRepoUrl.target = 'blank'
        anchorRepoUrl.innerText = repo.name;
        liElement.appendChild(document.createTextNode("📁 "))
        liElement.appendChild(anchorRepoUrl);
        ulElemenent.appendChild(liElement);

    }
}

fetch(gitHubUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
.then(function(response) {
    // the response is the promised data
    return response.json()
})
.then(function (data) {
    //data refers to what the above promise returned (response.json())
    buildProfile(data);
    gitHubRepoUrl = data.repos_url
    // console.log(gitHubRepoUrl)
})

fetch(gitHubRepoUrl, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
.then(function(response) {
    // the response is the promised data
    return response.json()
})
.then(function (data) {
    //data refers to what the above promise returned (response.json())
    // console.log(data[1].name)
    buildRepoList(data);
})
