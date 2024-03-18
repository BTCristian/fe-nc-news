import { Link } from "react-router-dom";

export default function TopicList({ topic }) {
  let topicName = topic.slug;
  return (
    <Link className="topicLink" to={`/articles?topic=${topic.slug}`}>
      {topicName}
    </Link>
  );
}
