import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  TextArea,
  ModalButtonGroup,
  Button,
} from "./Join.styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios";
import { customAlert } from "../../Commons/Alert";
import { IoClose } from "react-icons/io5";

const RequestModal = ({ joinNo, category }) => {
  const [request, setRequest] = useState({
    aspiration: "",
  });
  const navi = useNavigate();
  const cancle = () => {
    if (category === "PLOG") {
      navi("/joins/plogging");
    } else {
      navi("/joins/plant");
    }
  };
  const onSubmit = async () => {
    try {
      await api.post(`/request/${joinNo}`, request);
      customAlert.success("참여요청 성공");
      if (category === "PLOG") {
        navi("/joins/plogging");
      } else {
        navi("/joins/plant");
      }
    } catch (err) {
      customAlert.error("이미 참여요청한 게시글입니다.");
      if (category === "PLOG") {
        navi("/joins/plogging");
      } else {
        navi("/joins/plant");
      }
    }
  };

  return (
    <>
      <ModalOverlay>
        <ModalContainer>
          <CloseButton type="button" $primary onClick={cancle}>
            <IoClose />
          </CloseButton>
          <h2>{category === "PLOG" ? "플로깅" : "식목"} 참여하기</h2>
          <p>포부</p>
          <TextArea
            placeholder="포부를 입력해주세요"
            onChange={(e) => setRequest({ aspiration: e.target.value })}
          />
          <ModalButtonGroup>
            <Button type="button" onClick={onSubmit}>
              참여
            </Button>
            <Button type="button" $primary onClick={cancle}>
              취소
            </Button>
          </ModalButtonGroup>
        </ModalContainer>
      </ModalOverlay>
    </>
  );
};

export default RequestModal;
