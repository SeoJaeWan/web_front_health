import React from "react"
import { Container } from "../../style/Container_style"
import { InfCom } from "./style/MyPageEditCom_style"
import defaultImg from "../../../Images/defaultImg.jpg"
import ToggleButton from "../../common/ToggleButton"
import ReactHelmet from "../../../containers/common/ReactHelmet"
import Sketch from "react-p5"

const MyPageEditCom = ({
  mypage,
  onChange,
  onComplete,
  onGoBack,
  setup,
  imgSize,
  preview,
  setPreview,
  getImagePreview,
  onChangeModal,
  cropper,
}) => {
  return (
    <>
      <ReactHelmet title={`MyPage Edit`} />
      <Container>
        <InfCom width={imgSize.width} height={imgSize.height}>
          <div className="editButton">
            <button onClick={onGoBack} className="editButton">
              취소
            </button>
            <button onClick={onComplete} type="submit" className="editButton">
              완료
            </button>
          </div>
          <div className="flex">
            <div className="leftDiv">
              <h1>프로필 사진</h1>
              <div name="Wim Mostmans" className="imgBox">
                {preview ? (
                  <img alt="" style={{ maxWidth: "100%" }} src={preview} />
                ) : (
                  <img
                    className="imgDiv"
                    src={mypage.img ? mypage.img : defaultImg}
                    alt="profile"
                    width={imgSize.width}
                    height={imgSize.height}
                  />
                )}
              </div>
              <label className="inputIMG" htmlFor="file">
                이미지 업로드
              </label>
              <input
                className="hidden"
                type="file"
                name="originalProfile"
                id="file"
                onClick={onChangeModal}
                // onChange={onChange}
              />
            </div>
            <ul className="rightDiv">
              <li>
                <label htmlFor="nickname">닉네임</label>
                <input
                  readOnly
                  type="text"
                  name="Account_AC_NickName"
                  id="nickname"
                  className="contents"
                  defaultValue={mypage.Account_AC_NickName}
                />
              </li>

              <li>
                <label htmlFor="ME_Scope">공개여부</label>

                <div className="toggleDiv">
                  On
                  <ToggleButton
                    name="ME_Scope"
                    type="checkbox"
                    value={mypage.ME_Scope}
                    onClick={onChange}
                  />
                  OFF
                </div>
              </li>
              <li>
                <label htmlFor="Weight">무게</label>
                <input
                  type="text"
                  name="ME_Weight"
                  id="Weight"
                  className="contents"
                  value={mypage.ME_Weight}
                  onChange={onChange}
                />
              </li>
              <li>
                <label htmlFor="Height">키</label>
                <input
                  type="text"
                  name="ME_Height"
                  id="Height"
                  className="contents"
                  value={mypage.ME_Height}
                  onChange={onChange}
                />
              </li>
              <li>
                <label htmlFor="Birth">생일</label>
                <input
                  type="date"
                  name="ME_Birth"
                  id="Birth"
                  className="contents"
                  value={mypage.ME_Birth}
                  onChange={onChange}
                />
              </li>
              <li>
                <label htmlFor="ME_Gender">성별</label>
                <div className="toggleDiv">
                  남
                  <ToggleButton
                    name="ME_Gender"
                    type="checkbox"
                    value={mypage.ME_Gender}
                    onClick={onChange}
                  />
                  여
                </div>
              </li>
            </ul>
          </div>
        </InfCom>
      </Container>
      <Sketch setup={setup} />
    </>
  )
}

export default MyPageEditCom
