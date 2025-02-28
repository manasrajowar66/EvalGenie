import natural from "natural";
import _ from "lodash";

// Stopwords (Common words to ignore)
const STOPWORDS = new Set([
  "the", "is", "and", "a", "an", "to", "in", "at", "on", "for", "of", "by", "with",
  "as", "this", "that", "it", "from", "or", "but", "not", "be", "so", "too", "very"
]);

// Function to generate keywords from notes
export function extractKeywords(notes: string): string[] {
  if (!notes) return [];

  // Tokenize words
  const tokenizer = new natural.WordTokenizer();
  let words = tokenizer.tokenize(notes);

  // Convert to lowercase
  words = words.map(word => word.toLowerCase());

  // Remove stopwords and short words (length < 3)
  words = words.filter(word => !STOPWORDS.has(word) && word.length > 2);

  // Remove duplicates
  return _.uniq(words);
}
