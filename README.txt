DB insert delete update codes are written in realm.
Js code in HTMLs are interact with the DB codes.
I created several dbs tables to store data. I used HTML template for design.

First page (index.html) is main page. Game, User can be added or removed. Also comment/rate can be disabled for a game.

Game page (game named as product in html pages) navigate the list of all games. When user select a game, it navigates the game details page. All fields
about the selected game was shown here. The data came from db can takes couple seconds time. I could not make a loading 
screen pls wait for incoming data. In order to see change in data page must refresh.

Login page navigate the list of all games. When user select a user, it login as user and navigate user details page.
All fields about the selected user was shown here. User can play, rate or comment the game if play enough (60 min).
There is no restriction for play and rate attribute. After every operations, to see new data page must be refreshed.
Game list page can be accessed from every pages. When user exit from user details page, it automatically logout. The data
came from db can takes couple seconds time.

All operations for every page must written in different js files. Bootstrap and themes folder only include the HTML 
design templates related files.  
 