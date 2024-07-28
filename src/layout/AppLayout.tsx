import { ReactElement } from 'react'
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const AppLayout = ({ children }: { children: ReactElement }) => {
    return (
        <div className="w-full jost-font">
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default AppLayout