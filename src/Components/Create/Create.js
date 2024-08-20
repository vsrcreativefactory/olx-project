import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext, AuthContext} from '../../store/FirebaseContext'
import { useHistory } from 'react-router-dom';

function Create() {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const date = new Date();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.storage().ref(`/image/${image.name}`).put(image)
      .then(({ ref }) => ref.getDownloadURL())
      .then((url) => {
        return firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString(),
        });
      })
      .then(() => {
        history.push('/');
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter product name' required
              name="Name"
              defaultValue="John" />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category" required
              name="category"
              defaultValue="John" />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price" required
              name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <form>
            <br />
            <input onChange={(e) => {
              setImage(e.target.files[0]);
            } } type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
}

export default Create;
