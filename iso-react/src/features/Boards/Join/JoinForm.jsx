import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  FormContainer,
  FormHeader,
  IconWrapper,
  InputGroup,
  Label,
  Input,
  FormRow,
  TextArea,
  FormButtonGroup,
  Button,
  FileUploadContainer,
  FileLabel,
  FileInput,
  UploadText,
  FileUploadRow,
  PreviewBox,
  TimeInputWrapper,
  TimeInput,
} from "./Join.styles";
import { IoPencilSharp, IoCloudUploadOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import api from "../../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { customAlert } from "../../Commons/Alert";

const JoinForm = () => {
  const navi = useNavigate();
  const { joinNo } = useParams();
  const isEdit = joinNo != null;
  const [loading, isLoading] = useState(false);
  const location = useLocation();
  const [join, setJoin] = useState({
    category: "",
    content: "",
    endDate: "",
    participants: "",
    region: "",
    startDate: "",
    title: "",
  });
  const [file, setFile] = useState(null);
  const formatDateTime = (date) => {
    if (!date) return null;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };
  const onSubmit = async () => {
    if (
      !join.title.trim() ||
      !join.content.trim() ||
      !join.category.trim() ||
      !join.region.trim() ||
      join.participants == null ||
      join.participants <= 0 ||
      !join.startDate ||
      !join.endDate
    ) {
      customAlert.error("필수 내용을 전부 입력해주세요");
      return;
    }
    isLoading(true);
    const fd = new FormData();
    fd.append("category", join.category);
    fd.append("participants", join.participants);
    fd.append("region", join.region);
    fd.append("startDate", join.startDate);
    fd.append("endDate", join.endDate);
    fd.append("title", join.title);
    fd.append("content", join.content);
    if (file) fd.append("file", file);

    try {
      if (isEdit) {
        await api.patch(`/joins/${joinNo}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        navi(`/joins/${joinNo}`);
      } else {
        await api.post("/joins", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (join.category === "PLOG") {
          customAlert.success("게시글 작성 성공");
          navi("/joins/plogging");
        } else {
          customAlert.success("게시글 작성 성공");
          navi("/joins/plant");
        }
      }
    } catch (err) {
      navi("/");
    } finally {
      isLoading(false);
    }
  };
  const cancle = () => {
    if (join.category === "PLOG") {
      navi("/joins/plogging");
    } else {
      navi("/joins/plant");
    }
  };
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    if (!isEdit && location.state?.category) {
      setJoin((prev) => ({
        ...prev,
        category: location.state.category,
      }));
    }
  }, [location.state, isEdit]);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/joins/${joinNo}`).then((result) => {
      const data = result.data.data;
      if (data) {
        setJoin({
          category: data.category,
          content: data.content,
          endDate: data.endDate,
          participants: data.participants,
          region: data.region,
          startDate: data.startDate,
          title: data.title,
        });
      }
    });
  }, [joinNo, isEdit]);

  return (
    <>
      <FormContainer>
        <FormHeader>
          <IconWrapper>
            <IoPencilSharp />
          </IconWrapper>
          참여 게시판 {isEdit ? "수정" : "작성"}
        </FormHeader>

        <InputGroup>
          <Label>
            제목<span>*</span>
          </Label>
          <Input
            placeholder="제목을 입력하세요"
            value={join.title}
            onChange={(e) => setJoin({ ...join, title: e.target.value })}
          />
        </InputGroup>

        <FormRow>
          <InputGroup style={{ gridColumn: "span 1" }}>
            <Label>
              카테고리<span>*</span>
            </Label>
            {isEdit ? (
              <Input
                value={join.category}
                readOnly
                style={{ backgroundColor: "#e7e7e7" }}
              />
            ) : (
              <Input
                as="select"
                value={join.category}
                onChange={(e) => {
                  setJoin({ ...join, category: e.target.value });
                }}
              >
                <option value="PLOG">플로깅</option>
                <option value="PLANT">식목</option>
              </Input>
            )}
          </InputGroup>
          <InputGroup style={{ gridColumn: "span 1" }}>
            <Label>
              참여 인원<span>*</span>
            </Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={join.participants}
              onChange={(e) =>
                setJoin({ ...join, participants: e.target.value })
              }
            />
          </InputGroup>
          <InputGroup style={{ gridColumn: "span 1" }}>
            <Label>
              장소<span>*</span>
            </Label>
            <Input
              value={join.region}
              onChange={(e) => setJoin({ ...join, region: e.target.value })}
            />
          </InputGroup>

          <InputGroup style={{ gridColumn: "span 1" }}>
            <Label>
              활동 시간<span>*</span>
            </Label>
            <TimeInputWrapper>
              <DatePicker
                selected={
                  join.startDate
                    ? new Date(join.startDate.replace(" ", "T"))
                    : null
                }
                onChange={(date) =>
                  setJoin({
                    ...join,
                    startDate: formatDateTime(date),
                  })
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="yyyy-MM-dd HH:mm"
              />
              <span style={{ fontWeight: "bold" }}>~</span>
              <DatePicker
                selected={
                  join.endDate ? new Date(join.endDate.replace(" ", "T")) : null
                }
                onChange={(date) =>
                  setJoin({
                    ...join,
                    endDate: formatDateTime(date),
                  })
                }
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={5}
                dateFormat="yyyy-MM-dd HH:mm"
              />
            </TimeInputWrapper>
          </InputGroup>
        </FormRow>

        <InputGroup>
          <Label>
            내용<span>*</span>
          </Label>
          <TextArea
            placeholder="활동 내용을 상세히 입력하세요"
            value={join.content}
            onChange={(e) => setJoin({ ...join, content: e.target.value })}
          />
        </InputGroup>

        <FileUploadContainer>
          <label
            style={{
              fontWeight: "600",
              marginBottom: "8px",
              display: "block",
            }}
          >
            첨부파일
          </label>

          <FileInput id="file-upload" type="file" onChange={handleFileChange} />

          {preview ? (
            <PreviewBox
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              <img src={preview} alt="preview" />
            </PreviewBox>
          ) : (
            <FileLabel htmlFor="file-upload">
              <IoCloudUploadOutline size={40} />
              <UploadText>이미지 or 파일 첨부</UploadText>
            </FileLabel>
          )}
        </FileUploadContainer>

        <FormButtonGroup>
          <Button type="button" $primary onClick={onSubmit}>
            제출
          </Button>
          <Button type="button" onClick={cancle}>
            취소
          </Button>
        </FormButtonGroup>
      </FormContainer>
      ;
    </>
  );
};

export default JoinForm;
