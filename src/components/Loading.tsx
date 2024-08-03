const Loading = () => {
    return (
        <div data-testid='loading-element' className="flex m-auto w-full h-screen flex-col gap-4 justify-center items-center">
            <span data-testid='loading-bar-element' className="loading loading-bars loading-lg"></span>
        </div>
    )
}

export default Loading