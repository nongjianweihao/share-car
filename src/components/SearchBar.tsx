import type { ChangeEvent, FC } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="搜索标题、标签或正文..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
