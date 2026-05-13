const FilterPanel = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  clearFilters,
  hasFilters,
}: any) => {
  const categoriesWithAll = [
    { slug: "", name: "All Categories" },
    ...categories,
  ];
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-app-green mb-3">
          Categories
        </h3>
        <div className="space-y-1.5">
          {categoriesWithAll.map((cat: any) => (
            <button
              key={cat.slug}
              onClick={() => updateFilter("category", cat.slug)}
              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-all ${category === cat.slug ? "bg-app-green text-white" : "text-app-text-light hover:bg-app-cream"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
