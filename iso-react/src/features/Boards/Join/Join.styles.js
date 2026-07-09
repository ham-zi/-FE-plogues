import styled from "styled-components";

export const JoinWrap = styled.div`
  width: 1200px;
  height: auto;
  margin: 50px auto;
`;

export const JoinTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    font-size: 26px;
  }

  button {
    background-color: #2f8f83;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 7px 14px;
    font-size: 12px;
    cursor: pointer;
  }
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 230px);
  justify-content: center;
  column-gap: 15px;
  row-gap: 40px;
`;

export const CardBottom = styled.div`
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

export const Card = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 230px;
  height: 220px;
  border-radius: 14px;
  padding: 20px;
  background-color: ${(props) => props.$bg};
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  margin: 50px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &:hover {
    cursor: pointer;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: -12px;
  left: 20px;
  background-color: #8e44ad;
  color: white;
  border-radius: 8px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: bold;
`;

export const CardTitle = styled.h4`
  margin: 15px 0 0 0;
  font-size: 16px;
  text-align: center;
  color: #2c3e50;
  font-weight: 800;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LeaderText = styled.p`
  margin: 6px 0 0 0;
  text-align: center;
  font-size: 12px;
  color: ${(props) => props.$textColor || "white"};
  opacity: 0.9;
`;

export const MemberRow = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  margin-top: 14px;
`;

export const Avatar = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  margin-right: -10px;
  background-color: #f39c12;

  &:first-child {
    margin-right: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const MoreAvatar = styled.span`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  border: 2px solid white;
  margin-left: -10px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: ${(props) => props.$textColor || "white"};
  margin-bottom: 6px;
  font-weight: bold;
`;

export const ProgressBar = styled.div`
  height: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  background-color: #cddc39;
  width: ${(props) => props.$percent};
  transition: width 0.3s ease-in-out;
`;

export const DateBadge = styled.div`
  position: absolute;
  bottom: 10px;
  right: 12px;
  background-color: rgba(255, 255, 255, 0.25);
  color: ${(props) => props.$textColor || "white"};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 11px;
`;

export const BottomSection = styled.div`
  margin-top: auto;
  padding-bottom: 22px;
`;

export const PageInfo = styled.div`
  text-align: right;
  margin: 20px 0 10px;
  font-size: 13px;
  justify-content: flex-end;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2px;
  margin: 20px 0;

  span {
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    min-width: 30px;
    text-align: center;
  }
`;

export const PageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background-color: transparent;
  background-color: transparent;
  color: #4a5568;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    background-color: transparent;
    color: #1a202c;
  }

  &:active:not(:disabled) {
    background-color: transparent;
    opacity: 0.7;
  }

  &:disabled {
    background-color: transparent;
    color: #cbd5e0;
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

export const PageNumbers = styled.span`
  border: 1px solid #999;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  min-width: 40px;
  text-align: center;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
  position: relative;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 0 0 4px 0;
  position: relative;
  padding-bottom: 6px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 75px;
    height: 4px;
    background-color: #4a9088;
  }
`;

export const WriteButton = styled.button`
  background-color: #4a9088;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3e7d76;
  }
`;

// ======================
// Detail Page
// ======================

export const DetailWrap = styled.div`
  width: 760px;
  margin: 50px auto;
  background: #fff;
  border: 3px solid #6cb9b1;
  border-radius: 20px;
  padding: 30px 36px 36px;
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LeftSection = styled.div`
  flex: 1;
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const Logo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
`;

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const DetailTitle = styled.h2`
  margin: 0;
  font-size: 26px;
  font-weight: 700;
  color: #444;
`;

export const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;

  svg {
    font-size: 22px;
    color: #9acb55;
  }
`;

export const AlarmButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: #ffdada;
  color: #ff6b6b;
  cursor: pointer;

  svg {
    font-size: 22px;
  }
`;

export const InfoWrapper = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  column-gap: 55px;
  margin-top: 32px;
`;

export const InfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #555;
  font-size: 14px;
  font-weight: 500;
`;

export const InfoIcon = styled.div`
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9acb55;

  svg {
    font-size: 24px;
  }
`;

export const ProgressTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  span {
    font-size: 13px;
    font-weight: 600;
    color: #444;
  }
`;

export const MemberBar = styled.div`
  width: 100%;
  height: 5px;
  background: #ececec;
  border-radius: 20px;
  overflow: hidden;
`;

export const MemberFill = styled.div`
  width: ${(props) => props.$percent || "70%"};
  height: 100%;
  background: #69c36d;
`;

export const ContentBox = styled.div`
  margin-top: 26px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 18px;
  min-height: 180px;
  color: #444;
  font-size: 13px;
  line-height: 1.8;

  ul {
    margin-top: 8px;
    padding-left: 18px;
  }

  li {
    margin-bottom: 4px;
  }
`;

export const ImageBox = styled.div`
  width: 260px;
  margin: 30px auto 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    display: block;
    object-fit: cover;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 34px;
`;

export const JoinButton = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: #3d9a95;
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background: #338983;
  }
`;

export const ListButton = styled.button`
  width: 120px;
  height: 40px;
  border: 2px solid #3d9a95;
  border-radius: 10px;
  background: white;
  color: #3d9a95;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12);

  &:hover {
    background: #f5ffff;
  }
`;

// ======================
// Form Page
// ======================

export const FormContainer = styled.div`
  width: 800px;
  margin: 50px auto;
  padding: 40px;
  background: #fff;
  border-radius: 12px;
`;

export const FormHeader = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  margin-bottom: 30px;
  border-bottom: 2px solid #eee;
  padding-bottom: 20px;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
  span {
    color: #e74c3c;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TimeInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr 3fr;
  gap: 15px;
  margin-bottom: 20px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  box-sizing: border-box;
`;

export const FormButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
`;

export const Button = styled.button`
  padding: 12px 40px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  border: ${(props) => (props.$primary ? "none" : "1px solid #3d9a95")};
  background: ${(props) => (props.$primary ? "#3d9a95" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#3d9a95")};
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  color: #333;
`;

export const FileUploadContainer = styled.div`
  margin-top: 20px;
`;

export const FileUploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const FileLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 180px;
  height: 120px;

  border: 2px dashed #ddd;
  border-radius: 12px;
  background-color: #fff;

  cursor: pointer;
  color: #999;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    border-color: #3d9a95;
    color: #3d9a95;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadText = styled.span`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
`;

export const PreviewBox = styled.div`
  width: 120px;
  height: 120px;

  border: 1px solid #ddd;
  border-radius: 12px;
  overflow: hidden;

  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
