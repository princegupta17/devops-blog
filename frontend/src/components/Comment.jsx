import PropTypes from "prop-types";

function Comment({ content, name }) {
  return (
    <>
      <div className="bg-gray-400 w-96 mb-7">
        <p className="italic font-bold text-sm text-[#183B56]">{name}</p>
        <p className="text-[#5A7184] font-normal italic text-sm">{content}</p>
      </div>
    </>
  );
}

Comment.propTypes = {
  content: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Comment;
