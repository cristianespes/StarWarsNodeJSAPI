# STAR WARS (API)

-------------------------------------------------------------------------------

## Installation

Install dependencies with:

```shell
    npm install
```

-------------------------------------------------------------------------------

## MongoDB

This application uses MongoDB.

### MongoDB Server

To start the MongoDB server, you can use:

```
    ./bin/mongod --dbpath ./data/db --directoryperdb
```

### MongoDB Client

To start as MongoDB client, you can use:

```
./bin/mongo
```

-------------------------------------------------------------------------------

## Start the API

### Upload model files

To upload model files to mongoDB, you can use:

```shell
    npm run installDB
```

### Production

To start the application in production mode use:

```shell
    npm start
```

### Development

To start the application in development mode use:

```shell
    npm run dev
```

NOTE: This mode uses nodemon.

### Cluster

To start the application in cluster mode use:

```shell
    npm run cluster
```

-------------------------------------------------------------------------------

## API Documentation


### FILMS

#### Base URL

To go to the base URL, you can use:

http://localhost:3001/apiv1/films

http://starwarsapi.cristianespes.com/apiv1/films (Domain for the DevOps Infrastucture)

#### Searching all films - GET Method

To view all films, make a GET:

http://localhost:3001/apiv1/films

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=Luke
    http://localhost:3001/apiv1/films?title=revenge

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3001/apiv1/films?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=title director image
    http://localhost:3001/apiv1/films?fields=title director image

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3001/apiv1/films?sort=id

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3001/apiv1/films?fields=title%20&sort=id

#### Searching one Film - GET Method

To search a film, make a PUT to: /apiv1/films/###filmID###

http://localhost:3001/apiv1/films/###filmID###

#### Upload a new Film - POST Method

To upload a new film, make a POST to: /apiv1/films

http://localhost:3001/apiv1/films

Insert the followings fields:

    - title: title of film (String)
    - subtitle: subtitle of film (String)
    - episode: episode of film (String)
    - film: film of films (String)
    - opening_crawl: opening crawl of film (String)
    - director: director of film (String)
    - producer: producer of film (String)
    - release_date: release date of film (String)
    - characters: characters in film [String]
    - planets: planets in planets [String]
    - species: species in film [String]
    - vehicles: vehicles in film [String]
    - starships: starships in film [String]
    - url: url of film (String)
    - image: URL address (String)
    - id: identify (Number)

#### Update a Film - PUT Method

To update a film, make a PUT to: /apiv1/films/###filmID###

http://localhost:3001/apiv1/films/###filmID###

Insert the new content of the fields to be modified:

    - title
    - subtitle
    - episode
    - ...
    - characters (*)
    - ...

Warning (*): Arrays will remove all previous characters and only show the new characters inserted.

#### Delete a Film - DELETE Method

To delete a film, make a DELETE to: /apiv1/films/###filmID###

http://localhost:3001/apiv1/films/###filmID###


### PEOPLE

#### Base URL

To go to the base URL, you can use:

http://localhost:3001/apiv1/people

http://starwarsapi.cristianespes.com/apiv1/people (Domain for the DevOps Infrastucture)

#### Searching all people - GET Method

To view all people, make a GET:

http://localhost:3001/apiv1/people

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=Luke
    http://localhost:3001/apiv1/people?name=Luke

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3001/apiv1/people?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=name episodes image
    http://localhost:3001/apiv1/people?fields=name episodes image

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3001/apiv1/people?sort=name

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3001/apiv1/people?fields=name%20&sort=mass

#### Searching one Character - GET Method

To search a character, make a PUT to: /apiv1/people/###characterID###

http://localhost:3001/apiv1/people/###characterID###

#### Upload a new Character - POST Method

To upload a new character, make a POST to: /apiv1/people

http://localhost:3001/apiv1/people

Insert the followings fields:

    - name: name of character (String)
    - height: height of character (String)
    - mass: mass of character (String)
    - hair_color: hair_color of character (String)
    - skin_color: skin_color of character (String)
    - eye_color: eye_color of character (String)
    - birth_year: birth_year of character (String)
    - gender: gender of character (String)
    - homeworld: homeworld of character (String)
    - episodes: episodes where the character appears [String]
    - species: species of character [String]
    - vehicles: vehicles of character [String]
    - starships: starships of character [String]
    - url: url of character (String)
    - image: URL address (String)
    - id: identify (Number)

#### Update a Character - PUT Method

To update a character, make a PUT to: /apiv1/people/###characterID###

http://localhost:3001/apiv1/people/###characterID###

Insert the new content of the fields to be modified:

    - name
    - height
    - mass
    - ...
    - episodes (*)
    - ...

Warning (*): Arrays will remove all previous episodes and only show the new episodes inserted.

