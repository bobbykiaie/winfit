import React, { useEffect, useState } from "react";
import { db, firebase } from "../../firebase/firebase";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../providers/UserProvider";

const CompDetails = () => {
 
    const { currentUser, userEmail, refresh, refreshState } = useAuth();
    const compRef = db.collection("Competitions").doc();


    return (
        <div>
           
<h1>This is the Comp Detail page</h1>
        </div>
    )
}

export default CompDetails;