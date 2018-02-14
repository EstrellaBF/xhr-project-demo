window.addEventListener('load', function(e){
  // Creando variables
  const form = document.getElementById('search-form');
  const searchField = document.getElementById('search-keyword');
  const responseContainer = document.getElementById('response-container');
  let searchedForText;
  // Agregando el evento de form
  form.addEventListener('click', function(e){
    // console.log(e.target);
    // Se detiene su función por defecto, ya que la página no debe recargarse 
    e.preventDefault();
    // Se limpia el contenido
    responseContainer.innerHTML = '';
    // se almacena el texto escrito en el input en la variable searchedForText
    searchedForText = searchField.value;
    //llamando función getNews()
    getNews();
  });

  // Declarando función getNews
  function getNews() {
    // Se instancia el objeto XHR y se almacena en la variable
    const articleRequest = new XMLHttpRequest();
    // Se abre una nueva solicitud en este caso, pidiendo la api con GET 
    // En la documentación se indica la ruta : http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=####
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=347d672874fd431eb13860e1a3f4d50b`);
    articleRequest.onload = addNews;
    articleRequest.onerror = handleError;
    // Enviando solicitud
    articleRequest.send();
    // console.log(articleRequest); //XMLHttpRequest {onreadystatechange: null, readyState: 1, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
  }

  // función handleError
  function handleError() {
    console.log('Se ha presentado un error');
  }

  // Función addNews
  function addNews(e) {
    // console.log(e.target.responseText);
    const data = JSON.parse(e.target.responseText)
    // console.log(data);
    const response = data.response;
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;
    console.log(title);
    console.log(snippet);
    let li = document.createElement('li');
    let p = document.createElement('p');
    li.className = 'articleClass';
    p.innerText = title;
    li.innerText = snippet;
    responseContainer.appendChild(p);
    responseContainer.appendChild(li);
  }
});