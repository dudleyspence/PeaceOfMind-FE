import React, { useEffect, useState } from "react";
import { getPatientComments } from "../../../axios/comments.axios";
import { CommentInput } from "./CommentInput";

export default function PatientComments({ patient_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getPatientComments(patient_id).then((comments) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, []);

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
