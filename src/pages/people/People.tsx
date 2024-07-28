import AppLayout from "../../layout/AppLayout.tsx";

const People = () => {
    return (
        <AppLayout>
            <div data-testid='people-element' className='container m-auto p-4'>
                <h1 data-testid='people-h1-element'>People</h1>
            </div>
        </AppLayout>
    );
}

export default People;