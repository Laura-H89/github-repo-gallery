//profile information
const overview = document.querySelector(".overview");
const username = "laura-h89";
const repoList = document.querySelector(".repo-list");
const repoInformation = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const backToReposButton = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const gitUserData = async function() {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);
    displayUserInfo(data);
};
gitUserData();

const displayUserInfo = function(data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div>`;
  overview.append(div);
  fetchRepos(username);
};

const fetchRepos = async function(username) {
    const listRepos= await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const  repoData= await listRepos.json();
    console.log(listRepos);
    displayRepoInfo(repoData);
};

const displayRepoInfo = function(repos) {
    filterInput.classList.remove("hide");
    for(const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function(e) {
    if(e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

const getRepoInfo = async function(repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/Laura-H89/divs-flexbox/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        console.log(languages);
    }  
    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function(repoInfo, languages) {
    backToReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    const div = document.createElement("div");
    console.log(repoInfo);
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
repoData.classList.remove("hide");
repoInformation.classList.add("hide");
repoData.append(div);
};

backToReposButton.addEventListener("click", function() {
    repoInformation.classList.remove("hide");
    repoData.classList.add("hide");
    backToReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchTextLowerCase = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if(repoLowerCase.includes(searchTextLowerCase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});