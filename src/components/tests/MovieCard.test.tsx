import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import MovieCard from "../MovieCard.tsx";

describe('MovieCard', () => {
    const mockMovies = [
        {
            "backdrop_path": "/2RVcJbWFmICRDsVxRI8F5xRmRsK.jpg",
            "id": 762441,
            "title": "A Quiet Place: Day One",
            "original_title": "A Quiet Place: Day One",
            "overview": "As New York City is invaded by alien creatures who hunt by sound, a woman named Sam fights to survive with her cat.",
            "poster_path": "/yrpPYKijwdMHyTGIOd1iK1h0Xno.jpg",
            "media_type": "movie",
            "adult": false,
            "original_language": "en",
            "genre_ids": [
                27,
                878,
                53
            ],
            "popularity": 1899.794,
            "release_date": "2024-06-26",
            "video": false,
            "vote_average": 7.0,
            "vote_count": 724
        },
    ];

    it('renders movie information correctly', () => {
        render(<MovieCard movies={mockMovies} />);

        expect(screen.getByText('A Quiet Place: Day One')).toBeInTheDocument();
        expect(screen.getByText('Release Date: June 26, 2024')).toBeInTheDocument();
        expect(screen.getByText('Vote average: 7')).toBeInTheDocument();
    });
});