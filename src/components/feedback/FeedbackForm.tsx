import { useState } from "react";

import { MAX_CHARACTERS } from "../../lib/constants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState("");

  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const charCount = MAX_CHARACTERS - text.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // basic validation
    if (text.includes("#") && text.length > 5) {
      setShowValidIndicator(true);
    } else {
      setShowInvalidIndicator(true);
    }

    onAddToList(text);
    setText("");
  };

  return (
    <form
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInvalidIndicator ? "form--invalid" : ""
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder="blabla"
        spellCheck={false}
      />
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p className="u-italic">{charCount}</p>

        <button type="submit">
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
