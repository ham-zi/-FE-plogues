import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit3, FiDownload } from "react-icons/fi";
import api from "../../../api/axios";

import {
  FormWrap,
  FormTitle,
  FormRow,
  SelectBox,
  FileDropContainer,
  FileDropBox,
  PreviewZone,
  FormButtons,
} from "./ProofStyle";

function ProofForm() {
  const navigate = useNavigate();
  const { proofNo } = useParams(); // URL에 proofNo가 있으면 수정 모드
  const isEdit = !!proofNo;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("PLOG");

  // 임시 데이터 다음에 api 연결할 거심
  const [joinList, setJoinList] = useState([]);

  useEffect(() => {
    api
      .get("/joins", {
        params: {
          page: 1,
          category: "plant",
        },
      })
      .then((res) => {
        const list = res.data.data.board;

        const userId = localStorage.getItem("userId");

        const myJoinList = list.filter((join) => join.userId === userId);

        setJoinList(myJoinList);
      })
      .catch((err) => console.error("참여 활동 조회 실패", err));
  }, []);

  // 내가 쓴 인증글 목록을 저장
  const [myProofs, setMyProofs] = useState([]);
  const [joinNo, setJoinNo] = useState("");

  const [quantity, setQuantity] = useState("");
  const [content, setContent] = useState("");

  const [activityFile, setActivityFile] = useState(null);
  const [activityPreview, setActivityPreview] = useState("");

  const [weightFile, setWeightFile] = useState(null);
  const [weightPreview, setWeightPreview] = useState("");

  const activityInputRef = useRef(null);
  const weightInputRef = useRef(null);

  // 기존 게시글 데이터를 가져와 채워 넣기
  useEffect(() => {
    if (isEdit) {
      const fetchDetail = async () => {
        try {
          const res = await api.get(`/proof/${proofNo}`);
          const proof = res.data.data;

          setTitle(proof.title);
          setCategory(proof.category);
          setJoinNo(proof.joinNo);
          setQuantity(proof.quantity);
          setContent(proof.content);

          if (proof.files[0]) {
            const file1 = proof.files[0];
            const url = `${file1.filePath}${file1.changeName}`;

            setActivityPreview(url);

            const blob = await fetch(url).then((res) => res.blob());
            setActivityFile(
              new File([blob], file1.originName, {
                type: blob.type,
              }),
            );
          }

          if (proof.files[1]) {
            const file2 = proof.files[1];
            const url = `${file2.filePath}${file2.changeName}`;

            setWeightPreview(url);

            const blob = await fetch(url).then((res) => res.blob());
            setWeightFile(
              new File([blob], file2.originName, {
                type: blob.type,
              }),
            );
          }
        } catch (err) {
          console.error("인증글 상세 조회 실패:", err);
        }
      };
      fetchDetail();
    }
  }, [proofNo, isEdit]);

  // 컴포넌트 실행 시 본인이 쓴 인증글 가져오기
  useEffect(() => {
    const fetchMyJoins = async () => {
      try {
        const [plantRes, plogRes] = await Promise.all([
          api.get("/joins", {
            params: {
              page: 1,
              category: "plant",
            },
          }),
          api.get("/joins", {
            params: {
              page: 1,
              category: "plogging",
            },
          }),
        ]);

        const plantList = plantRes.data.data.board || [];
        const plogList = plogRes.data.data.board || [];

        const myId = localStorage.getItem("userId");

        const list = [...plantList, ...plogList].filter(
          (join) => join.userId === myId,
        );

        setJoinList(list);
      } catch (err) {
        console.error("내 모집 활동 조회 실패", err);
      }
    };

    fetchMyJoins();
  }, []);

  // 전체 활동 중에서 이미 작성한 글의 joinNo를 대조해 필터링
  const availableJoinList = joinList.filter((join) => {
    if (isEdit && Number(join.joinNo) === Number(joinNo)) return true;

    const isAlreadyCertified = myProofs.some(
      (proof) => Number(proof.joinNo) === Number(join.joinNo),
    );
    return !isAlreadyCertified;
  });

  // 파일 선택
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    if (type === "activity") {
      setActivityFile(file);
      setActivityPreview(url);
    }

    if (type === "weight") {
      setWeightFile(file);
      setWeightPreview(url);
    }
  };

  // 파일 삭제
  const handleRemoveFile = (type) => {
    if (type === "activity") {
      setActivityFile(null);
      setActivityPreview("");
    }

    if (type === "weight") {
      setWeightFile(null);
      setWeightPreview("");
    }
  };

  // 제출
  const handleSubmit = async () => {
    if (!title.trim()) {
      return alert("제목을 입력해주세요.");
    }

    if (!joinNo) {
      return alert("참여 활동을 선택해주세요.");
    }

    if (!quantity) {
      return alert("수량을 입력해주세요.");
    }

    if (!content.trim()) {
      return alert("내용을 입력해주세요.");
    }

    if (!activityPreview || !weightPreview) {
      return alert("인증 사진 2장을 등록해주세요.");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("category", category);
    formData.append("joinNo", joinNo);
    formData.append("quantity", quantity);
    formData.append("content", content);

    if (activityFile) formData.append("file", activityFile);
    if (weightFile) formData.append("file", weightFile);

    try {
      if (isEdit) {
        await api.patch(`/proof/${proofNo}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("인증글이 수정되었습니다.");
        navigate(`/proofs/${proofNo}`);
      } else {
        await api.post("/proof", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("인증글 등록 완료");
        navigate("/proofs");
      }
    } catch (err) {
      console.log("status:", err.response?.status);
      console.log("data:", err.response?.data);
      console.log("message:", err.message);

      alert(
        err.response?.data?.message ||
          (isEdit ? "수정에 실패했습니다." : "등록에 실패했습니다."),
      );
    }
  };

  return (
    <FormWrap>
      <FormTitle>
        <FiEdit3 />
        인증 게시판 {isEdit ? "수정" : "작성"}
      </FormTitle>

      {/* 제목 */}
      <FormRow>
        <label>
          제목<span className="required">*</span>
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목 입력"
        />
      </FormRow>

      {/* 카테고리 */}
      <FormRow>
        <label>
          카테고리<span className="required">*</span>
        </label>

        <SelectBox
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="PLOG">플로깅</option>
          <option value="PLANT">나무심기</option>
        </SelectBox>
      </FormRow>

      {/* 참여 활동 */}
      <FormRow>
        <label>
          참여 활동<span className="required">*</span>
        </label>

        <SelectBox value={joinNo} onChange={(e) => setJoinNo(e.target.value)}>
          <option value="">참여한 활동 선택</option>

          {availableJoinList.map((join) => (
            <option key={join.joinNo} value={join.joinNo}>
              {join.title}
            </option>
          ))}
        </SelectBox>
      </FormRow>

      {/* 수량 */}
      <FormRow>
        <label>
          {category === "PLOG" ? "수거 쓰레기 무게" : "나무 그루 수"}

          <span className="required">*</span>
        </label>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder={category === "PLOG" ? "예) 4.03" : "예) 3"}
        />
      </FormRow>

      {/* 내용 */}
      <FormRow>
        <label>
          내용<span className="required">*</span>
        </label>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="활동 내용을 작성해주세요."
        />
      </FormRow>

      <FileDropContainer>
        {/* 활동 사진 */}
        <FormRow style={{ flex: 1 }}>
          <label>활동 사진</label>

          <FileDropBox>
            {activityPreview ? (
              <PreviewZone>
                <img src={activityPreview} alt="활동" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile("activity");
                  }}
                >
                  ×
                </button>
              </PreviewZone>
            ) : (
              <>
                <FiDownload />
                <span>이미지 or 파일 첨부</span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              ref={activityInputRef}
              onChange={(e) => handleFileChange(e, "activity")}
            />
          </FileDropBox>
        </FormRow>

        {/* 증빙 사진 */}
        <FormRow style={{ flex: 1 }}>
          <label>
            {category === "PLOG" ? "쓰레기 무게 사진" : "나무 심기 사진"}
          </label>

          <FileDropBox>
            {weightPreview ? (
              <PreviewZone>
                <img src={weightPreview} alt="증빙" />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile("weight");
                  }}
                >
                  ×
                </button>
              </PreviewZone>
            ) : (
              <>
                <FiDownload />
                <span>이미지 or 파일 첨부</span>
              </>
            )}

            <input
              type="file"
              accept="image/*"
              ref={weightInputRef}
              onChange={(e) => handleFileChange(e, "weight")}
            />
          </FileDropBox>
        </FormRow>
      </FileDropContainer>

      <FormButtons>
        <button className="submit" onClick={handleSubmit}>
          {isEdit ? "수정" : "제출"}
        </button>

        <button
          className="cancel"
          onClick={() => navigate(isEdit ? `/proofs/${proofNo}` : "/proofs")}
        >
          취소
        </button>
      </FormButtons>
    </FormWrap>
  );
}

export default ProofForm;
