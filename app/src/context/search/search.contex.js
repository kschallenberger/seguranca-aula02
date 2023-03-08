import createGlobalState from 'react-create-global-state';

const [_useGlobalSearch, Provider] = createGlobalState("");

function useGlobalSearch() {
    const [search, setSearch] = _useGlobalSearch();

    function handleChange(event) {
        setSearch(event.target.value);
    }

    return [search, setSearch, handleChange];
}

export const GlobalSearchProvider = Provider;

export default useGlobalSearch;