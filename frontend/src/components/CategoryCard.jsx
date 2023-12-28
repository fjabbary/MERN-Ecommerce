const CategoryCard = ({ category }) => {
  const { title, imageUrl } = category;
  console.log(title);
  return (
    <div className="category-card">
      <img src={imageUrl} alt={`Category: ${title}`} />
      <h2 className="category-title">{title}</h2>
    </div>
  );
};

export default CategoryCard;
