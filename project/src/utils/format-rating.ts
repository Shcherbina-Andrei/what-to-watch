const transformRatingToWordValue = (rating: number): string => {
  let ratingWord = '';
  if (rating >= 0 && rating < 3) {
    ratingWord = 'Bad';
  } else if (rating >= 3 && rating < 5) {
    ratingWord = 'Normal';
  } else if (rating >= 5 && rating < 8) {
    ratingWord = 'Good';
  } else if (rating >= 8 && rating < 10) {
    ratingWord = 'Very good';
  } else if (rating === 10) {
    ratingWord = 'Awesome';
  }

  return ratingWord;
};

export {transformRatingToWordValue};
