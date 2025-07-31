export function shuffleCards(cards) {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[j], shuffled[i]] = [shuffled[i], shuffled[j]];
  }
  return shuffled;
}
