import AppLayout from "../../layout/AppLayout.tsx";

const Movies = () => {
    return (
        <AppLayout>
            <div data-testid='movies-element' className='container m-auto p-4'>
                <h1 data-testid='movies-h1-element'>Movies</h1>
            </div>
        </AppLayout>
    );
}

export default Movies;