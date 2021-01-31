import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { db, firebase } from "../../firebase/firebase";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(prop) {
    var info = prop.prop;
  
console.log("logging the prop");
console.log(info)
const [banner, setBanner] = useState("");
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

  

  useEffect((prop)=>{
    const loggData = async () => {
      await console.log("Prop from useEffect in compCard")
      await console.log(prop)
      await console.log("End Logging prop")
    }
    loggData();
 
    if (info) {
      const compRef = db.collection("Competitions").doc(info);
      compRef.get().then((doc)=>{
        if(doc.data()) {
          setBanner(doc.data().banner)
        } else {
         
          setBanner("https://www.thoughtco.com/thmb/hHBJvtStNc0h39CaXiYxe0J5RXo=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/statueofzeus-58b9e03e3df78c353c4d9e95-5b60869746e0fb002cee3eb1.jpg")
        }
      })
    } else {
      
      setBanner("https://www.thoughtco.com/thmb/hHBJvtStNc0h39CaXiYxe0J5RXo=/768x0/filters:no_upscale():max_bytes(150000):strip_icc()/statueofzeus-58b9e03e3df78c353c4d9e95-5b60869746e0fb002cee3eb1.jpg")
    }
   

  },[])

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
         {info}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Days Remaining: 6
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
      </CardActions>
    </Card>
    </div>
  );
}
