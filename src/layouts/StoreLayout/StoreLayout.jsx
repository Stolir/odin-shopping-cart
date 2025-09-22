import { NavLink, Outlet, useNavigate } from 'react-router';
import styles from './StoreLayout.module.css';

function StoreLayout() {
  const navigate = useNavigate();

  const categories = [
    {
      category: "men's clothing",
      displayName: 'MEN',
    },
    {
      category: "women's clothing",
      displayName: 'WOMEN',
    },
    {
      category: 'jewelery',
      displayName: 'JEWELERY',
    },
  ];

  const handleFilter = (category) => {
    navigate(`${encodeURIComponent(category)}`);
  };

  return (
    <div className={styles.storeLayout}>
      <div className={styles.filters}>
        {categories.map((cat) => (
          <button
            type='button'
            key={cat.category}
            to={cat.category}
            onClick={() => {
              handleFilter(cat.category);
            }}
          >
            {cat.displayName}
          </button>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default StoreLayout;
