import { useRoutes } from "react-router-dom";
import { AuthTabs } from "./pages/auth";

export const AppRouter = () => {
    const routes = useRoutes([
        { path: '/', element: <AuthTabs /> },
    ]);

    return routes;
}

