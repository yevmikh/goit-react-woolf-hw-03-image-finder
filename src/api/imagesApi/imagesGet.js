const API_KEY = '42208037-79ed24c913e3ae53795b11edc';

const fetchImages = async (query, page) => {
  const url = `https://pixabay.com/api/?q=${encodeURIComponent(
    query
  )}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await fetch(url);
  const { hits, totalHits } = await response.json();
  return { hits, totalHits };
};

export { fetchImages };
