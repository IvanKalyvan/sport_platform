import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1.25rem; /* p-5 */
  background-color: #f3f4f6; /* bg-gray-100 */
`;

export const Alert = styled.div`
  padding: 1.5rem; /* p-6 */
  border-radius: 0.75rem; /* rounded-lg */
  text-align: center;
  width: 100%;
  max-width: 36rem; /* max-w-xl */
  box-sizing: border-box; /* box-border */
  margin-bottom: 2rem; /* mb-8 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-lg */
`;

export const AlertSuccess = styled(Alert)`
  background-color: #f0fdf4; /* bg-green-100 */
  color: #2f855a; /* text-green-800 */
  border: 2px solid #c6f6d5; /* border-green-200 */
`;

export const AlertError = styled(Alert)`
  background-color: #fee2e2; /* bg-red-100 */
  color: #e53e3e; /* text-red-800 */
  border: 2px solid #feb2b2; /* border-red-200 */
`;

export const AlertTitle = styled.h2`
  margin-bottom: 0.5rem; /* mb-2 */
  font-size: 1.5rem; /* text-2xl */
  font-weight: 600; /* font-semibold */
`;

export const AlertText = styled.p`
  font-size: 1rem; /* text-base */
  line-height: 1.625; /* leading-relaxed */
  color: #4a5568; /* text-gray-600 */
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem; /* gap-6 */
  width: 100%;
  max-width: 36rem; /* max-w-xl */
  box-sizing: border-box; /* box-border */
`;

export const ButtonSecondary = styled.button`
  padding: 0.75rem 2rem; /* px-8 py-3 */
  font-size: 1.125rem; /* text-lg */
  font-weight: 500; /* font-medium */
  border-radius: 0.75rem; /* rounded-lg */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 11rem; /* w-44 */
  background-color: #4a5568; /* bg-gray-600 */
  color: #fff;

  &:hover {
    background-color: #2d3748; /* hover:bg-gray-700 */
  }
`;

export const ButtonPrimary = styled.button`
  padding: 0.75rem 2rem; /* px-8 py-3 */
  font-size: 1.125rem; /* text-lg */
  font-weight: 500; /* font-medium */
  border-radius: 0.75rem; /* rounded-lg */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 11rem; /* w-44 */
  background-color: #4299e1; /* bg-blue-500 */
  color: #fff;

  &:hover {
    background-color: #2b6cb0; /* hover:bg-blue-700 */
  }
`;
