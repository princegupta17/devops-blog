import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create_post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    await axios
      .post(
        "/api/v1/posts/create",
        {
          title,
          content,
          image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                className="w-full p-3 border rounded"
                placeholder="Description"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Image</label>
              <input
                type="file"
                className="w-full p-3 border rounded"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Image Preview"
                  className="mt-4 w-32 h-32 rounded mx-auto"
                />
              )}
            </div>
            <button
              className="w-full p-3 bg-blue-500 text-white rounded"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create_post;
