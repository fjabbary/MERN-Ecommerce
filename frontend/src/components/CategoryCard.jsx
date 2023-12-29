const CategoryCard = ({ category }) => {
  const { title, imageUrl } = category;

  return (
    <div className="category-card">
      <img src={imageUrl} alt={`Category: ${title}`} />
      <h2 className="category-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
