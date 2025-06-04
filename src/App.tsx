import "./App.css";
import SearchBar from "./components/SearchBar";

function App() {
  function handleSearch(city: string): void {
    throw new Error("Function not implemented.");
  }

  function handleLocationRequest(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="bg-blue-400 h-screen py-8">
        <SearchBar
          onSearch={handleSearch}
          onLocationRequest={() => {}}
          isLoading={false}
        />
      </div>
    </>
  );
}

export default App;
