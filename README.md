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

http://localhost:3000/apiv1/films

https://starwarsapi.cristianespes.com/apiv1/films (Domain for the DevOps Infrastucture) - Not available yet

#### Searching all films - GET Method

To view all films, make a GET:

http://localhost:3000/apiv1/films

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=Luke
    http://localhost:3000/apiv1/films?title=revenge

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3000/apiv1/films?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=title director image
    http://localhost:3000/apiv1/films?fields=title director image

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3000/apiv1/films?sort=id

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3000/apiv1/films?fields=title%20&sort=id

#### Searching one Film - GET Method

To search a film, make a PUT to: /apiv1/films/###filmID###

http://localhost:3000/apiv1/films/###filmID###

#### Upload a new Film - POST Method

To upload a new film, make a POST to: /apiv1/films

http://localhost:3000/apiv1/films

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

http://localhost:3000/apiv1/films/###filmID###

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

http://localhost:3000/apiv1/films/###filmID###


### PEOPLE

#### Base URL

To go to the base URL, you can use:

http://localhost:3000/apiv1/people

https://starwarsapi.cristianespes.com/apiv1/people (Domain for the DevOps Infrastucture) - Not available yet

#### Searching all people - GET Method

To view all people, make a GET:

http://localhost:3000/apiv1/people

To find that you want, you can add the following filters:

    - To filter by name, you can use: &name=Luke
    http://localhost:3000/apiv1/people?name=Luke

    - To paginate results, you can use: &skip=3&limit=2
    http://localhost:3000/apiv1/people?skip=3&limit=2

    - To choose/show only some fields as shown: &fields=name episodes image
    http://localhost:3000/apiv1/people?fields=name episodes image

    - (*) To order the list by name, you can use: &sort=name
    http://localhost:3000/apiv1/people?sort=name

Warning (*): If you use this filter, first will be executed this filter and after the rest of the filters regardless of the order. The final result can be different than excepted.

Note: The filters can be combined with each other:

http://localhost:3000/apiv1/people?fields=name%20&sort=mass

#### Searching one Character - GET Method

To search an character, make a PUT to: /apiv1/people/###characterID###

http://localhost:3000/apiv1/people/###characterID###

#### Upload a new Character - POST Method

To upload a new character, make a POST to: /apiv1/people

http://localhost:3000/apiv1/people

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

#### Update an Character - PUT Method

To update an character, make a PUT to: /apiv1/people/###characterID###

http://localhost:3000/apiv1/people/###characterID###

Insert the new content of the fields to be modified:

    - name
    - height
    - mass
    - ...
    - episodes (*)
    - ...

Warning (*): Arrays will remove all previous episodes and only show the new episodes inserted.

#### Delete a Character - DELETE Method

To delete an character, make a DELETE to: /apiv1/people/###characterID###

http://localhost:3000/apiv1/people/###characterID###

-------------------------------------------------------------------------------

## DevOps Module

- To test the infrastucture of the API, replace the base URL http://localhost:3000 by the domain https://starwarsapi.cristianespes.com

