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
  const [memberData, setMemberData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const compRef = db.collection("Competitions").doc(comp);

  function dateFormat() {
    const today = new Date();
    var monthOption = { month: "short" };
    var dayOption = { day: "numeric" };
    var yearOption = { year: "numeric" };

    const month = today.toLocaleDateString("default", monthOption);
    const day = today.toLocaleDateString("default", dayOption);
    const year = today.toLocaleDateString("default", yearOption);

    const theDate = month + day + year;

    return theDate;
  }

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
          .doc("dailyStats");

        userRef.get().then(async (doc) => {
          if (doc.exists) {
            console.log("Logging the suer ref");
            const arse = doc.data();
            const formattedDate = dateFormat();
  
            const { steps, calories } = arse;
          
            const caloriesArray = [];
            for (const date in calories) {
              caloriesArray.push({ [date]: calories[date] });
            }
            
            const calorieDateFilter = caloriesArray.filter(
              (entry) => Object.keys(entry)[0] === formattedDate
            );
            const stepsArray = []

            for (const date in steps) {
                stepsArray.push({ [date]: steps[date] })
            }
            const stepDateFilter = stepsArray.filter((entry) => Object.keys(entry)[0] === formattedDate);
            
            const todaysCalories  = calorieDateFilter[0] ? Object.values(calorieDateFilter[0])[0] : 0;

            
            const todaysSteps = stepDateFilter[0] ? Object.values(stepDateFilter[0])[0] : 0 ;
          

            setMemberData((prevData) => {
              if (!prevData) {
                setRefreshing(true);
              } else {
                console.log(prevData);

                return [
                  ...prevData,
                  {
                    steps: (todaysCalories ? todaysCalories : 0),
                    calories: (todaysSteps ? todaysSteps : 0),
                    name: member,
                  },
                ];
              }
            });
          }
        });
        // console.log(memberData);
        // console.log("ending loop");
      });
    }
  };
  useEffect(() => {
    setMemberData([]);
    getMembers();
  }, [refreshing]);

  return (
    <div>
      <h1>{comp}</h1>
      <button onClick={dateFormat}>Test</button>
      <h4>Enrolled:</h4>
      {memberData ? (
        memberData.map((data) => {
          return (
            <div>
              <h3>{data.name}</h3>
              <h4 style={{ marginLeft: "30px" }}> Steps: {data.steps}</h4>
              <h4 style={{ marginLeft: "30px" }}> Calories: {data.calories}</h4>
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
