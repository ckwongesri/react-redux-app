import { selectAllUsers } from "@features/users/usersSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "../api/apiSlice";

function AddPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addNewPost, { isLoading }] = useAddNewPostMutation();

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const users = useSelector(selectAllUsers);

  function onTitleChanged(event) {
    setTitle(event.target.value);
  }

  function onContentChanged(event) {
    setContent(event.target.value);
  }

  function onAuthorChanged(event) {
    setUserId(event.target.value);
  }

  async function onSavePostClicked() {
    if (canSave) {
      try {
        await addNewPost({ title, content, user: userId }).unwrap();
        setTitle("");
        setContent("");
        setUserId("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
}

export { AddPostForm };
