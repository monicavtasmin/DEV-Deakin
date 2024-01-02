import { useState } from "react";
import { app, db, storage } from "../firebaseconfig";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useLocation } from "react-router-dom";

function Article() {
  const collectionRef = collection(db, "articles");

  const [inputData, setInputData] = useState({});
  const [loading, setLoading] = useState(false);

  const [articles, setArticles] = useState({});

  const [file, setFile] = useState();

  const location = useLocation();

  //Retrieve Datas
  useEffect(() => {
    let dataArray = [];
    onSnapshot(collectionRef, (snapshot) => {
      snapshot.docs.map((x) => dataArray.push({ ...x.data(), id: x.id }));
      setArticles(dataArray);
      dataArray = [];
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

  // Delete Handler Function
  const deleteHandler = async (id) => {
    try {
      const docRef = doc(db, "articles", id);
      await deleteDoc(docRef);
      toast("Data Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Submit Handler Function
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      inputData.title &&
      inputData.abstract &&
      inputData.article &&
      inputData.tags &&
      file
    ) {
      try {
        let imageLink;
        //Upload Image to Storage
        const storageRef = ref(storage, `/articles/${file.name + v4()}`);
        await uploadBytes(storageRef, file).then((snapshot) =>
          getDownloadURL(snapshot.ref).then(
            (url) =>
              // setInputData((prevState) => {
              //   return {
              //     ...prevState,
              //     image: url,
              //   };
              // })
              (imageLink = url)
          )
        );
        const response = await addDoc(collectionRef, {
          title: inputData.title,
          abstract: inputData.abstract,
          article: inputData.article,
          tags: inputData.tags,
          image: imageLink,
        });
        console.log(imageLink);
        toast("Data Added");
        console.log(response);
        setInputData({});
      } catch (error) {
        console.log(error);
        toast("Please Input Valid Data");
      }
    } else {
      toast("Empty value");
    }
    setLoading(false);
  };

  //File Handler
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
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
                placeholder="Input article title"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Abstract</label>
              <textarea
                value={inputData.description}
                onChange={(e) => inputHandler(e)}
                id="abstract"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Enter a 1-paragraph abstract"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Article Text</label>
              <textarea
                value={inputData.article}
                onChange={(e) => inputHandler(e)}
                id="article"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Enter article text"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Tags</label>
              <input
                value={inputData.tags}
                onChange={(e) => inputHandler(e)}
                id="tags"
                className="p-3 rounded-md border outline-none border-none"
                placeholder="Enter article text"
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label className="font-medium">Upload Image</label>
              <input
                onChange={(e) => fileHandler(e)}
                id="image"
                type="file"
                className="p-3 rounded-md border outline-none border-none"
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

      <div className="flex flex-col space-y-5">
        {articles.length > 0 &&
          articles.map((x) => {
            return (
              <div
                key={x.id}
                className="p-5 rounded-md border drop-shadow-lg flex flex-col space-y-5"
              >
                <div className="flex flex-col space-y-5">
                  <div className="font-medium text-[1.5rem]">Title</div>
                  <div>{x.title}</div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="font-medium text-[1.5rem]">Abstract</div>
                  <div>{x.abstract}</div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="font-medium text-[1.5rem]">Article Text</div>
                  <div>{x.article}</div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="font-medium text-[1.5rem]">Tags</div>
                  <div>{x.tags}</div>
                </div>
                <div className="flex flex-col space-y-5">
                  <div className="font-medium text-[1.5rem]">Image Preview</div>
                  <div>
                    <img className="w-full" src={x.image} alt="" />
                  </div>
                </div>

                {location.pathname === "/post" && (
                  <button
                    onClick={() => deleteHandler(x.id)}
                    className="bg-primary text-white rounded-md px-12 py-2 rounded-md"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Article;
