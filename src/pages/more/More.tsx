import AppLayout from "../../layout/AppLayout.tsx";

const More = () => {
    return (
        <AppLayout>
            <div data-testid='more-element' className='container m-auto p-4'>
                <h1 data-testid='more-h1-element'>More</h1>
            </div>
        </AppLayout>
    );
}

export default More;