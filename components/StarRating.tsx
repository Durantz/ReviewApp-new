interface StarRating {
  value: number;
  onChange: (value: string) => void;
}

const StarRating: React.FC<StarRating> = ({ value, onChange }) => {
  return <div>Ciao</div>;
};

export default StarRating;