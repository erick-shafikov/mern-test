import {Navigate, Route, Routes} from "react-router-dom"
import { AuthPage } from "./pages/AuthPage"
import { CratePage } from "./pages/CreatePage"
import { DetailPage } from "./pages/DetailPage"
import { LinksPage } from "./pages/LinksPage"

export const useRoutes = isAuthenticated => {
    if(isAuthenticated) {
        return (
            <Routes>
                <Route path="/links" element={<LinksPage />}/>
                <Route path="/create" element={<CratePage />}/>
                <Route path="/detail/:id" element={<DetailPage />}/>
                <Route path="*" element={<Navigate to="/create" replace/>} />
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace/>} />
        </Routes>
    )
}