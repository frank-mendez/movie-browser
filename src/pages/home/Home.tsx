import AppLayout from "../../layout/AppLayout.tsx";

const Home = () => {
    return (
        <AppLayout>
            <div data-testid='home-element' className='container m-auto p-4'>
                <h1>Home</h1>
            </div>
        </AppLayout>
    );
}

export default Home;