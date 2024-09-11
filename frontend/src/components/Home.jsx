import Allpost from "./Allpost";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../Slice/userSlice";
import { useEffect, useState } from "react";
import { getallPost } from "../Slice/postSlice";

function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [post_data, setpostdata] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get("/api/v1/users/userProfile");

        dispatch(getUser(userResponse.data.data));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    async function fetchData() {
      try {
        const postResponse = await axios.get("/api/v1/posts/all");
        dispatch(getallPost(postResponse.data.data));
        setpostdata(postResponse.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="m-16 grid gap-5 grid-cols-4">
          {post_data.map((post) => (
            <Allpost key={post._id} postId={post._id} />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
}

export default Home;
