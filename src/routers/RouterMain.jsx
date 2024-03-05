import { createBrowserRouter } from "react-router-dom";

// Layout
import LayoutMain from '../layouts/LayoutMain';

// Pages
import PagePersonals from '../pages/PagePersonals';
import PageMake from '../pages/PageMake';

const RouterMain = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <PagePersonals />,
            },
            {
                path: "make",
                element: <PageMake />,
            },
            {
                path: "history",
                element: <div>Geçmiş Tebliğler</div>,
            },
        ],
    },
]);

export default RouterMain;