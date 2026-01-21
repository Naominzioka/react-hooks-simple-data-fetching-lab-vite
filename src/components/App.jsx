import React, { useEffect, useState } from "react"


// create your App component here

function App() {
  //implement state to fetch images and load them
  //null is no image available
  //loading state starts with true since we have no data yet
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(true)

  function getDogImage() {
    setLoading(true);

    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => {
        setImage(data.message)
        //after data is fetched loading is false since fetch is successful
        setLoading(false)
      })
      //implement catch block incase fetching is not successful
      .catch(error => {
        console.error("Error fetching images", error)
        setLoading(false); //stop loading even if there is an error
      });
  }

  //fetch dog image once when the component mounts
  useEffect(() => {
    getDogImage();
  }, [])

  return (
    <div className="dog-container">


      {/* Page heading: tells the user what this app does */}
      <h1>Random Dog</h1>

      {/* best practice to show user we are fetching the image  */}
      {loading && <p>Loading...</p>}


      {/* Render the dog image only when it exists and loading is finished */}
      {!loading && image && (
        <img src={image} alt="A random dog" />
      )}

      {/* Button to fetch a new dog image on click */}
      <button onClick={getDogImage}>Get a new dog image</button>
    </div>
  )
}

export default App
