import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { db } from "../../firebase/firebase";
import Typography from "@material-ui/core/Typography";
import { useAuth } from "../../providers/UserProvider";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function  MediaCard(prop) {
  const info = prop.prop;
  const { currentUser, userEmail } = useAuth();
   const [banner, setBanner] =  useState("");
  const [compName, setCompName] =  useState("");
  const classes = useStyles();
  // const [enrolledComp, setEnrolledComp] = useState()
  // const { currentUser, userEmail, logout } = useAuth();
  // if (userEmail !== null) {
  //   const usersRef = db.collection("users").doc(userEmail);
  //   usersRef.get().then((doc) => {
  //     if (doc.exists) {
  //         const enrolled = doc.data().enrolledIn
  //       setEnrolledComp(enrolled[enrolled.length -1].compName);
  //     }
  //   });

  // }

  useEffect(() => {
  
   if(info){
    const pullComps = async (result) => {
      console.log("result from pullComps is: " +result)
      const compRef = await db.collection("Competitions").doc(result);
      await compRef.get().then( async (doc) => {
       if(doc.exists){
        setCompName(doc.data().compName);
        setBanner(doc.data().banner)

       } else {
         console.log("non such comp")
       }
       
      });
  
    };
    const createCard = async () => {
      if (!info) {
      console.log("No info")
      } else {
        await info.then(async (result) => {
          console.log("logging result")
      
          await pullComps(result)
          
          
         
       
        });
      }
    };
     createCard();
   }
   
   

    // else {
    //   setCompName("Create a Competition")
    //   setBanner("https://t4.ftcdn.net/jpg/03/60/70/11/360_F_360701167_9dolp6h5cfm5i9uC8QObRzhog1mc1gI0.jpg")
    // }

    
  }, [info]);

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={banner}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {compName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Days Remaining: 6
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions></CardActions>
      </Card>
    </div>
  );
}
