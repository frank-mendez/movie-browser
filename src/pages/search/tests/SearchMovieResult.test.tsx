import {render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {describe, expect, it} from "vitest";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SearchResult} from "../../../types";
import {MediaTypeEnum} from "../../../enums/MovieTabEnum.ts";
import SearchMovieResult from "../SearchMovieResult.tsx";

describe("Search Movie Result Component", () => {
    const queryClient = new QueryClient();
    const mockSearchResult: SearchResult = {
        page: 1,
        results: [
            {
                adult: false,
                backdrop_path: "/backdrop.jpg",
                genre_ids: [28, 12],
                id: 123,
                original_language: "en",
                original_title: "Sample Movie",
                overview: "This is a sample movie overview.",
                popularity: 100.0,
                poster_path: "/poster.jpg",
                release_date: "2023-01-01",
                title: "Sample Movie",
                video: false,
                vote_average: 8.5,
                vote_count: 2000,
                name: "Sample Movie",
                profile_path: "/profile.jpg",
                original_name: "Sample Movie",
                known_for: [
                    {
                        backdrop_path: "/backdrop1.jpg",
                        id: 456,
                        name: "Known For Movie 1",
                        title: "Known For Movie 1",
                        original_name: "Known For Movie 1",
                        overview: "Overview of Known For Movie 1",
                        poster_path: "/poster1.jpg",
                        media_type: "movie",
                        adult: false,
                        original_language: "en",
                        genre_ids: [28, 12],
                        popularity: 80.0,
                        first_air_date: "2022-01-01",
                        vote_average: 7.5,
                        vote_count: 1500,
                        origin_country: ["US"],
                    },
                ],
                known_for_department: "Acting",
                first_air_date: "2023-01-01",
                origin_country: 'US',
                logo_path: "/logo.jpg",
            },
        ],
        total_pages: 10,
        total_results: 100,
    };
    const handlePageChange = (page: number) => {
        console.log(page);
    };
    const searchMovieResultComponent = () => {
        render(
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <SearchMovieResult loading={true} currentPage={1} data={mockSearchResult}
                                        handlePageChange={handlePageChange} mediaType={MediaTypeEnum.MOVIE}/>
                </BrowserRouter>
            </QueryClientProvider>,
        );
    };
    it("renders without crashing", () => {
        searchMovieResultComponent();
        expect(screen.getByTestId("search-movie-result-element")).toBeInTheDocument();
    });

    it("renders loading", () => {
        searchMovieResultComponent();
        expect(screen.getByTestId("loading-element")).toBeInTheDocument();
    });

    it("contains the search result element", () => {
        searchMovieResultComponent();
        expect(screen.getByText('Sample Movie')).toBeInTheDocument();
    });

    it("contains the search result pagination element", () => {
        searchMovieResultComponent();
        expect(screen.getByTestId("search-pagination-element")).toBeInTheDocument();
    });


});
