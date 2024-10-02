import React, { useEffect, useState } from "react";

import { CommentInput } from "./CommentInput";
import { useSelector } from "react-redux";

export default function PatientComments() {
  const { patient } = useSelector((state) => state.patient);
  const { comments, isLoading, error } = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!comments) {
      dispatch(fetchComments(patient._id));
    }
  }, [dispatch, patient._id, comments]);

  return isLoading ? (
    "Loading"
  ) : (
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
      <CommentInput
        patient_id={patient_id}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}
