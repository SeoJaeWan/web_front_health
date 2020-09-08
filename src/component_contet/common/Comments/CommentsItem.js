import React, { useState } from "react";
import ActionButton from "../Modal/ActionButton";

const CommentsItem = ({
  comment,
  commentValue,
  nextcomment,
  changeComment,
  onWrite,
  user,
  onDeleteComment,
  onUpdate,
  onReport,
}) => {
  const [edit, setEdit] = useState(false);
  const {
    BC_Content,
    BC_Writer_NickName,
    BC_Re_Ref,
    BC_Code,
    BC_Report_Count,
    BC_State,
  } = comment;

  const ChangeEdit = (code, data) => {
    onUpdate(edit, code, data);
    setEdit(!edit);
  };
  return (
    <>
      {edit ? (
        <div className="comment">
          <h5>
            댓글
            <br />
            수정
          </h5>
          <input
            className="commentInput"
            type="text"
            name={BC_Code}
            value={commentValue[BC_Code] ? commentValue[BC_Code] : ""}
            onChange={changeComment}
          />
          <ActionButton
            onDelete={onDeleteComment}
            onChange={() => ChangeEdit(BC_Code, BC_Content)}
          />
        </div>
      ) : (
        <>
          {BC_State === 0 ? (
            <div className="reply">
              {BC_Re_Ref !== BC_Code ? (
                <>
                  <div className="content">
                    <h5 className="separateREF">ㄴ</h5>
                    <h5 className="REFContent">{BC_Content}</h5>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="content">{BC_Content}</h5>
                </>
              )}
              <table>
                <thead>
                  <tr>
                    <th className="separationline">작성자</th>
                    <th>
                      <button
                        type="submit"
                        className="reportButton"
                        onClick={() =>
                          user !== (comment && BC_Writer_NickName) && onReport(BC_Code)
                        }
                      >
                        신고
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="separationline">{BC_Writer_NickName}</td>
                    <td>{BC_Report_Count}</td>
                  </tr>
                </tbody>
                {user === (comment && BC_Writer_NickName) && (
                  <tfoot>
                    <tr>
                      <td className="editButton" colSpan="2">
                        <ActionButton
                          onDelete={() => onDeleteComment(BC_Code)}
                          onChange={() => ChangeEdit(BC_Code, BC_Content)}
                        />
                      </td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          ) : (
            <div className="blind">
              {BC_State === 1 ? "블라인드된 댓글입니다. " : "삭제된 댓글입니다."}
            </div>
          )}
          {nextcomment !== BC_Re_Ref && (
            <div className="comment">
              <h5>댓글</h5>
              <input
                className="commentInput"
                type="text"
                name={BC_Code}
                value={commentValue[BC_Code] ? commentValue[BC_Code] : ""}
                onChange={changeComment}
              />
              <button className="writeButton" onClick={() => onWrite(BC_Re_Ref, BC_Code)}>
                답글
              </button>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CommentsItem
