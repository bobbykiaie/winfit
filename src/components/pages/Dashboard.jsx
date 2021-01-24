import React from "react";
import {db} from "../../firebase/firebase"

import {  useAuth } from "../../providers/UserProvider";
import NewCompButton from "./NewCompetition";
import Button from "react-bootstrap/Button"

const Dashboard = (prop) => {
    const { currentUser, logout } = useAuth();
    const [modalShow, setModalShow] = React.useState(false);

  
  const handleLogOut = async () => {
    
    
    logout();
  };
    console.log(prop)
    return (
        <div>
            <h1>This is the dashboard</h1>
            <button onClick={handleLogOut}>Log Out</button>
            <h1>Current User is: {currentUser}</h1>
            <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <NewCompButton
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        </div>
    )
}

export default Dashboard;