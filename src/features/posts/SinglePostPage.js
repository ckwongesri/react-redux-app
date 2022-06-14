import { useGetPostQuery } from "@features/api/apiSlice";
import { Link } from "react-router-dom";
import { Spinner } from "../../components/Spinner";
import { PostAuthor } from "../users/PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";

function SinglePostPage({ match }) {
  const { postId } = match.params;

  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId);

  let content;

  if (isFetching) {
    content = <Spinner text="Loading..." />;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <div>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
        </div>
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit Post
        </Link>
        <ReactionButtons post={post} />
      </article>
    );
  }

  return <section>{content}</section>;
}

export { SinglePostPage };
