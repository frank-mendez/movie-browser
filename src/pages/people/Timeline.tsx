const Timeline = () => {
    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold'>2019</h2>
                    <p>Movie Name</p>
                    <p>Character Name</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold'>2018</h2>
                    <p>Movie Name</p>
                    <p>Character Name</p>
                </div>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold'>2017</h2>
                    <p>Movie Name</p>
                    <p>Character Name</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-bold'>2016</h2>
                    <p>Movie Name</p>
                    <p>Character Name</p>
                </div>
            </div>
        </div>
    )
}

export default Timeline