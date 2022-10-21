import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { thunkCreateNewSpot, thunkAddSpotImage } from "../../store/spots"
import { countries } from "./countries"

import "./Spots.css"

const CreateSpot = () => {
  console.log("CREATESPOT COMPONENT STARTS:")
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector((state) => {
    console.log("USE SELECTOR DETECTS STATE CHANGE")
    return state.session.user
  })

  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [lat, setLat] = useState("")
  const [lng, setLng] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [url, setUrl] = useState("")

  const [errors, setErrors] = useState([])
  const [hasSubmitted, setHasSubmitted] = useState(false)

  //check for logged in status
  useEffect(() => {
    if (currentUser) setErrors([])
    else setErrors(["You must be logged in to host new spot"])
  }, [currentUser])


  // handleSubmit is ASYNCHRONOUS
  const handleSubmit = async (e) => {
    console.log("COMPONENT HANDLESUBMIT STARTS:")
    e.preventDefault()
    setErrors([])
    setHasSubmitted(true)

    let errorsArr = []

    if (!address.length) errorsArr.push("please enter street address")
    if (!city.length) errorsArr.push("please enter city")
    if (!state.length) errorsArr.push("please enter state")
    if (!country.length) errorsArr.push("please select a country")
    // if (!lat.length || lat > 90 || lat < -90) errorsArr.push("please enter a valid latitude between -90 and 90")
    // if (!lng.length || lng > 180 || lng < -180) errorsArr.push("please enter a valid longitude between -180 and 180")
    if (!name.length || name.length > 50) errorsArr.push("please enter a valid name fewer than 50 characters long")
    if (!description.length || description.length > 255) errorsArr.push("please enter a valid description fewer than 255 characters long")
    if (!price || price <=0) errorsArr.push("please enter a valid price greater than 0")
    if (!url.length || url.length > 255 || !url.includes(".jpg"||".jpeg"||".png"||".gif")) errorsArr.push("please enter a valid image url fewer than 255 characters long")

    setErrors(errorsArr)

    const spotInfo = {
      address, city, state, country, lat: 90, lng: 90, name, description, price, url
    }
    const imageInfo = ({ url, preview: true})

    console.log("COMPONENT HANDLESUBMIT, BEFORE DISPATCH THUNK, PAYLOAD SPOT:", spotInfo)

    const newSpot = await dispatch(thunkCreateNewSpot(spotInfo, imageInfo))

    if (newSpot) {
      await dispatch(thunkAddSpotImage(newSpot.id, imageInfo))
      reset()
      history.push("/myspots")
    }
    console.log("COMPONENT HANDLESUBMIT ENDS")
  }

  const reset = () => {
    setAddress("")
    setCity("")
    setState("")
    setCountry("")
    setLat("")
    setLng("")
    setName("")
    setDescription("")
    setPrice("")
    setUrl("")
    setErrors([])
    setHasSubmitted(false)
  }

  const cancelHandler = (e) => {
    e.preventDefault()
    history.push("/")
  }

  return (
    <div className="host-whole-container">
      <h2 className="host-header-container">
        Become A Host Today!
      </h2>

        <div className="validation-errors">
          {
          hasSubmitted &&
          errors?.map((error)=>(<div key={error}>{error}</div>))
          }
        </div>

      <div className="host-form-container form-input-wrapper">
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            State:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            Country:
            <select
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" selected disabled>
                Select a Country
              </option>
              {countries.map((ele)=>(<option>{ele}</option>))}
            </select>
          </label>
          {/* <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </label> */}
          {/* <label>
            Latitude:
            <input
              type="number"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
          </label>
          <label>
            Longitude:
            <input
              type="number"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
          </label> */}
          <div className="form-input-break"></div>
          <label>
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div className="form-input-break"></div>
          <label>
            Image URL:
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>

          <div className="form-input-break"></div>
          <button
          // disabled={
          //   hasSubmitted &&
          //   errors.length > 0 ? true : false
          // }
          className="submit-button"
          >
            Create
          </button>
          <button
          onClick={cancelHandler}
          className="submit-button"
          >
            Cancel
          </button>
        </form>
        {/* {console.log("CREATESPOT COMPONENT ENDS")} */}
        </div>
    </div>
  )
}

export default CreateSpot
