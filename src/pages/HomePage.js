import FilterPage from "../Feature/FilterPage/FilterPage";
import Navbar from "../Feature/Navbar/Navbar";
import ProductList from "../Feature/ProductList/ProductList";
import Pagination from "../Feature/Pagination/Pagination";

const HomePage = () => {
  return (
    <>
      <Navbar>
        <FilterPage>
          <ProductList />
        </FilterPage>
        <Pagination />
      </Navbar>
    </>
  );
};

export default HomePage;
