# Jobsity - Android Challenge
## TV Series app (TV Maze api)


## Features
- List all of the series contained in the API using the provided pagination (infinite scroll).
- Allow users to search series by name.
- Show series details:
    - Name
    - Poster (placeholder in case there is none)
    - Days and time during which the series airs
    - Genres
    - Summary
    - List of episodes separated by season
- Show episodes details:
    - Name
    - Number
    - Season
    - Summary
    - Image, (placeholder in case there is none)
- Allow the user to set a PIN number to secure the application (need to press each field separatelly).
- Allow the user to save a series as a favorite.
- Allow the user to delete a series from the favorites list.
- Create a people search by listing the name and image of the person.
- Show person info:
    - Name
    - Image
    - Series they have participated in, with a link to the series details.
- On infinite list show button to scroll to top.

## Dependencies

This app uses a number of open source projects to work properly:

- [React Navigation] - Allow navigation in the app (using Tab and Stack navigation)
- [Axios] - HTTP client for Node.JS, base client for API requests on the app.
- [React Native Encrypted Storage] - Library for safe encryption storage.
- [React Native Render HTML] - Library for translating HTML into React Elements.
- [React Native Vector Icons] - Library for display icons.

## Installation

The app is developed on React Native 0.65.1.

Install the dependencies and start the server on an android simulator.

```sh
npm i
npm run android
```

   [React Navigation]: <https://reactnavigation.org/>
   [Axios]: <https://github.com/axios/axios/>
   [React Native Encrypted Storage]: <https://github.com/emeraldsanto/react-native-encrypted-storage/>
   [React Native Render HTML]: <https://meliorence.github.io/react-native-render-html/>
   [React Native Vector Icons]: <https://github.com/oblador/react-native-vector-icons/>
