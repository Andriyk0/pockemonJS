[DEMO LINK](https://andriyk0.github.io/pockemonJS/)

Instructions on how to run app:
-clone github repository
-Open VSCode and install Live server
-Open a project and click to Go Live from the status bar to turn the server on/off.



Getting ready to Pokemon GO launch, it became obviously we need a source of info about
pokemons. In order to do this, we need to create a client for https://pokeapi.co/
Our designer thinks it should look as following:
Index view

On click of ‘Load More’ another chunk of the list is being loaded and displayed on the page.
Pokemon details should be displayed after clicking on the single pokemon in list. Previously
shown pokemon details should disappear.
Regarding API:
1. https://pokeapi.co/api/v2/pokemon/?limit=12
2. https://pokeapi.co/api/v2/pokemon/{{id}}
3. https://pokeapi.co/api/v2/pokemon/{{id}} look in sprites
4. https://pokeapi.co/api/v2/type?limit=999
You can find out more information from the docs
Bonus points for implementing:
1. Adaptive styling (able to view this on all screen widths)
2. Filter visible pokemons by type
For this task you can use any css/js library/framework.
Handing in task:
Source code of the task should be available through the GitHub. There should be README.md
(markdown file) file with clear instructions on how to run client app. It is preferable to have
standalone running app using github-pages (just push your code to gh-pages branch of the
repo).
