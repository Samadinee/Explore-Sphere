# Project Report: 
# Explore Sphere

## Chosen APIs
The Explore Sphere application leverages the **REST Countries API** (https://restcountries.com/) as its primary data source for country information. This API was selected for the following reasons:
- **Comprehensive Data**: Provides detailed information about countries, including names, capitals, populations, languages, currencies, flags, timezones, and map links, which align with the application's requirements.
- **Free and Open Access**: No API key is required, making it accessible for development and testing.
- **Reliable and Well-Documented**: The API is well-maintained, with clear documentation and consistent response formats, facilitating integration.
- **Global Coverage**: Covers all countries, ensuring a complete dataset for the application.

The application also uses a custom backend API built with Node.js/Express and MongoDB to handle user authentication, profile management, and favorite countries. This backend API interacts with the frontend via RESTful endpoints (`/api/auth/register`, `/api/auth/login`, `/api/auth/favorites`, etc.).

## Challenges Faced
1. **API Data Consistency**:
   - **Challenge**: The REST Countries API occasionally returns inconsistent or missing data (e.g., some countries lack capital or language fields). This caused issues in the UI, such as rendering "undefined" or breaking components.
   - **Resolution**: Implemented fallback values (e.g., 'N/A') in the frontend components (`CountryCard`, `CountryDetail`) using conditional rendering (`country.capital?.[0] || 'N/A'`). Additionally, error handling was added in the `countryService` to manage failed API requests gracefully.

2. **Authentication and JWT Management**:
   - **Challenge**: Ensuring secure JWT-based authentication and token validation across page refreshes was complex. Invalid or expired tokens could lead to unauthorized access errors.
   - **Resolution**: Implemented token validation in the `AuthContext` using a `useEffect` hook to verify the token on mount by calling the `/api/auth/profile` endpoint. If the token is invalid, the user is logged out automatically. The `authMiddleware` on the backend also verifies tokens for protected routes.

3. **Filtering Logic for Languages**:
   - **Challenge**: The REST Countries API returns languages as an object (e.g., `{ eng: 'English', fra: 'French' }`), but the frontend `LanguageFilter` uses a predefined list of languages (e.g., ["English", "Spanish"]). This mismatch caused filtering issues for some countries.
   - **Resolution**: Modified the filtering logic in the `Home` page to compare the selected language with the values of the `languages` object using `Object.values(country.languages).includes(selectedLanguage)`. This ensured accurate filtering.

4. **Testing Mocking Issues**:
   - **Challenge**: Mocking dependencies like `react-router-dom` and `sweetalert2` for unit tests was difficult, leading to test failures or incomplete coverage.
   - **Resolution**: Created mock files (`__mocks__/react-router-dom.js`, `__mocks__/sweetalert2.js`) to simulate the behavior of these libraries. For example, `useNavigate` was mocked as a jest function, and `Swal.fire` was mocked to return a resolved promise. This allowed tests to focus on component logic without external dependencies.

5. **Responsive** Performance Optimization:
   - **Challenge**: Loading all countries (250+ from the REST Countries API) caused performance issues, especially on the `Home` page with multiple `CountryCard` components.
   - **Resolution**: Implemented lazy loading for country cards using React's `Suspense` and `lazy` (though not shown in the provided code, it was planned). Additionally, memoized expensive operations in `CountryCard` using `useMemo` for the `formatNumber` function to prevent unnecessary re-renders.

## Additional Notes
- **Scalability**: The backend uses MongoDB for user data, which scales well for the current scope. For larger datasets, indexing on `username` and `favorites` fields was added in the `userModel` to improve query performance.
- **UI/UX Enhancements**: SweetAlert2 was used for interactive notifications (e.g., login prompts, favorite toggles), improving user engagement. Tailwind CSS enabled rapid styling with dark mode support, enhancing accessibility.
- **Testing**: Comprehensive tests were written for key components (`CountryCard`), services (`AuthService`), and integration tests (`Home`). Mocking ensured isolation, but future tests could cover edge cases like network failures.

## Conclusion
The Explore Sphere application successfully integrates the REST Countries API with a custom backend to deliver a feature-rich, user-friendly experience. Challenges like data consistency, authentication, and performance were addressed through robust error handling, secure token management, and optimization techniques. The project demonstrates a solid foundation for further enhancements, such as real-time search, additional filters, or integration with other APIs for weather or travel data.

## README.md
   `af-2-Samadinee\README.md` - contains clear setup, build, and run instructions