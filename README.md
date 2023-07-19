# Mezzo

Mezzo is a clone of Apple Music. This app allows you to upload and discover songs made from artists just like you.

[View Live](https://mezzo.onrender.com/)

## Index

* [Features List](https://github.com/ChrisEkeDev/Mezzo/wiki/Feature-List)
* [Database Schema](https://github.com/ChrisEkeDev/Mezzo/wiki/Mezzo-Database-Diagram)
* [User Stories](https://github.com/ChrisEkeDev/Mezzo/wiki/User-Stories)
* [Wireframes](https://github.com/ChrisEkeDev/Mezzo/wiki/Wireframes)

## Technologies Used

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" /><img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /><img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" /><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" /><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />

## Features

### MVP Features
* New account creation, log in, log out, and guest/demo login
  * A user can create an account, log in, and log out of their account
  * A user can use a demo login to try the site
  * An unauthenticated user can’t listen to or view songs
  * An authenticated user is directed to their music dashboard
  * An unauthenticated user on the music dashboard is redirected to the landing page
* Artists
  * An authenticated and authorized user is able to create an artists with an artist image
  * An authenticated and  authorized user is able to view all artists added on the app
  * An authenticated and  authorized user is able to update their artists information
  * An authenticated and  authorized user is able to delete and remove their artist from the app
* Songs
  * An authenticated and  authorized user who has created an artist is able to add songs to that artist, including a song description
  * An authenticated and  authorized user can view and listen to all songs from an artists on the app
  * An authenticated and  authorized user can update a song’s information
  * An authenticated and  authorized user can delete a song for an artist
* Playlists
  * An authenticated and  authorized user can create a playlist
  * An authenticated and  authorized user can view and listen to their playlists
  * An authenticated and  authorized user can add and remove songs to their playlists
  * An authenticated and  authorized user can delete their playlist
* Favorites
  * An authenticated user can add and remove a songs and artists from their favorites list
  * An authenticated user can view a list of favorited songs and artists

### Bonus Features
* AWS Implementation
  * An authenticated user can listen to songs on the app
  * An authenticated user can upload an image for their artist
* Search
  * An authenticated user can search for artists and songs on the app
* Recommendations
  * An authenticated will see recommendations based on the genre of songs they have liked or favorited

## Screenshots

### Landing Page
![screencapture-mezzo-onrender-2023-07-19-17_21_55](https://github.com/ChrisEkeDev/Mezzo/assets/52504068/4855260a-bf77-4e0d-9420-c62ada8b7c8e)

### Dashboard
![screencapture-mezzo-onrender-dashboard-artists-2023-07-19-17_23_01](https://github.com/ChrisEkeDev/Mezzo/assets/52504068/2e2e766d-71fa-4621-8aa2-a33c1efd0246)

### Now Playing
![screencapture-mezzo-onrender-dashboard-artists-1-2023-07-19-17_23_36](https://github.com/ChrisEkeDev/Mezzo/assets/52504068/0b1d75bb-e217-44ae-aa02-9f043879855c)

## Contact Me

[LinkedIn](www.linkedin.com/in/iamchriseke)


## Endpoints

### Session Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/session`| Route for restoring a user session | ```json { message: "Session Restored", user: {id: 1, email: "email@aa.io", username: "username"}}```|
|**POST** `/api/session`| Route for signing a user in | ```json { message: "Sign In Successful", user: {id: 1, email: "email@aa.io", username: "username"}}```|

### Users Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**POST** `/api/users`| Route for signing up a user | ```json { message: "Account created successful", user: {id: 1, email: "email@aa.io", username: "username"}}}```|

### Artists Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/artists`| Route to get all artists in the app | ```json {Artists: [{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}]}```|
|**GET** `/api/artists/:artistId`| Route to get single artist | ```json {Artist: {id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}}``` |
|**POST** `/api/artists`| Route to create an artist | ```json {message: "Artist created successfully", Artist:{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}}```|
|**GET** `/api/artists/current`| Route to get all artists created by a user | ```json {Artists: [{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}]}```|
|**PUT** `/api/artists/:artistId`| Route to update artists information | ```json {message: "Artist updated successfully", Artist:{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}}```|
|**DELETE** `/api/artists/:artistId` | Route to delete an artists | ```json {message: "Artist deleted successfully" }```

### Songs Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/songs`| Route to get all songs in the app | ```json {Songs: [{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}]}```|
|**GET** `/api/songs/:songId`| Route to get single song | ```json {Song: {id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}}``` |
|**POST** `/api/songs`| Route to create an song | ```json {message: "Song created successfully", Song:{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}}```|
|**GET** `/api/songs/current`| Route to get all songs created by a user | ```json {Songs: [{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}]}```|
|**PUT** `/api/songs/:songId`| Route to update songs information | ```json {message: "Song updated successfully", Song:{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}}```|
|**DELETE** `/api/songs/:songId` | Route to delete a song | ```json {message: "Song deleted successfully" }```|

### Playlists Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/playlists`| Route to get all playlists created by the user | ```json{Playlists: [{id: 1, userId: 1, Songs: [Songs Array]}]}```|
|**GET** `/api/playlists/:playlistId`| Route to get a single playlist |```json{Playlist: {id: 1, userId: 1, Songs: [Songs Array]}}```|
|**POST** `/api/playlists`| Route to create a new playlist |```json{message: "Playlist created successfully", Playlist: {id: 1, userId: 1, Songs: [Songs Array]}}```|
|**PUT** `/api/playlists/:playlistId`| Route for updating a playlist name |```json{message: "Playlist updated successfully", Playlist: {id: 1, userId: 1, Songs: [Songs Array]}}```|
|**DELETE** `/api/playlists/:playlistId` | Route for deleting a playlist |```json{message: "Playlist deleted successfully" }```|
|**POST** `/api/playlists/:playlistId/add` | Route for adding a song to playlist |```json{message: "Song was added to playlist", Playlist: {id: 1, userId: 1, Songs: [Songs Array]}}```|
|**DELETE** `/api/playlists/:playlistId/remove`| Route for removing a song from a playlist|```json{message: "Song was removed to playlist", Playlist: {id: 1, userId: 1, Songs: [Songs Array]}}```|

### Favorites Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/favorites/artists`| Route to get all favorite artists| ```json{FavoriteArtists: [{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}]}```|
|**GET** `/api/favorites/songs`| Route to get all favorite songs| ```json{FavoriteSongs: [{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}]}```|
|**POST** `/api/favorites/artists`| Route to add an artist to list of favorites |```json{message: "Artist added to favorites", FavoriteArtists: [{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}] }```|
|**POST** `/api/favorites/songs`| Route to add a song to list of favorites |```json{message: "Song added to favorites", FavoriteSongs: [{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}]}```|
|**DELETE** `/api/favorites/artists`| Route to remove an artist from favorites|```json{message: "Artist removed from favorites", FavoriteArtists: [{id: 1, name: "Artist Name", bio: "Artist Bio", image: "Artist Image"}] }```|
|**DELETE** `/api/favorites/songs`| Route to remove a song from favorites|```json{message: "Song removed from favorites", FavoriteSongs: [{id: 1, name: "Song Name", description: "Song Description", song: "Song URL", artistId: 1, genreId: 1}]}```|

### Genres Routes
| **Request** | **Purpose** | **Returns** |
|-------------|:-----------:|-------------|
|**GET** `/api/genres`| Route to get genres | ```json{Genres: [{id: 1, name: "Genre Name"}]}```|
