import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { JSX } from "react";

export function makePeopleQueryClient() {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

export function renderPeopleRoute(
  component: JSX.Element,
  queryClient: QueryClient,
) {
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/people/1"]}>
        <Routes>
          <Route path="/people/:personId" element={component} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}
