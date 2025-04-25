import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6; /* bg-gray-100 */
`;

export const Card = styled.div`
  max-width: 28rem; /* max-w-md */
  width: 100%;
  padding: 2rem; /* p-8 */
  border-radius: 0.75rem; /* rounded-lg */
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow-xl */
  background-color: #fff; /* bg-white */
`;

export const Success = styled.div`
  border-left: 4px solid #48bb78; /* border-green-500 */
`;

export const Error = styled.div`
  border-left: 4px solid #f56565; /* border-red-500 */
`;

export const Title = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  margin-bottom: 1rem; /* mb-4 */
`;

export const Text = styled.p`
  font-size: 1rem; /* text-base */
  color: #4a5568; /* text-gray-600 */
  margin-bottom: 1.25rem; /* mb-5 */
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BackButton = styled.button`
  width: 50%;
  padding: 0.5rem; /* p-2 */
  font-size: 1rem; /* text-base */
  background-color: #4a5568; /* bg-gray-600 */
  color: #fff;
  border-radius: 0.375rem; /* rounded-md */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2d3748; /* hover:bg-gray-700 */
  }
`;

export const LoginButton = styled.button`
  width: 50%;
  padding: 0.5rem; /* p-2 */
  font-size: 1rem; /* text-base */
  background-color: #4299e1; /* bg-blue-500 */
  color: #fff;
  border-radius: 0.375rem; /* rounded-md */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2b6cb0; /* hover:bg-blue-700 */
  }
`;
