/* eslint-disable react/prop-types */
import "./SearchStyles.css";
const Search = ({ todo, filteredCategories }) => {
  return (
    <>
      {todo && (
        <ul className="search-container">
          {filteredCategories.length === 0 ? (
            <p>No Items found</p>
          ) : (
            filteredCategories.map((category) => (
              <li key={category.id}>{category.title}</li>
            ))
          )}
        </ul>
      )}
    </>
  );
};

export default Search;
