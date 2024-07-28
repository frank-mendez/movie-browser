import AppLayout from "../../layout/AppLayout.tsx";

const NotFound = () => {
    return (
        <AppLayout>
            <div data-testid='not-found-element' className="min-h-screen flex flex-grow items-center justify-center">
                <div className="rounded-lg p-8 text-center shadow-xl">
                    <h1 className="mb-4 text-4xl font-bold">404</h1>
                    <p className="text-gray-600">Oops! The page you are looking for could not be found.</p>
                    <a href="/"
                       className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"> Go
                        back to Home </a>
                </div>
            </div>
        </AppLayout>
    )
}

export default NotFound