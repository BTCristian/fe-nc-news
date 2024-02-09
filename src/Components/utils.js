export const sortArticles = (articles, sortOption, sortOrder) => {
  let sortedArticles = [...articles];

  if (sortOption === "date") {
    sortedArticles.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  } else if (sortOption === "comment_count") {
    sortedArticles.sort((a, b) => b.comment_count - a.comment_count);
  } else if (sortOption === "votes") {
    sortedArticles.sort((a, b) => b.votes - a.votes);
  }

  if (sortOrder === "asc") {
    sortedArticles.reverse();
  }

  return sortedArticles;
};
