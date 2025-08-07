import React, { useState } from 'react';
import Header from '../components/Header';
import Description from '../components/Description';
import Upload from './upload';
import ImageCard from '../components/ImageCards';
const ImageConverter = () => {
  const [image, setImage] = useState('');

  return (
    <div className='w-full'>

    <Upload image={image} setImage={setImage}></Upload>
      <Description />
      <ImageCard image={image} ></ImageCard>
    </div>
  );
};

export default ImageConverter;
