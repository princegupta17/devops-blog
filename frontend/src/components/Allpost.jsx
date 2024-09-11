import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function Allpost({ postId }) {
  const data = useSelector((state) =>
    state.post.posts.find((post) => post._id == postId)
  );
  return (
    <>
      <div className="h-96 w-72 bg-slate-100 rounded-md">
        {/* image div */}
        <div className="h-1/2">
          <img
            src={data.image}
            alt="try image"
            className="h-full w-full object-cover rounded-t-md"
          />
        </div>

        {/* description div */}
        <div className="h-1/2 p-5 flex flex-col">
          {/* title */}
          <div className="mb-2">
            <a href={`/post/${data._id}`}>
              <p className="text-2xl font-bold text-[#183B56]">{data.title}</p>
            </a>
          </div>

          {/* description */}
          <div className="mb-4">
            <p className="font-normal text-base  text-[#183B56]">
              {data.content.substr(0, 50)}
            </p>
          </div>

          {/* user */}
          <div className="space-x-16">
            <span className="italic font-bold text-sm text-[#183B56]">
              {data.user.name}
            </span>
            <span className="text-[#5A7184] font-normal italic text-sm">
              {data.createdAt.substr(0, 10)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

Allpost.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default Allpost;
