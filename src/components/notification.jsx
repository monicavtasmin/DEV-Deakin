import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db, app } from "../firebaseconfig";
function Notification() {
  const auth = getAuth();
  const [notificationList, setNotificationList] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const notificationRef = doc(db, "notifications", user.uid);
        onSnapshot(notificationRef, (snapshot) => {
          setNotificationList(snapshot.data().notificationList);
        });
      } else return;
    });
  }, []);

  return (
    <>
      {notificationList?.map((x) => {
        return (
          <div className="flex mt-3">
            <div>
              <svg
                className="h-[2rem] w-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                  <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                </g>
              </svg>
            </div>
            <div className="ml-2">{x}</div>
          </div>
        );
      })}
    </>
  );
}

export default Notification;
