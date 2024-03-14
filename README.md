# Modal_database

The website acts as a dashboard to showcase the various models deployed by organisations and developers. 
The developers can upload the details of their models.
The users can see all the models and also the featured models sorted according to views and likes.
The models can also be filtered depending on type they belong. 
Complete detailed description of models can also be seen along with the basic code to implement them.

## Project Structure

The project is organized as follows:

- `public/`: Contains static assets such as HTML files, images, and icons.
  - `utilities/media/`: Media assets like images for testing.
- `src/`: Source code for the application.
  - `components/`: Reusable components 
    - `navbar.js`: Navbar of the website with home button , search bar, create button.
    -  `featured.js`: Featured wall containing models sorted based on views and likes. 
    -  `model_cards.js`: Model cards to display models with their image, author, body, views,likes and link to each model.
    -  `model_list.js`: List of all the model cards with the option to filter based on model type. Paginated view to enhance user experience. 
    -  `explore.js`: The detail page view for each model. Showing code and detailed description of each model. 
  - `hooks/`: Custom React hooks, e.g., `useFetch.js` for data fetching.
  - `pages/`: Individual pages of the application, such as Home, Explore, and Create.
  - `store/`: Redux store configuration and slices for state management.
  - `AppRoutes.js`: Routes of all the pages.
- `.gitignore`: Specifies intentionally untracked files to ignore.
- `db.json`: A JSON database for the project (used by JSON Placeholder to create mock API's)
- `package.json` & `package-lock.json`: NPM configuration files for project dependencies.
- `README.md`: This README file.

## Packages and Plugins

React framework is used to make the website.
This project uses the following packages and plugins:

- `@emotion/react` and `@emotion/styled` for styling components.
- `@mui/icons-material` and `@mui/material` for Material UI components and icons.
- `@reduxjs/toolkit` and `react-redux` for state management.
- `axios` for making HTTP requests.
- `cloudinary` for handling cloud-based image storage and manipulation.
- `formik` and `yup` for form handling and validation.
- `react`, `react-dom`, and `react-scripts` as the core React framework and tooling.
- `react-code-blocks` for displaying code snippets within the UI.
- `react-router-dom` for routing and navigation.
- `redux-persist` for persisting and rehydrating the Redux store.
- `web-vitals` for measuring website performance metrics.

## Load Time
Load time is measured using Web Vitals:

LCP = 1868 ms
FID = 0.6 ms
CLS = 0.097
  
The scores were pretty good.

### Strategies to Reduce Load Time

1. **Efficient Asset Management:** Static assets like images are stored on Cloudinary, which provides optimized delivery based on the user's location and device.
2. **Minimization and Bundling:** Minifying CSS, JavaScript, and HTML files, and bundling them together to reduce the number of server requests and the size of files being transferred.
3. **Caching Strategies:** Implementing effective caching with service workers and redux-persist to cache application state and assets, decreasing load times on subsequent visits.
4. **Performance Monitoring:** Regularly monitoring the site's performance using tools likeWeb Vitals to identify and address issues promptly.
5. **Data Fetching:** Data Fetching is done is page itself and data is supplied to the components of the page.
  
## Setup

To get this project up and running on your local machine, follow these steps:

1. Clone this repository or download the project files.
2. Navigate to the project directory and install dependencies:

```bash
npm install