import { Textarea, IconButton } from "@material-tailwind/react";
import { useState, useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { postComment } from "../../../axios/comments.axios";

export function CommentInput({ patient_id, setComments, comments }) {
  const [commentInput, setCommentInput] = useState("");
  const { guardianLoggedIn, carerLoggedIn } = useContext(UserContext);
  const [author] = useState(() => {
    if (guardianLoggedIn) {
      return guardianLoggedIn._id;
    } else {
      return carerLoggedIn._id;
    }
  });
  const [authorType] = useState(() => {
    if (guardianLoggedIn) {
      return "Guardian";
    } else {
      return "Carer";
    }
  });

  function handlePostComment() {
    if (commentInput !== "") {
      postComment(commentInput, patient_id, author, authorType).then(
        (comment) => {
          console.log("success", comment);
          setCommentInput("");
          setComments([...comments, comment]);
        }
      );
    }
  }

  return (
    <div className="flex w-full flex-row items-center gap-2 rounded-lg border border-gray-900/10 bg-white p-2 mt-5">
      <Textarea
        required
        rows={1}
        resize={true}
        placeholder="Your Message"
        className="min-h-full !border-0 focus:border-transparent !text-base"
        size="md"
        containerProps={{
          className: "grid h-full",
        }}
        value={commentInput}
        onChange={(event) => {
          setCommentInput(event.target.value);
        }}
        labelProps={{
          className: "before:content-none after:content-none",
        }}
      />
      <div>
        <IconButton
          onClick={handlePostComment}
          variant="text"
          className="rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
