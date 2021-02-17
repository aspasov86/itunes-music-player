import { render, screen } from '@testing-library/react';
import CoverImage from './CoverImage';

test('renders an image', () => {
  render(<CoverImage src="test/100.jpg" />);

  const img = screen.getByAltText(/cover/i);

  expect(img).toBeInTheDocument();
});
test('source and size affect the image', () => {
  const srcPath = 'test';
  const size = 200;
  render(<CoverImage src={`${srcPath}/100.jpg`} size={size} />);

  const img = screen.getByAltText(/cover/i);

  expect(img.src).toContain(srcPath);
  expect(img.src).toContain(size);
});
