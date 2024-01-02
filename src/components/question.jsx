import React, { useEffect } from "react";
import { app, db } from "../firebaseconfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
  arrayUnion,
  setDoc,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ReactMarkdown from "react-markdown";

function Question() {
  const location = useLocation();
  const auth = getAuth();

  const [inputData, setInputData] = useState({
    title: "",
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);

  //Main Data & Filtered Data
  const [questions, setQuestions] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [dropdownActive, setDropdownActive] = useState({});

  // Collection Reference
  const collectionRef = collection(db, "questions");

  // Input Comment
  const [comment, setComment] = useState();

  // Delete Handler Function
  const deleteHandler = async (id) => {
    try {
      const docRef = doc(db, "questions", id);
      await deleteDoc(docRef);
      toast("Data Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  //Fetch Firestore Data
  useEffect(() => {
    let dataArray = [];
    onSnapshot(collectionRef, (snapshot) => {
      snapshot.docs.map((x) => dataArray.push({ ...x.data(), id: x.id }));
      setQuestions(dataArray);
      setFilteredData(dataArray);
      dataArray = [];
      console.log("triggered");
    });
  }, []);

  // Input Handler Function
  const inputHandler = (e) => {
    setInputData((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  // Submit Handler Function
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      inputData.title &&
      inputData.description &&
      inputData.tags &&
      auth.currentUser.email &&
      auth.currentUser.uid
    ) {
      try {
        await addDoc(collectionRef, {
          title: inputData.title,
          description: inputData.description,
          tags: inputData.tags,
          createdAt: Timestamp.now().toDate(),
          postedBy: auth.currentUser.email,
          userId: auth.currentUser.uid,
        });
        toast("Data Added");
        setInputData({
          title: "",
          description: "",
          tags: "",
        });
        setInputData({});
      } catch (error) {
        toast("Please Input Valid Data");
      }
    } else {
      toast("Empty value");
    }
    setLoading(false);
  };

  // Search Handler Function
  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    setFilteredData(
      questions.filter(
        (x) =>
          x.title.toLowerCase().includes(value) ||
          x.description.toLowerCase().includes(value) ||
          x.tags.toLowerCase().includes(value)
      )
    );
  };

  // Date Handler Function
  const dateHandler = (e) => {
    setFilteredData(
      questions.filter(
        (x) =>
          new Date(x.createdAt.toDate()).toDateString() ===
          new Date(e.target.value).toDateString()
      )
    );
  };

  //Dropdown active handler
  const dropdownHandler = (id) => {
    setDropdownActive((prevState) => {
      return {
        ...prevState,
        [id]: !prevState[id],
      };
    });
  };

  //Comment Handler
  const commentInputHandler = (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = async (questionId, userId) => {
    try {
      if (comment) {
        let newComment = {
          comment: comment,
          user: auth.currentUser.email,
        };
        await updateDoc(doc(db, "questions", questionId), {
          comments: arrayUnion(newComment),
        });
        const docRef = doc(db, "notifications", userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(doc(db, "notifications", userId), {
            notificationList: arrayUnion(
              `${auth.currentUser.email} commented on your post`
            ),
          });
        } else {
          await setDoc(doc(db, "notifications", userId), {
            notificationList: arrayUnion(
              `${auth.currentUser.email} commented on your post`
            ),
          });
        }
        toast("Comment Submitted");
        setComment("");
      } else {
        toast("Input comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Like Handler
  const likeHandler = async (questionId, likes, userId) => {
    if (likes?.includes(auth.currentUser.uid)) {
      await updateDoc(doc(db, "questions", questionId), {
        likes: arrayRemove(auth.currentUser.uid),
      });
      await updateDoc(doc(db, "notifications", userId), {
        notificationList: arrayRemove(
          `${auth.currentUser.email} liked your post`
        ),
      });
    } else {
      await updateDoc(doc(db, "questions", questionId), {
        likes: arrayUnion(auth.currentUser.uid),
      });
      const docRef = doc(db, "notifications", userId);
      const docSnap = await getDoc(docRef);
      console.log(docSnap.exists());
      if (docSnap.exists()) {
        await updateDoc(doc(db, "notifications", userId), {
          notificationList: arrayUnion(
            `${auth.currentUser.email} liked your post`
          ),
        });
      } else {
        await setDoc(doc(db, "notifications", userId), {
          notificationList: arrayUnion(
            `${auth.currentUser.email} liked your post`
          ),
        });
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={500}
        progressStyle={{ background: "#D61C4E" }}
      />
      {location.pathname === "/post" && (
        <div className="border p-5 rounded-md flex flex-col space-y-5 drop-shadow-md">
          <div className="text-[1.5rem] font-semibold">
            What do you want to ask or share
          </div>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col space-y-5"
          >
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Title</label>
              <input
                value={inputData.title}
                onChange={(e) => inputHandler(e)}
                id="title"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Start your question with how, what, why,etc"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Describe your problem</label>
              <textarea
                value={inputData.description}
                onChange={(e) => inputHandler(e)}
                id="description"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Start your question with how, what, why,etc"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Tags</label>
              <input
                value={inputData.tags}
                onChange={(e) => inputHandler(e)}
                id="tags"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Please add up to 3 tags to describe what your question is about e.g.., Java"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-fit p-2 px-12 bg-primary rounded-md text-white text-[1.15rem]"
              >
                {loading ? "Loading ..." : "Post"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Function  */}
      <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-3 mt-5">
        <input
          onChange={(e) => searchHandler(e)}
          className="p-3 border w-full outline-none"
          placeholder="Search by title , description or tags"
        />
        <input
          onChange={(e) => dateHandler(e)}
          className="p-3 border w-full lg:w-[25%] outline-none"
          type="date"
        />
      </div>

      {location.pathname === "/post" && (
        <div className="flex flex-col space-y-5">
          {filteredData.length > 0 &&
            filteredData.map((x) => {
              return (
                <div
                  key={x.id}
                  className={`p-5 rounded-md border drop-shadow-lg flex flex-col space-y-5 ${
                    dropdownActive[x.id]
                      ? "max-h-[100rem]"
                      : "max-h-[8rem] overflow-hidden"
                  } transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-5">
                      <div className="font-medium text-[1.5rem]">Title</div>
                      <div>{x.title}</div>
                    </div>
                    <div className="cursor-pointer rounded-full flex items-center justify-center bg-primary text-white p-3">
                      <svg
                        onClick={() => dropdownHandler(x.id)}
                        className={`${
                          dropdownActive[x.id] ? "hidden" : ""
                        } text-[1.5rem]`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M12 20v-8m0 0V4m0 8h8m-8 0H4"
                        />
                      </svg>
                      <svg
                        onClick={() => dropdownHandler(x.id)}
                        className={`${
                          dropdownActive[x.id] ? "" : "hidden"
                        } text-[1.5rem]`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="font-medium text-[1.5rem]">Description</div>
                    <div>{x.description}</div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="font-medium text-[1.5rem]">Tags</div>
                    <div>{x.tags}</div>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <div className="font-medium text-[1.5rem]">Created at</div>
                    <div>
                      {JSON.stringify(x.createdAt.toDate().toDateString())
                        .replace('"', "")
                        .replace('"', "")}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteHandler(x.id)}
                    className="bg-primary text-white rounded-md px-12 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {location.pathname !== "/post" && (
        <div className="flex flex-col space-y-5 mt-5">
          {filteredData.length > 0 &&
            filteredData.map((x) => {
              return (
                <div className="p-5 border">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-[1.25rem]">
                      Posted By : {x.postedBy}
                    </div>
                    {/* Liked  */}
                    <svg
                      onClick={() => likeHandler(x.id, x.likes, x.userId)}
                      className={`${
                        x.likes?.includes(auth.currentUser.uid)
                          ? "text-red-500"
                          : "text-black"
                      } transition-all text-[2rem] cursor-pointer`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 48 48"
                    >
                      <mask id="svgIDa">
                        <path
                          fill="#fff"
                          stroke="#fff"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="4"
                          d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8Z"
                        />
                      </mask>
                      <path
                        fill="currentColor"
                        d="M0 0h48v48H0z"
                        mask="url(#svgIDa)"
                      />
                    </svg>
                  </div>
                  <div className="text-[2rem]">
                    <ReactMarkdown>{x.title}</ReactMarkdown>
                  </div>
                  <div className="mt-5">
                    {" "}
                    <ReactMarkdown>{x.description}</ReactMarkdown>
                  </div>
                  <div className="px-5 py-2 mt-5 rounded-md bg-gray-100 w-fit">
                    # {x.tags}
                  </div>
                  <div className="mt-5 text-[1.5rem]">
                    {x.likes?.length} Likes
                  </div>
                  <div className="mt-5">
                    <div className="text-[1.5rem]">Comments</div>
                    <div className="mt-5 flex flex-col space-y-5">
                      {x.comments?.map((x) => {
                        return (
                          <div className="p-5 border rounded-md">
                            <div className="text-[1.25rem] font-medium">
                              <ReactMarkdown>{x.user}</ReactMarkdown>
                            </div>
                            <div>{x.comment}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* <div>{x.createdAt}</div> */}
                  <div className="border p-5 rounded-md mt-5">
                    <textarea
                      value={comment}
                      onChange={(e) => commentInputHandler(e)}
                      className="w-full outline-none h-[10rem] border p-2"
                      placeholder="Comment something..."
                    ></textarea>
                    <button
                      onClick={() => commentSubmitHandler(x.id, x.userId)}
                      className="p-3 bg-primary text-white mt-5 rounded-md"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Question;
