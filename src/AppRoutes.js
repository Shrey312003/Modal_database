import { useRoutes } from "react-router-dom";
import Home from "./pages/home";
import ExplorePage from "./pages/explore_page";

const routes = () => [
    {
        path: '/',
        element: <Home/>,
    },

    {
        path: '/explore/:id',
        element: <ExplorePage/>
    }
    
];

function AppRoutes() {
    let app_routes = useRoutes(routes());
    return app_routes;
}

export default AppRoutes;