import React, { useEffect, useState } from "react";

import { CommentInput } from "../GuardianView/CommentInput";
import { useSelector, useDispatch } from "react-redux";
import {
  selectComments,
  selectCommentsError,
  selectCommentsLoading,
} from "../../../state/slices/commentsSlice";
import { selectPatient } from "../../../state/slices/patientSlice";

export default function PatientComments() {
  const patient = useSelector(selectPatient);

  const comments = useSelector(selectComments);
  const isLoading = useSelector(selectCommentsLoading);
  const error = useSelector(selectCommentsError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!comments) {
      dispatch(fetchComments(patient._id));
    }
  }, [dispatch, patient._id, comments]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="text-base bg-teal-100 p-3 rounded-lg shadow-xl w-full max-w-96">
      <div className="max-h-56 overflow-scroll">
        {comments.length > 0
          ? comments.map((comment) => (
              <div
                key={comment._id}
                className={
                  comment.authorType === "Guardian"
                    ? " chat chat-start"
                    : "chat chat-end"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={comment.author.user.profileImageURL}
                    />
                  </div>
                </div>
                <div className="chat-bubble text-white">{comment.text}</div>
              </div>
            ))
          : "There isn't any notes yet for this day"}
      </div>
      <CommentInput />
    </div>
  );
}
