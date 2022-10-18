import React from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import "./DemoUser.css"

const DemoUser = () => {
  const dispatch = useDispatch()

  const loginDemoUser = () => {
    return dispatch(login({
      credential: "Andrea Wu",
      password: "password1"
    }))
  }

  return (
    <>
      <div id="demo-user" onClick={loginDemoUser}>
        Login as Demo User
      </div>
    </>
  )
}

export default DemoUser
