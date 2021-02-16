import React, { useEffect, useState, useReducer } from "react";
import { db, firebase } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../providers/UserProvider";
import { Link, useParams } from "react-router-dom";
import { CallToActionSharp } from "@material-ui/icons";
import { setRef } from "@material-ui/core";

const reducer = (state, action) => {
  switch (action.type) {
    case "members": {
      console.log("Logging from members case");
      console.log(state.members);
      return {
        ...state,
        members: [...state.members, action.members],
      };
    }
    case "update_calorie": {
      return {
        ...state,
        calories: action.calories,
      };
    }
    case "update_steps": {
      return { steps: state.steps };
    }
    default:
      break;
  }
  return state;
};

const CompDetails = (props) => {
  var mydate = require("current-date");
  const todaysDate = mydate("date");

  const { currentUser, userEmail, refresh, refreshState } = useAuth();
  const { comp } = useParams();
  const [enrolledMembers, setEnrolledMembers] = useState();
  const [memberData, setMemberData] = useState(["none"]);
  const [refreshing, setRefreshing] = useState(false);

  const compRef = db.collection("Competitions").doc(comp);

  const getMembers = async () => {
    await compRef.get().then(async (doc) => {
      if (doc.exists) {
        setEnrolledMembers(await doc.data().members);
        if (!enrolledMembers) {
          setRefreshing(true);
          return;
        } else {
          getStatus();
        }
      } else {
        setEnrolledMembers(["None"]);
      }
    });
  };

  const getStatus = async () => {
    console.log("get status begnning line");
    await compRef.get().then(async (doc) => {
      if (doc.exists) {
        setEnrolledMembers(doc.data().members);
      } else {
        setEnrolledMembers(["None"]);
      }
    });
    if (!enrolledMembers) {
      setRefreshing(true);
      console.log("there were no members so we are refreshing");
    } else {
      enrolledMembers.forEach(async (member) => {
        console.log(enrolledMembers.length);
        console.log("beginning loop");
        console.log(enrolledMembers);
        const userRef = db
          .collection("users")
          .doc(member)
          .collection("stats")
          .doc("testStat");

        userRef.get().then(async (doc) => {
          if (doc.exists) {
            if (memberData[0]==="none"){
              setMemberData([])
            }
            setMemberData((prevData) => {
              console.log(prevData);
             
              return [
                ...prevData,
                {
                  steps: doc.data().steps,
                  calories: doc.data().calories,
                  name: member,
                },
              ];
            });
          }
        });
        console.log(memberData);
        console.log("ending loop");
      });
    }
  };
  useEffect(() => {
    getMembers();
  }, [refreshing]);

  return (
    <div>
      <h1>{comp}</h1>
      <button>Test</button>
      <h4>Enrolled:</h4>

      {memberData ? (
        memberData.map((data) => {
          return (
            <div>
              <h3>{data.name}</h3>
              <h4 style={{marginLeft: "30px"}}>      Steps: {data.steps}</h4>
              <h4 style={{marginLeft: "30px"}}>    Calories: {data.calories}</h4>
            </div>
          );
        })
      ) : (
        <h1>"none"</h1>
      )}
    </div>
  );
};

export default CompDetails;
// {state.members.map((members) => {
//   return (
//     <div>
//       <h1>{members.name}</h1>
//     </div>
//   );
// })}