#### Delete a Character - DELETE Method

To delete a character, make a DELETE to: /apiv1/people/###characterID###

http://localhost:3001/apiv1/people/###characterID###


### PLANETS

#### Base URL

To go to the base URL, you can use:

http://localhost:3001/apiv1/planets

http://starwarsapi.cristianespes.com/apiv1/planets (Domain for the DevOps Infrastucture)

#### Searching all people - GET Method

To view all planets, make a GET:

http://localhost:3001/apiv1/planets

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=tato
    http://localhost:3001/apiv1/planets?name=tato

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3001/apiv1/planets?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=name diameter population
    http://localhost:3001/apiv1/planets?fields=name diameter population

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3001/apiv1/planets?sort=name

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3001/apiv1/planets?fields=name%20&sort=population

#### Searching one Planet - GET Method

To search a planet, make a PUT to: /apiv1/planets/###planetID###

http://localhost:3001/apiv1/planets/###planetID###

#### Upload a new Planet - POST Method

To upload a new planet, make a POST to: /apiv1/planets

http://localhost:3001/apiv1/planets

Insert the followings fields:

    - name: name of planet (String)
    - rotation_period: rotation period of planet (String)
    - orbital_period: orbital period of planet (String)
    - diameter: diameter of planet (String)
    - climate: climate of planet (String)
    - gravity: gravity of planet (String)
    - terrain: terrain of planet (String)
    - surface_water: surface water of planet (String)
    - population: population of planet (String)
    - residents: residents of planets [String]
    - episodes: episodes where the planet appears [String]
    - url: url of character (String)
    - image: URL address (String)
    - id: identify (Number)

#### Update a Planet - PUT Method

To update a planet, make a PUT to: /apiv1/planets/###planetID###

http://localhost:3001/apiv1/planets/###planetID###

Insert the new content of the fields to be modified:

    - name
    - rotation_period
    - orbital_period
    - ...
    - episodes (*)
    - ...

Warning (*): Arrays will remove all previous episodes and only show the new episodes inserted.

#### Delete a Planet - DELETE Method

To delete a planet, make a DELETE to: /apiv1/planets/###planetID###

http://localhost:3001/apiv1/planets/###planetID###


### STARSHIPS

#### Base URL

To go to the base URL, you can use:

http://localhost:3001/apiv1/starships

http://starwarsapi.cristianespes.com/apiv1/starships (Domain for the DevOps Infrastucture)

#### Searching all starships - GET Method

To view all starships, make a GET:

http://localhost:3001/apiv1/starships

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=cr9
    http://localhost:3001/apiv1/starships?name=cr9

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3001/apiv1/planets?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=name manufacturer length
    http://localhost:3001/apiv1/starships?fields=name manufacturer length

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3001/apiv1/starships?sort=name

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3001/apiv1/starships?fields=name%20&sort=length

#### Searching one Starship - GET Method

To search a starship, make a PUT to: /apiv1/starships/###starshipID###

http://localhost:3001/apiv1/starships/###starshipID###

#### Upload a new Starship - POST Method

To upload a new starship, make a POST to: /apiv1/starships

http://localhost:3001/apiv1/starships

Insert the followings fields:

    - name: name of starship (String)
    - model: model period of starship (String)
    - manufacturer: manufacturer of starship (String)
    - cost_in_credits: cost in credits of starship (String)
    - length: length of starship (String)
    - max_atmosphering_speed: max atmosphering speed of starship (String)
    - crew: crew of starship (String)
    - passengers: passengers of starship (String)
    - cargo_capacity: cargo capacity of starship (String)
    - consumables: consumables of starship (String)
    - hyperdrive_rating: hyperdrive rating of starship (String)
    - MGLT: MGLT of starship (String)
    - starship_class: starship class (String)
    - pilots: pilots of starship [String]
    - episodes: episodes where the starship appears [String]
    - url: url of character (String)
    - image: URL address (String)
    - id: identify (Number)

#### Update a Starship - PUT Method

To update a starship, make a PUT to: /apiv1/starships/###starshipID###

http://localhost:3001/apiv1/starships/###starshipID###

Insert the new content of the fields to be modified:

    - name
    - model
    - manufacturer
    - ...
    - episodes (*)
    - ...

Warning (*): Arrays will remove all previous episodes and only show the new episodes inserted.

#### Delete a Starship - DELETE Method

To delete a starship, make a DELETE to: /apiv1/starships/###starshipID###

http://localhost:3001/apiv1/starships/###starshipID###

-------------------------------------------------------------------------------

## DevOps Module

- To test the infrastucture of the API, replace the base URL http://localhost:3001 by the domain http://starwarsapi.cristianespes.com

