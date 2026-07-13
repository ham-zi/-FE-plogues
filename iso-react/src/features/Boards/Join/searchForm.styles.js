import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const SearchSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 50px 0 30px;
`;

export const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchInput = styled.input`
  width: 500px;
  height: 48px;
  padding: 0 18px;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.color.main};
    box-shadow: 0 0 0 3px rgba(52, 144, 139, 0.15);
  }

  &::placeholder {
    color: #999;
  }
`;

export const SearchButton = styled.button`
  width: 80px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background: ${theme.color.main};
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${theme.color.logo};
  }
`;
