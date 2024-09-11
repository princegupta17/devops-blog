import Navbar from "./Navbar";
import Footer from "./Footer";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Post() {
  const { id } = useParams();
  const [data, setdata] = useState({});
  const [content, setcontent] = useState("");
  const [comment_array, setcomment_array] = useState([]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/v1/comments/${id}`, { content })
      .then((res) => {
        console.log(res);
        setcontent("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function getpost() {
      try {
        const [response, commentResponse] = await Promise.all([
          axios.get(`/api/v1/posts/${id}`),
          axios.get(`/api/v1/comments/${id}`),
        ]);
        setdata(response.data.data);
        setcomment_array(commentResponse.data.data);
        console.log(commentResponse.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getpost();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="m-8 bg-white">
        <img
          src={data.image}
          alt="Post"
          className="pb-3 w-96 h-48 object-cover rounded-md"
        />
        <p className="pb-2 text-2xl font-bold text-[#183B56]">{data.title}</p>
        <p className="pb-4 font-normal text-base  text-[#183B56]">
          {data.content}
        </p>
        <form
          className="flex flex-col w-44 h-12 gap-4 mb-12"
          onSubmit={handlesubmit}
        >
          <input
            type="text"
            placeholder="Comment"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="pb-6 bg-slate-300"
          />
          <button className="bg-sky-800 rounded-lg w-20 h-10" type="submit">
            Submit
          </button>
        </form>
        <p className="pb-3 font-normal text-base  text-[#183B56]">Comments</p>
        {comment_array &&
          comment_array.map((comment) => (
            <Comment
              key={comment._id}
              content={comment.content}
              name={comment.user.name}
            />
          ))}
      </div>
      <Footer />
    </>
  );
}

export default Post;
