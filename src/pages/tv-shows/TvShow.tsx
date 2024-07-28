import AppLayout from "../../layout/AppLayout.tsx";

const TvShow = () => {
    return (
        <AppLayout>
            <div data-testid='tvshow-element' className='container m-auto p-4'>
                <h1 data-testid='tvshow-h1-element'>TV Shows</h1>
            </div>
        </AppLayout>
    );
}

export default TvShow;